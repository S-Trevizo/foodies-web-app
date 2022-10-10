package learn.recipemanager.data;

import learn.recipemanager.models.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepo extends MongoRepository<AppUser, String> {
}
