package learn.recipemanager.models.viewmodels;

import lombok.Data;


@Data
public class EditUserAccountRequest {

    private String userId;
    private String email;
    private String name;
    private String password;
}
