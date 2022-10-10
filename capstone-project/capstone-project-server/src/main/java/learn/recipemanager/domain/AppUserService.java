package learn.recipemanager.domain;

import learn.recipemanager.data.AppUserRepo;
import learn.recipemanager.models.AppRole;
import learn.recipemanager.models.AppUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepo repo;

    private final PasswordEncoder encoder;

    public AppUserService (AppUserRepo repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repo.findByUsername(username).get(0);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public AppUser create(String email, String password) {
        validate(email);
        validatePass(password);
        AppRole appRole = new AppRole();
        appRole.setRoleName("User");
        password = encoder.encode(password);

        AppUser appUser = new AppUser( email, password, false, List.of(appRole));
        
        return repo.save(appUser);
    }

    private void validatePass(String password) {


    }

    private void validate(String email) {

        if (email == null || email.isBlank()) {

        }
        
    }
}
