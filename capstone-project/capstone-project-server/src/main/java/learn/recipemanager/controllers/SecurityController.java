package learn.recipemanager.controllers;


import learn.recipemanager.domain.AppUserService;
import learn.recipemanager.models.AppUser;
import learn.recipemanager.models.viewmodels.LoginRequest;
import learn.recipemanager.security.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
//crossorigins is set up in appconfig file
@RestController
@RequestMapping("api/security")
public class SecurityController {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    AppUserService appUserService;
    @Autowired
    JwtConverter converter;

    @PostMapping("/authenticate")
    ResponseEntity login(@RequestBody LoginRequest request){
        UsernamePasswordAuthenticationToken rawToken
                = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication = authManager.authenticate( rawToken );
        AppUser user = (AppUser)authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = converter.buildJwt(user);
        HashMap<String, String> tokenHolder = new HashMap<>();
        tokenHolder.put("jwt_token", token);
        return ResponseEntity.ok( tokenHolder );
    }
}
