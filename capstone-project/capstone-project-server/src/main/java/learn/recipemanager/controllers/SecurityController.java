package learn.recipemanager.controllers;

import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.CreateRequest;
import learn.recipemanager.models.viewmodels.LoginRequest;
import learn.recipemanager.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/security")
public class SecurityController {
    private final AuthenticationManager authManager;
    private final AppUserService appUserService;
    private final JwtConverter converter;
    public SecurityController(AuthenticationManager authManager, AppUserService appUserService, JwtConverter converter) {
        this.authManager = authManager;
        this.appUserService = appUserService;
        this.converter = converter;
    }

    @PostMapping("/authenticate")
    public ResponseEntity login(@RequestBody LoginRequest request){
        UsernamePasswordAuthenticationToken rawToken
                = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication authentication = authManager.authenticate(rawToken);
        if (authentication.isAuthenticated()) {
            String jwtToken = converter.buildJwt((AppUser) authentication.getPrincipal());
            HashMap<String, String> tokenHolder = new HashMap<>();
            tokenHolder.put("jwt_token", jwtToken);
            return ResponseEntity.ok( tokenHolder );
        }
        return new ResponseEntity<>("Credentials not found",HttpStatus.FORBIDDEN);
    }

    @PostMapping("/create_account")
    public ResponseEntity<?> createAccount(@RequestBody CreateRequest request) {

        Result<AppUser> appUser = appUserService.create(request.getEmail(), request.getPassword(), request.getName(), new ArrayList<>(), request.getHealthLabels());

        if (!appUser.isSuccess()) {
            return ErrorResponse.build(appUser);
        }  //TODO this return ^^^ is breaking.

        //"happy path":
        HashMap<String, String> map = new HashMap<>();
        map.put("appUserId", appUser.getPayload().getUserId());
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }


}
