package learn.recipemanager.controllers;


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


//TODO do I need to specify origins? Widget controller did, SolarPanel did not.
@RestController
@RequestMapping("api/security")
@CrossOrigin( origins={"http://localhost:3000"} )
public class SecurityController {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtConverter converter;

    @PostMapping
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
