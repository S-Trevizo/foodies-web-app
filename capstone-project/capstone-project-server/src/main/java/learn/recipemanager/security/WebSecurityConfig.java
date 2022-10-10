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

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    JwtFailedAuthEntryPoint entryPoint;
    @Autowired
    AuthTokenFilter filter;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();    //turn off CORS checks TODO isn't this only good for when there are no forms?
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy( SessionCreationPolicy.STATELESS );
        //http.exceptionHandling().authenticationEntryPoint(entryPoint);
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/security/create_account").permitAll()
//                .antMatchers( HttpMethod.GET, "/api/widget/public" ).permitAll()
                .antMatchers( HttpMethod.POST, "/api/security/authenticate").permitAll()
//                .antMatchers( HttpMethod.GET, "/api/widget/personal/*").authenticated()
                .anyRequest().denyAll();
        http.addFilterBefore( filter, UsernamePasswordAuthenticationFilter.class );
    }
    //todo I think this throw is not related to mongo db throw. so
    // We still need a global exception handler maybe.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }

}