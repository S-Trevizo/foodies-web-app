package learn.recipemanager.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
public class AppRole {
    private String roleName;


    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public GrantedAuthority getAuthority() {
        return new SimpleGrantedAuthority(roleName);
    }
}
