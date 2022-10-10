package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/recipe")
public class RecipesController {
    @Autowired
    AppUserService service;
    //todo does a hard-coded value need autowired?
    // where is a better place to initialize these variables?
    @Autowired
    private String app_id = "4357d5e9";
    @Autowired
    private String app_key = "84496af29c091bb734dab8904e3d9df5";

    /*
    recipe searchbar per role:
    get recipes:
    admin: can view filtered recipes
    user: can view filtered recipes
    guest: can view only random recipes
     */

    //todo add the api request for each in comments here to make it easier
    // to keep track of - base method off of that.

    @GetMapping("/public")
    public ResponseEntity<?> searchTwentyRecipes(@RequestBody String searchCriteria) {
        Map<String, String> apiQueryInput = null;
        if (searchCriteria == null || searchCriteria.isBlank()) {//external api requires q
            return new ResponseEntity("Search criteria is required", HttpStatus.FORBIDDEN);
        }
        // any user has proper permissions (public)
        //return app_id and app_key to make api request using q query
        apiQueryInput.put("app_id", app_id);
        apiQueryInput.put("app_key", app_key);
        apiQueryInput.put("q", searchCriteria);
        return ResponseEntity.ok(apiQueryInput);
    }

    //overloaded "searchTwentyRecipes" method with user preferences method?






}
