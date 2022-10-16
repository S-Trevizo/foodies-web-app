package learn.recipemanager.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    JwtFailedAuthEntryPoint entryPoint;
    @Autowired
    AuthTokenFilter filter;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy( SessionCreationPolicy.STATELESS );
        //these are case-sensitive
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/recipe/public").permitAll()
                .antMatchers(HttpMethod.POST, "/api/recipe/personal").hasAnyRole("USER","ADMIN")
                .antMatchers(HttpMethod.POST,  "/api/security/authenticate").permitAll()//HttpMethod.POST,
                .antMatchers(HttpMethod.POST, "/api/security/create_account").permitAll()
                .antMatchers(HttpMethod.GET, "/api/user/*").hasAnyRole("USER", "ADMIN")//.authenticated also works - broader option
                .antMatchers(HttpMethod.GET, "/api/security/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/security/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/users").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/user").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/pantry").authenticated()
                .antMatchers(HttpMethod.PUT,"/api/preferences").authenticated()
                .antMatchers("/**").denyAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore( filter, UsernamePasswordAuthenticationFilter.class );
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }





}