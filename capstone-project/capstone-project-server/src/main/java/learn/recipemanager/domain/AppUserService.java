package learn.recipemanager.domain;

import learn.recipemanager.data.AppUserRepo;
import learn.recipemanager.models.*;
import learn.recipemanager.models.viewmodels.EditHealthLabelRequest;
import learn.recipemanager.models.viewmodels.EditUserAccountRequest;
import learn.recipemanager.models.viewmodels.EditUserPantryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepo repo;

    @Autowired
    private PasswordEncoder encoder;

    public AppUserService(AppUserRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var matchingUsers = repo.findByUsername(username);
        if (matchingUsers.size() > 0) {
            AppUser appUser = matchingUsers.get(0);
            if (!appUser.isEnabled()) {
                throw new UsernameNotFoundException(username + " not found");
            }
            return appUser;
        }

        throw new UsernameNotFoundException(username + " not found");


    }


    public List<AppUser> findAll() {
        return repo.findAll().stream().filter(u -> !u.isDeleted()).collect(Collectors.toList());
    }

    public Result<AppUser> findById(String userId) {//method verified by instructor
        Result<AppUser> result = new Result<>();
        if (userId == null || userId.isBlank()){
            result.addMessage("No User Id found.", ResultType.INVALID);
            return result;
        }
        Optional<AppUser> userContainer = repo.findById(userId);
        if (userContainer.isPresent()) {
            result.setPayload(userContainer.get());
            return result;
        }
        result.addMessage("User does not exist.", ResultType.NOT_FOUND);
        return result;
    }

    public Result<AppUser> create(String email, String password, String name, List<Recipe> favorites, List<HealthLabel> healthLabels, List<Ingredient> ingredients) {

        Result<AppUser> result = validateEmail(email);


        if (!result.isSuccess()) {
            return result;
        }

        validatePassword(password, result);

        if (!result.isSuccess()) {
            return result;
        }

        if (repo.findByUsername(email).size() > 0) {
            result.addMessage("Email already registered", ResultType.INVALID);
            return result;
        }



        AppRole appRole = new AppRole();
        appRole.setRoleName("USER");
        password = encoder.encode(password);


        AppUser appUser = new AppUser(email, password, false, List.of(appRole), name, favorites, healthLabels,ingredients );

        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(repo.save(appUser));

        return result;
    }

    public Result<AppUser> update(AppUser user) {
        Result<AppUser> userResult = new Result<>();
        //pull the password from the repo and pull it into the user.
        if (user.getUserId() == null) {
            userResult.addMessage("No user ID found.", ResultType.INVALID);
            return userResult;
        }
        //todo make sure refactor user did not break code
        Optional userOptional = repo.findById(user.getUserId());
        if (userOptional.isPresent()) {
            AppUser internalUserRecord = (AppUser) userOptional.get();
            if (user.getFavorites() == null) {//zero length is okay for update: remove one favorite.
                userResult.addMessage("Null favorites array is not allowed for update",
                        ResultType.INVALID);
                return userResult;
            }
            //should be good to add new favorite now:
            internalUserRecord.setFavorites(user.getFavorites());
            //can add more setters here for other variables
            repo.save(internalUserRecord);
            userResult.setPayload(internalUserRecord);
            return userResult;
        }
        userResult.addMessage("User was not found.", ResultType.NOT_FOUND);
        return userResult;
    }



    public Result<AppUser> updateAccount(EditUserAccountRequest request) {
        Result<AppUser> userResult = new Result<>();

        if (request.getUserId() == null || request.getUserId().isBlank()) {
            userResult.addMessage("User Id is required", ResultType.INVALID);
        }

        userResult = validateEmail(request.getEmail());

        if (!userResult.isSuccess()) {
            return userResult;
        }

        validatePassword(request.getPassword(), userResult );

        if (userResult.isSuccess()) {
            Optional userOptional = repo.findById(request.getUserId());
            if (userOptional.isPresent()){
                AppUser user = (AppUser)userOptional.get();

                user.setEmail(request.getEmail());
                user.setPassHash(encoder.encode(request.getPassword()));
                user.setName(request.getName());

                user = repo.save(user);

                userResult.setPayload(user);
            }
        }
        return userResult;

    }

    public Result<AppUser> updatePantry(AppUser user) {
        Result<AppUser> userResult = validateIngredients(user.getIngredients());

        if (!userResult.isSuccess()) {
            return userResult;
        }

        if (user.getUserId() == null || user.getUserId().isBlank()) {
            userResult.addMessage("User Id is required", ResultType.INVALID);
        }

        if (userResult.isSuccess()) {
            Optional userOptional = repo.findById(user.getUserId());
            if (userOptional.isPresent()){

                AppUser userRecord = (AppUser) userOptional.get();

                userRecord.setIngredients(user.getIngredients());

                repo.save(userRecord);
                
                userResult.setPayload(user);

                return userResult;
            }
        }
        userResult.addMessage("User not found", ResultType.NOT_FOUND);
        return userResult;

    }

    public Result<AppUser> updateHealthLabels(EditHealthLabelRequest request) {
        Result<AppUser> result = new Result<>();

        if (request.getUserId() == null || request.getUserId().isBlank()) {
            result.addMessage("User Id is required", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            Optional userOptional = repo.findById(request.getUserId());
            if (userOptional.isPresent()) {
                AppUser user = (AppUser) userOptional.get();

                user.setHealthLabels(request.getHealthLabels());
                repo.save(user);
                result.setPayload(user);
            }
        }
        return result;
    }

    public boolean deleteById(String id) {
        Optional<AppUser> userOptional = repo.findById(id);
        if (userOptional.isPresent()) {
            AppUser user = userOptional.get();

            user.setDeleted(true);

            repo.save(user);

            return true;
        }
        return false;
    }

    private Result<AppUser> validatePassword(String password, Result<AppUser> result) {

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

    private Result<AppUser> validateEmail(String email) {

        Result<AppUser> result = new Result<>();

        if (email == null || email.isBlank()) {
            result.addMessage("Email is required", ResultType.INVALID);
            return result;
        }

        String regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

        if (!email.matches(regex)) {
            result.addMessage("Entry should be a proper email", ResultType.INVALID);
            return result;
        }
        return result;

    }

    private Result<AppUser> validateIngredients(List<Ingredient> ingredients) {
        Result<AppUser> result = new Result<>();

        for (Ingredient i : ingredients) {

            if (i.getName() == null || i.getName().isBlank()) {
                result.addMessage("Ingredient name is required", ResultType.INVALID);
                return result;
            }

            if (i.getFoodCategory() == null || i.getFoodCategory().isBlank()) {
                result.addMessage("Food category is required", ResultType.INVALID);
                return result;
            }

            if (i.getQuantity() <= 0) {
                result.addMessage("Quantity is requires and cannot be negative", ResultType.INVALID);
                return result;
            }

            if (i.getMeasure() == null || i.getMeasure().isBlank()) {
                result.addMessage("Measure is required", ResultType.INVALID);
            }

            for (Ingredient j : ingredients) {
                if (i.getName().equalsIgnoreCase(j.getName()) && ingredients.indexOf(i) != ingredients.indexOf(j)) {
                    result.addMessage("Ingredient cannot be a duplicate", ResultType.INVALID);
                    return result;
                }
            }
        }
        return result;

    }

}
