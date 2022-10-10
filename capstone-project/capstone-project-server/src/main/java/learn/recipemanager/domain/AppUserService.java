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

    public Result<AppUser> create(String email, String password) {

        Result<AppUser> result = validate(email);

        if (!result.isSuccess()) {
            return result;
        }

        validatePass(password, result);
        AppRole appRole = new AppRole();
        appRole.setRoleName("User");
        password = encoder.encode(password);

        AppUser appUser = new AppUser( email, password, false, List.of(appRole));

        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(repo.save(appUser));
        
        return result;
    }

    private Result<AppUser> validatePass(String password, Result<AppUser> result) {

        if (password == null || password.length() < 8) {
            result.addMessage("Password is required and should be more than 8 characters", ResultType.INVALID);
            return result;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            result.addMessage("password must contain a digit, a letter, and a non-digit/non-letter", ResultType.INVALID);
        }

        return result;
    }

    private Result<AppUser> validate(String email) {

        Result<AppUser> result = new Result<>();

        if (email == null || email.isBlank()) {
            result.addMessage("Email is required", ResultType.INVALID);
            return result;
        }

        String regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

        if (email.matches(regex)) {
            result.addMessage("Entry should be a proper email", ResultType.INVALID);
        }
        return result;
    }
}