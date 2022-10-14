package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.EditUserAccountRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {
    private final AppUserService appUserService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {

        List<AppUser> users = appUserService.findAll();

        for (AppUser u : users) {
            u.setPassHash("");
        }

        return new ResponseEntity(users, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")//todo remove id from this
    public ResponseEntity<Object> getAccount(@PathVariable String id) {//method verified by instructor
        //validate that person is admin or user with same id. else, forbidden
        AppUser currentUser = (AppUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        boolean isAdmin = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("admin"));//I wish admin were an enum
        if (isAdmin || (id.equals(currentUser.getUserId()))) {//.equals is a string method so just in case I switched to ==. hmm
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

    @PutMapping("/user")
    public ResponseEntity<?> update( @RequestBody EditUserAccountRequest request)  {

        Result<AppUser> result = appUserService.updateAccount(request);

        if (!result.isSuccess()) {
            if (result.getType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity deleteById(@PathVariable String id) {
        if (appUserService.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
