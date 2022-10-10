//package learn.solarfarm.data;
//
//import learn.solarfarm.models.Material;
//import learn.solarfarm.models.SolarPanel;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.AnnotationConfigApplicationContext;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
//class SolarPanelJdbcTemplateRepositoryTest {
//
//    @Autowired
//    private SolarPanelJdbcTemplateRepository repository;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    static boolean hasSetup = false;
//
//    @BeforeEach
//    void setup() {
//        if (!hasSetup) {
//            hasSetup = true;
//            jdbcTemplate.update("call set_known_good_state();");
//        }
//    }
//
//    @Test
//    void shouldFindAll() throws DataAccessException {
//        List<SolarPanel> result = repository.findAll();
//        assertNotNull(result);
//        assertTrue(result.size() >= 4);
//
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setId(1);
//        solarPanel.setSection("The Ridge");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setYearInstalled(2020);
//        solarPanel.setMaterial(Material.POLY_SI);
//        solarPanel.setTracking(true);
//
//        assertTrue(result.contains(solarPanel));
//    }
//
//    @Test
//    void shouldFindBySection() throws DataAccessException {
//        List<SolarPanel> result = repository.findBySection("The Ridge");
//        assertNotNull(result);
//        assertTrue(result.size() == 1 || result.size() == 2);
//    }
//
//    @Test
//    void shouldFindById() throws DataAccessException {
//        SolarPanel result = repository.findById(1);
//        assertNotNull(result);
//    }
//
//    @Test
//    void shouldCreate() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("East Hill");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(2);
//        solarPanel.setYearInstalled(2000);
//        solarPanel.setMaterial(Material.CIGS);
//        solarPanel.setTracking(true);
//
//        SolarPanel result = repository.create(solarPanel);
//
//        assertNotNull(result);
//        assertEquals(6, result.getId());
//
//        assertEquals(result, repository.findById(6));
//    }
//
//    @Test
//    void shouldUpdate() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setId(2);
//        solarPanel.setSection("East Ridge");
//        solarPanel.setRow(100);
//        solarPanel.setColumn(200);
//        solarPanel.setYearInstalled(2015);
//        solarPanel.setMaterial(Material.POLY_SI);
//        solarPanel.setTracking(false);
//
//        assertTrue(repository.update(solarPanel));
//        assertEquals(solarPanel, repository.findById(2));
//    }
//
//    @Test
//    void shouldDelete() throws DataAccessException {
//        assertTrue(repository.deleteById(5));
//    }
//}