package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.Ingredient;
import learn.recipemanager.models.viewmodels.EditUserPantryRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pantry")
@AllArgsConstructor
public class PantryController {

    private final AppUserService appUserService;

    @PutMapping
    @DeleteMapping
    public ResponseEntity<?> updatePantry(@RequestBody AppUser user) {
        AppUser currentUser = (AppUser) SecurityContextHolder//validate that person is admin or user. else, forbidden
                .getContext()
                .getAuthentication()
                .getPrincipal();
        boolean isAdmin = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("admin"));//I wish admin were an enum
        boolean isUser = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("user"));
        if (isAdmin || isUser) {//good case: user or admin. can update user now.
            Result<AppUser> result = appUserService.updatePantry(user);
            if (result.isSuccess()) {//return good: 200
                return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
            } else if (result.getType() == ResultType.NOT_FOUND) {//return 404: not found
                return new ResponseEntity<>(result.getMessages(),HttpStatus.NOT_FOUND);
            } else if (result.getType() == ResultType.INVALID) {//return 400: bad request
                return new ResponseEntity<>(result.getMessages(),HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(List.of("Error: must be a registered admin or user."),HttpStatus.FORBIDDEN);//403
    }


}
