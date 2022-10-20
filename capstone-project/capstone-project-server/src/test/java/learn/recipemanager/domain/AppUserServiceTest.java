package learn.recipemanager.domain;

import learn.recipemanager.App;
import learn.recipemanager.data.AppUserRepo;
import learn.recipemanager.models.*;
import learn.recipemanager.models.viewmodels.EditUserPantryRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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
//
//    @Test
//    void shouldNotAddIngredientWithoutName() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("", "Fruit", 1 , "Teaspoon"));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("Ingredient name is required", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddIngredientWithoutFoodCategory() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Grape", null, 1 , "Teaspoon"));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("Food category is required", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddIngredientWithNegativeQuantity() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Grape", "Fruit", -1 , "Teaspoon"));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("Quantity is requires and cannot be negative", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddIngredientWithoutMeasure() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Grape", "Fruit", 3 , ""));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("Measure is required", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddDuplicateIngredient() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Apple", "Fruit", 3 , ""));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("Ingredient cannot be a duplicate", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddValidIngredientWithoutUserId() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Kiwi", "Fruit", 3 , "Each"));
//
//        request.setUserId("");
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("User Id is required", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldNotAddValidIngredientWithNotFoundUser() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Kiwi", "Fruit", 3 , "Each"));
//
//        when(repo.findById(any())).thenReturn(Optional.empty());
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertFalse(result.isSuccess());
//        assertEquals("User not found", result.getMessages().get(0));
//    }
//
//    @Test
//    void shouldAddValidIngredient() {
//        EditUserPantryRequest request = generateEditPantryRequest();
//        request.getIngredients().add(new Ingredient("Kiwi", "Fruit", 3 , "Each"));
//
//        when(repo.findById(any())).thenReturn(Optional.of(createUser()));
//
//        Result<AppUser> result = service.updatePantry(request);
//
//        assertTrue(result.isSuccess());
//    }





    public AppUser createUser() {
        String password =  "Password1!";
        String passHash = encoder.encode(password);
        return new AppUser("bob@bob.com", passHash,  false , List.of(new AppRole("USER")), "Bob Bob" ,new ArrayList<Recipe>(), new ArrayList<HealthLabel>(), new ArrayList<Ingredient>());
    }

    public EditUserPantryRequest generateEditPantryRequest() {
        EditUserPantryRequest request = new EditUserPantryRequest();
        Ingredient apple = new Ingredient("Apple", "Fruit", 1, "Each");
        Ingredient carrot = new Ingredient("Carrot", "Vegetable", 1, "Bunch");
        Ingredient cumin = new Ingredient("Cumin", "Spice", 1, "Bag");

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(apple);
        ingredients.add(carrot);
        ingredients.add(cumin);

        request.setIngredients(ingredients);

        request.setUserId("Test Id");

        return request;
    }
}