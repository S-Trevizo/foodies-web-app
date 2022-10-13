package learn.recipemanager.domain;

import learn.recipemanager.App;
import learn.recipemanager.data.AppUserRepo;
import learn.recipemanager.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;
    @Autowired
    PasswordEncoder encoder;
    @MockBean
    AppUserRepo repo;

    @Test
    void shouldNotAddWhenBlankEmail() {

        String email = "";
        String password = "ValidPass1!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();



        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("Email is required", result.getMessages().get(0));

    }

    @Test
    void shouldNotAddWhenInvalidEmail() {

        String email = "Not an email";
        String password = "ValidPass1!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();



        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("Entry should be a proper email", result.getMessages().get(0));

    }

    @Test
    void shouldNotAddWhenDuplicateEmail() {

        String email = "bob@bob.com";
        String password = "ValidPass1!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();

        when(repo.findByUsername("bob@bob.com")).thenReturn(List.of(createUser()));

        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("Email already registered", result.getMessages().get(0));

    }

    @Test
    void shouldNotAddWhenPasswordHasNoNumbers() {

        String email = "email@email.com";
        String password = "InvalidPass!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();



        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("password must contain a digit, a letter, and a non-digit/non-letter", result.getMessages().get(0));

    }

    @Test
    void shouldNotAddWhenPasswordHasNoSymbols() {

        String email = "email@email.com";
        String password = "InvalidPass1";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();



        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("password must contain a digit, a letter, and a non-digit/non-letter", result.getMessages().get(0));

    }

    @Test
    void shouldNotAddWhenPasswordHasNoLetters() {

        String email = "email@email.com";
        String password = "!!!!!33333!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();



        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertFalse(result.isSuccess());
        assertEquals("password must contain a digit, a letter, and a non-digit/non-letter", result.getMessages().get(0));

    }

    @Test
    void shouldAddValidUser() {
        String email = "email@email.com";
        String password = "ValidPassword1!";
        String name = "Name";
        List<Recipe> favorites = new ArrayList<>();
        List<HealthLabel> healthLabels = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>();

        Result<AppUser> result = service.create(email,password, name, favorites, healthLabels, ingredients);

        assertTrue(result.isSuccess());

    }

    @Test
    void shouldNotDeleteInvalidUser() {
        when(repo.findById("id")).thenReturn(Optional.empty());

        assertFalse(service.deleteById("id"));
    }

    @Test
    void shouldDeleteUserById() {
        AppUser user = createUser();
        user.setUserId("id");

        when(repo.findById("id")).thenReturn(Optional.of(user));

        assertTrue(service.deleteById("id"));

    }

    public AppUser createUser() {
        String password =  "Password1!";
        String passHash = encoder.encode(password);
        return new AppUser("bob@bob.com", passHash,  false , List.of(new AppRole("USER")), "Bob Bob" ,new ArrayList<Recipe>(), new ArrayList<HealthLabel>(), new ArrayList<Ingredient>());
    }
}