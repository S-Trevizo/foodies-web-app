package learn.recipemanager.models.viewmodels;


import learn.recipemanager.models.HealthLabel;
import lombok.Data;

import java.util.List;

@Data
public class EditHealthLabelRequest {

    private String userId;
    private List<HealthLabel> healthLabels;
}
