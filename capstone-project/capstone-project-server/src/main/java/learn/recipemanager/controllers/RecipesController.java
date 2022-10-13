package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @PostMapping("/personal")
    public ResponseEntity<?> getFilteredRecipes(@RequestBody SearchCriteria searchCriteria) {//find random 20 filtered recipes
        //only admin and users can use this method: websecurityconfig covers this.
        AppUser currentUser = (AppUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        boolean isAdmin = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("admin"));
        boolean isUser = currentUser.getUserRoles().stream().anyMatch(r -> r.getRoleName().equalsIgnoreCase("user"));
        if (isAdmin || isUser) {
            HashMap<String, String> apiQueryInput = new HashMap<String, String>();
            if (searchCriteria == null || searchCriteria.getSearchCriteria() == null || searchCriteria.getSearchCriteria().isBlank() ||
                    searchCriteria.getFetchString() == null || searchCriteria.getFetchString().isBlank()) {//external api requires q
                return new ResponseEntity("Search criteria and fetch information are required", HttpStatus.FORBIDDEN);
            }
            //return app_id and app_key to make api request using q query
            apiQueryInput.put("app_id", app_id);
            apiQueryInput.put("app_key", app_key);
            apiQueryInput.put("q", searchCriteria.getSearchCriteria());
            apiQueryInput.put("fetchString", searchCriteria.getFetchString());
            return ResponseEntity.ok(apiQueryInput);
        }
        return new ResponseEntity("Must be a registered admin or user for a filtered search result", HttpStatus.FORBIDDEN);
    }








}
