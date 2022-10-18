package learn.recipemanager.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
@Document
@AllArgsConstructor
@NoArgsConstructor
public class AppUser implements UserDetails {
    @Id
    private String userId;
    private String email;
    private String passHash;
    private boolean isDeleted;
    private List<AppRole> userRoles;
    private String name;
    private List<Recipe> favorites = new ArrayList<>();
    private List<HealthLabel> healthLabels;
    private List<Ingredient> ingredients = new ArrayList<>();


    public AppUser( String email, String passHash, boolean isDeleted, List<AppRole> userRoles,
                    String name, List<Recipe> favorites, List<HealthLabel> healthLabels, List<Ingredient> ingredients) {
        this.email = email;
        this.passHash = passHash;
        this.isDeleted = isDeleted;
        this.userRoles = userRoles;
        this.favorites = favorites;
        this.healthLabels = healthLabels;
        this.ingredients = ingredients;
        this.name = name;
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

    public List<Recipe> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Recipe> savedRecipes) {
        this.favorites = savedRecipes;
    }

    public List<HealthLabel> getHealthLabels() {
        return healthLabels;
    }

    public void setHealthLabels(List<HealthLabel> healthLabels) {
        this.healthLabels = healthLabels;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userRoles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName())).collect(Collectors.toList());
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppUser appUser = (AppUser) o;
        return isDeleted == appUser.isDeleted && Objects.equals(userId, appUser.userId)
                && Objects.equals(email, appUser.email) && Objects.equals(passHash, appUser.passHash)
                && Objects.equals(userRoles, appUser.userRoles) && Objects.equals(name, appUser.name)
                && Objects.equals(favorites, appUser.favorites) && Objects.equals(healthLabels, appUser.healthLabels);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, email, passHash, isDeleted, userRoles, name, favorites, healthLabels);
    }
}
