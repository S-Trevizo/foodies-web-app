package learn.recipemanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import learn.recipemanager.domain.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    AppUserService service;
    @Autowired
    JwtConverter converter;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String jwt = readToken( request.getHeader("Authorization"));
        if( jwt == null ){//user did not send token (log-in, no authentication needed, etc.)
            SecurityContextHolder.getContext().setAuthentication(null);
        } else {//validate token
            Jws<Claims> claims = converter.parseJwt( jwt );
            String userName = claims.getBody().getSubject();
            UserDetails matchingUser = service.loadUserByUsername(userName);
            UsernamePasswordAuthenticationToken rawToken =
                    new UsernamePasswordAuthenticationToken(
                            matchingUser,
                            null,
                            matchingUser.getAuthorities()
                    );

            SecurityContextHolder.getContext().setAuthentication(rawToken);
        }
            filterChain.doFilter(request, response);
    }
    private String readToken(String authorization) {//null if there is no Authorization header
        if( authorization != null ){
            if( authorization.startsWith("Bearer ")){
                return authorization.substring(7);
            }
        }
        return null;
    }
}
