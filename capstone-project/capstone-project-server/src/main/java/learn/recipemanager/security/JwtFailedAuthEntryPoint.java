package learn.recipemanager.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFailedAuthEntryPoint implements AuthenticationEntryPoint {//add response to indicate failed login
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        response.sendError( HttpServletResponse.SC_UNAUTHORIZED, "Error: unauthorized user.");
    }
}