package learn.recipemanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import learn.recipemanager.models.AppUser;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtConverter {
    private Key signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public String buildJwt(AppUser user){
        String token = io.jsonwebtoken.Jwts.builder()
                .setId( user.getUserId() + ""  )
                .claim("email", user.getEmail())
                .claim("roles", user.getUserRoles())
                .setIssuer("widget manager")
                .setSubject(user.getUsername())
                .setIssuedAt( new Date())
                .setExpiration( new Date( new Date().getTime() + 300000))
                .signWith(signingKey)
                .compact();
        return token;
    }
    public Jws<Claims> parseJwt(String jwt) {
        Jws<Claims> userClaims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build().parseClaimsJws( jwt );

        return userClaims;
    }
}
