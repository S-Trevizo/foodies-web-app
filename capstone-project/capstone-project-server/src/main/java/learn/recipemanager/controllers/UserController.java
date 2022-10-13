package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> getAccount(@PathVariable String id) {
        AppUser user = appUserService.findById(id).getPayload();

        if (user == null) {
            return new ResponseEntity<>("Account was not found.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("account/{id}")
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
