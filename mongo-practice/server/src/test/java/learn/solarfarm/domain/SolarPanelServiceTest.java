//package learn.solarfarm.domain;
//
//import learn.solarfarm.data.DataAccessException;
//import learn.solarfarm.data.SolarPanelRepository;
//import learn.solarfarm.models.Material;
//import learn.solarfarm.models.SolarPanel;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//
//import java.time.Year;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import static org.mockito.Mockito.*;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
//class SolarPanelServiceTest {
//
//    @Autowired
//    SolarPanelService service;
//
//    // What is a mock?
//
//    // Takes our interface and creates a class at runtime that implements our interface
//    // then it creates an instance from that dynamically class
//
//    @MockBean
//    SolarPanelRepository repository;
//
//    @Test
//    void shouldFindTwoSolarPanelsForSectionOne() throws DataAccessException {
//        when(repository.findBySection("Section One")).thenReturn(List.of(
//                new SolarPanel(1, "Section One", 1, 1, 2020, Material.POLY_SI, true),
//                new SolarPanel(2, "Section One", 1, 2, 2020, Material.POLY_SI, true)
//        ));
//
//        List<SolarPanel> solarPanels = service.findBySection("Section One");
//
//        assertEquals(2, solarPanels.size());
//    }
//
//    @Test
//    void shouldFindSolarPanelWithAnIdOf1() throws DataAccessException {
//        when(repository.findById(3)).thenReturn(new SolarPanel());
//        SolarPanel solarPanel = service.findById(3);
//        assertNotNull(solarPanel);
//    }
//
//    @Test
//    void shouldNotCreateNull() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = null;
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("cannot be null"));
//    }
//
//    @Test
//    void shouldNotCreateNullSection() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection(null);
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`section`"));
//    }
//
//    @Test
//    void shouldNotCreateEmptySection() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`section`"));
//    }
//
//    @Test
//    void shouldNotCreateNullMaterial() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setYearInstalled(2000);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`material`"));
//    }
//
//    @Test
//    void shouldNotCreateNonPositiveRow() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(0);
//        solarPanel.setColumn(1);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`row`"));
//    }
//
//    @Test
//    void shouldNotCreateGreaterThanMaxRow() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(SolarPanelService.MAX_ROW_COLUMN + 1);
//        solarPanel.setColumn(1);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`row`"));
//    }
//
//    @Test
//    void shouldNotCreateNonPositiveColumn() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(0);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`column`"));
//    }
//
//    @Test
//    void shouldNotCreateGreaterThanMaxColumn() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(SolarPanelService.MAX_ROW_COLUMN + 1);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`column`"));
//    }
//
//    @Test
//    void shouldNotCreateYearInstalledInTheFuture() throws DataAccessException {
//        // Arrange
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setYearInstalled(Year.now().plusYears(1).getValue());
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        // Act
//        SolarPanelResult result = service.create(solarPanel);
//
//        // Assert
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`yearInstalled`"));
//    }
//
//    @Test
//    void shouldNotCreateNonUniqueSectionRowColumn() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setYearInstalled(2000);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        when(repository.findBySection("Section One")).thenReturn(List.of(
//                new SolarPanel(1, "Section One", 1, 1, 1999, Material.CIGS, true)
//        ));
//
//        SolarPanelResult result = service.create(solarPanel);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("must be unique"));
//    }
//
//    @Test
//    void shouldNotCreatePositiveId() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel(1, "Section One", 1, 1, 2020,
//                Material.POLY_SI, true);
//
//        SolarPanelResult result = service.create(solarPanel);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`id`"));
//    }
//
//    @Test
//    void shouldCreate() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(3);
//        solarPanel.setYearInstalled(2000);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        when(repository.create(solarPanel)).thenReturn(solarPanel);
//
//        SolarPanelResult result = service.create(solarPanel);
//
//        assertTrue(result.isSuccess());
//        assertNotNull(result.getSolarPanel());
//    }
//
//    @Test
//    void shouldNotUpdateEmptySection() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel(1, "", 1, 1, 2020, Material.POLY_SI, true);
//
//        SolarPanelResult result = service.update(solarPanel);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`section`"));
//    }
//
//    @Test
//    void shouldNotUpdateNonPositiveId() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(3);
//        solarPanel.setYearInstalled(2000);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        SolarPanelResult result = service.update(solarPanel);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("`id`"));
//    }
//
//    @Test
//    void shouldNotUpdateNonExistentSolarPanel() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setId(1000);
//        solarPanel.setSection("Section One");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(3);
//        solarPanel.setYearInstalled(2000);
//        solarPanel.setMaterial(Material.POLY_SI);
//
//        SolarPanelResult result = service.update(solarPanel);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("was not found"));
//    }
//
//    @Test
//    void shouldUpdate() throws DataAccessException {
//        SolarPanel solarPanel = new SolarPanel(1, "Section One", 1, 1, 2020, Material.A_SI, true);
//
//        when(repository.update(solarPanel)).thenReturn(true);
//
//        SolarPanelResult result = service.update(solarPanel);
//
//        assertTrue(result.isSuccess());
//    }
//
//    @Test
//    void shouldNotDeleteNonExistentSolarPanel() throws DataAccessException {
//        SolarPanelResult result = service.deleteById(1024);
//
//        assertFalse(result.isSuccess());
//        assertEquals(1, result.getErrorMessages().size());
//        assertTrue(result.getErrorMessages().get(0).contains("was not found"));
//    }
//
//    @Test
//    void shouldDelete() throws DataAccessException {
//        when(repository.deleteById(1)).thenReturn(true);
//
//        SolarPanelResult result = service.deleteById(1);
//
//        assertTrue(result.isSuccess());
//    }
//}
