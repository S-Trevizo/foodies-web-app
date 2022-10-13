package learn.recipemanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient {

    private String foodId;
    private String name;
    private String foodCategory;
    private double quantity;
    private String measure;
}
