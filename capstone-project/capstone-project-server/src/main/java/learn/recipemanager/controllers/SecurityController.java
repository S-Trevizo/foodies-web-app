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
    @Autowired
    AuthenticationManager authManager;// todo currently, I think this is hard-coded. replace with class constructor later?
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

    // 10/10/2022: sign-up functionality
    @PostMapping("/create_account")
    public ResponseEntity<?> createAccount(@RequestBody LoginRequest request) {//Map<String, String> credentials
        //todo is it okay to use a map for credentials for create account?
        Result<AppUser> appUser = null;
//removed try-catch: validationexception, duplicatekeyexception
        String username = request.getUsername();//this is email
        String password = request.getPassword();
        appUser = appUserService.create(username, password);
        if (!appUser.isSuccess()) {
            return new ResponseEntity<>(List.of(appUser.getMessages()), HttpStatus.BAD_REQUEST);
        }
            // TODO: need to set up response entity and global exception handler
//            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
//            return new ResponseEntity<>(List.of("The provided username already exists"), HttpStatus.BAD_REQUEST);

        //"happy path":
        //todo make sure this part is set up correctly.
        HashMap<String, String> map = new HashMap<>();
        map.put("appUserId", appUser.getPayload().getUserId());

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }


}
