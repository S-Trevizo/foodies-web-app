package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.EditHealthLabelRequest;
import learn.recipemanager.models.viewmodels.EditUserPantryRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
@AllArgsConstructor
public class HealthLabelController {

    private final AppUserService appUserService;

    @PutMapping
    public ResponseEntity<?> updateHealthLabel(@RequestBody EditHealthLabelRequest request) {
        Result<AppUser> result = appUserService.updateHealthLabels(request);

        if (!result.isSuccess()) {
            if (result.getType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
