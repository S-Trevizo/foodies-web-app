package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.models.viewmodels.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/recipe")
public class RecipesController {
    @Autowired
    AppUserService service;
    // todo is there a better place to initialize these variables?
    private String app_id = "6cb09ed9";
    private String app_key = "d6a13e436430e1c7060acb41373f73cf";

    @PostMapping("/public")
    public ResponseEntity<?> getRecipes(@RequestBody SearchCriteria searchCriteria) {//find random 20 recipes with search criteria as input
        // any user has proper permissions (public)
        HashMap<String, String> apiQueryInput = new HashMap<String, String>();
        if (searchCriteria == null || searchCriteria.getSearchCriteria() == null || searchCriteria.getSearchCriteria().isBlank()) {//external api requires q
            return new ResponseEntity("Search criteria is required", HttpStatus.FORBIDDEN);
        }
        //return app_id and app_key to make api request using q query
        apiQueryInput.put("app_id", app_id);
        apiQueryInput.put("app_key", app_key);
        apiQueryInput.put("q", searchCriteria.getSearchCriteria());
        return ResponseEntity.ok(apiQueryInput);
    }

    //search recipe as a user and admin:
    //take CreateRequest in. verify permissions. then return inputs for external api for filtered recipe list.









}
