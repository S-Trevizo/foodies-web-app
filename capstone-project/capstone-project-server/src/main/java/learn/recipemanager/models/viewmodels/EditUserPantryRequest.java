package learn.recipemanager.models.viewmodels;

import learn.recipemanager.models.Ingredient;
import lombok.Data;

import java.util.List;

@Data
public class EditUserPantryRequest {

    private String userId;
    private List<Ingredient> ingredients;
}
