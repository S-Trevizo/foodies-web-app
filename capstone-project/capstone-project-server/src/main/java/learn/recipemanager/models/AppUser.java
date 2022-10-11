package learn.recipemanager.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Document
public class AppUser implements UserDetails {
    @Id
    private String userId;
    private String email;
    private String passHash;
    private boolean isDeleted;
    private List<AppRole> userRoles;
    private String name;

    private List<String> favorites;
    private List<String> healthLabels;


    public AppUser( String email, String passHash, boolean isDeleted, List<AppRole> userRoles) {
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

    public List<String> getSavedRecipes() {
        return favorites;
    }

    public void setSavedRecipes(List<String> savedRecipes) {
        this.favorites = savedRecipes;
    }

    public List<String> getHealthLabels() {
        return healthLabels;
    }

    public void setHealthLabels(List<String> healthLabels) {
        this.healthLabels = healthLabels;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userRoles.stream().map(AppRole::getAuthority).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return passHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        setEmail(username);
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isDeleted;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isDeleted;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !isDeleted;
    }

    @Override
    public boolean isEnabled() {
        return !isDeleted;
    }
}
