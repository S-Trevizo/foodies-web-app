package learn.recipemanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    private String recipeId;
    private String recipeUrl;
    private String imageUrl;
    private String recipeName;

}
