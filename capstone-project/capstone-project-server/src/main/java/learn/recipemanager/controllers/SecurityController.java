package learn.recipemanager.controllers;


import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.domain.Result;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.LoginRequest;
import learn.recipemanager.security.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

//crossorigins is set up in appconfig file
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
                = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication = authManager.authenticate(rawToken);
        if (authentication.isAuthenticated()) {
            String jwtToken = converter.buildJwt((AppUser) authentication.getPrincipal());
            HashMap<String, String> tokenHolder = new HashMap<>();
            tokenHolder.put("jwt_token", jwtToken);
            return ResponseEntity.ok( tokenHolder );
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/create_account")
    public ResponseEntity<?> createAccount(@RequestBody LoginRequest request) {//Map<String, String> credentials
        Result<AppUser> appUser = null;
//removed try-catch: validationexception, duplicatekeyexception
        String username = request.getUsername();//this is email
        String password = request.getPassword();
        appUser = appUserService.create(username, password);
        if (!appUser.isSuccess()) {
            return new ResponseEntity<>(List.of(appUser.getMessages()), HttpStatus.BAD_REQUEST);
        }
            // TODO: need to set up response entity and global exception handler
        //"happy path":
        HashMap<String, String> map = new HashMap<>();
        map.put("appUserId", appUser.getPayload().getUserId());
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }
    
}
