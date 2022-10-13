package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<List<AppUser>> getUsers() {

        List<AppUser> users = appUserService.findAll();

        for (AppUser u : users) {
            u.setPassHash("");
        }

        return new ResponseEntity(users, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Object> getAccount(@PathVariable String id) {//method verified by instructor
        //validate that person is admin or user with same id. else, forbidden
        AppUser currentUser = (AppUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        boolean isAdmin = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("admin"));//I wish admin were an enum
        if (isAdmin || (id == currentUser.getUserId())) {
            Result<AppUser> user = appUserService.findById(id);
            if (!user.isSuccess()) {//user was not found or user id is missing
                return new ResponseEntity<>(user.getMessages(),
                        user.getType() == ResultType.NOT_FOUND ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST);
            }
            user.getPayload().setPassHash("");
            return new ResponseEntity<>(user.getPayload(), HttpStatus.OK);
        }
        return new ResponseEntity<>(List.of("Error: must be an admin. Or, logged-in user may only request their account info (mismatching path variable id)."),HttpStatus.FORBIDDEN);
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody AppUser user)  {

        if (!id.equals( user.getUserId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<AppUser> result = appUserService.update(user);

        if (!result.isSuccess()) {
            if (result.getType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable String id) {
        if (appUserService.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
