package learn.recipemanager.models;

import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

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
