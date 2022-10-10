package learn.recipemanager.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

public class AppRole {

    private String roleId;
    private String roleName;
    private List<AppUser> roleUsers;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<AppUser> getRoleUsers() {
        return roleUsers;
    }

    public void setRoleUsers(List<AppUser> roleUsers) {
        this.roleUsers = roleUsers;
    }

    public GrantedAuthority getAuthority() {
        return new SimpleGrantedAuthority(roleName);
    }
}
