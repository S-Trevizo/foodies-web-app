package learn.solarfarm.data;

import learn.solarfarm.models.SolarPanel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SolarPanelMongoRepo extends MongoRepository<SolarPanel, String> {

    @Query("{'section' : {$regex: ?0}}")
    List<SolarPanel> findPanelBySection(String section);
}
