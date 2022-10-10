package learn.recipemanager.data;

import learn.recipemanager.models.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepo extends MongoRepository<AppUser, String> {

    @Query("{'email' : {$regex: ?0}}")
    List<AppUser> findByUsername(String email);
}
