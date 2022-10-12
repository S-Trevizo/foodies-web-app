package learn.recipemanager.data;

import learn.recipemanager.models.AppRole;
import learn.recipemanager.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserRepoTest {

    @Autowired
    AppUserRepo repo;

    @Autowired
    PasswordEncoder encoder;

    @BeforeEach
    void startup() {
        List<AppUser> all = repo.findAll();

        repo.deleteAll(all);

        repo.save(createUser());
    }

    @Test
    void shouldFindBob() {
       List<AppUser> returnedUsers = repo.findByUsername("bob@bob.com");

       assertEquals(1,returnedUsers.size());

       assertEquals("Bob Bob", returnedUsers.get(0).getName());

    }

    @Test
    void shouldAddNewUser() {
        AppUser toAdd = createUser();
        toAdd.setName("Bob Bob Bob");
        toAdd.setEmail("bob@bobbob.com");
        List<AppRole> roles = new ArrayList<>();
        roles.add(new AppRole("USER"));
        toAdd.setUserRoles(roles);

        repo.save(toAdd);

        List<AppUser> all = repo.findAll();

        assertEquals(2, all.size());

        assertEquals("Bob Bob Bob", all.get(1).getName());
        assertEquals("bob@bobbob.com", all.get(1).getEmail());

    }

    @Test
    void shouldUpdateExistingUser() {
        AppUser existingUser = repo.findByUsername("bob@bob.com").get(0);

        assertEquals("Bob Bob", existingUser.getName());

        AppUser toUpdate = new AppUser(existingUser.getUserId(), existingUser.getEmail(), existingUser.getPassHash(),
                existingUser.isDeleted(),existingUser.getUserRoles(),
                "Bob Bob Updated Name", existingUser.getSavedRecipes(), existingUser.getHealthLabels() );

        repo.save(toUpdate);

        AppUser user = repo.findByUsername("bob@bob.com").get(0);

        assertEquals("Bob Bob Updated Name", user.getName());

    }

    @Test
    void shouldDeleteExistingUser() {
        AppUser existingUser = repo.findByUsername("bob@bob.com").get(0);

        assertEquals("Bob Bob", existingUser.getName());

        AppUser toDelete = new AppUser(existingUser.getUserId(), existingUser.getEmail(), existingUser.getPassHash(),
                true,existingUser.getUserRoles(),
                "Bob Bob Updated Name", existingUser.getSavedRecipes(), existingUser.getHealthLabels() );

        repo.save(toDelete);

        AppUser user = repo.findByUsername("bob@bob.com").get(0);

        assertTrue(user.isDeleted());

    }



    public AppUser createUser() {
        String password =  "Password1!";
        String passHash = encoder.encode(password);
        return new AppUser("bob@bob.com", passHash,  false , List.of(new AppRole("USER")), "Bob Bob" ,new ArrayList<String>(), new ArrayList<String>());
    }
}