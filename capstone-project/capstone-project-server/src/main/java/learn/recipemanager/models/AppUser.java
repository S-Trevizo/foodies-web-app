package learn.recipemanager.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser extends User {

    private String userId;
    private String email;
    private String passHash;
    private boolean isDeleted;
    private List<AppRole> userRoles;

    public AppUser(String username, String userId, String email, String passHash, boolean isDeleted, List<AppRole> userRoles) {
        super(username, passHash, userRoles.stream().map(AppRole::getAuthority).collect(Collectors.toList()));
        this.userId = userId;
        this.email = email;
        this.passHash = passHash;
        this.isDeleted = isDeleted;
        this.userRoles = userRoles;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassHash() {
        return passHash;
    }

    public void setPassHash(String passHash) {
        this.passHash = passHash;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public List<AppRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<AppRole> userRoles) {
        this.userRoles = userRoles;
    }
}
