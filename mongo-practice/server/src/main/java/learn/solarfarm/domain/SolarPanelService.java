package learn.solarfarm.domain;

import learn.solarfarm.data.DataAccessException;
import learn.solarfarm.data.SolarPanelMongoRepo;
import learn.solarfarm.models.SolarPanel;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SolarPanelService {
    public final static int MAX_ROW_COLUMN = 250;

    private final SolarPanelMongoRepo repository;

    public SolarPanelService(SolarPanelMongoRepo repository) {
        this.repository = repository;
    }

    public static int getMaxInstallationYear() {
        return Year.now().getValue();
    }

    public List<SolarPanel> findAll() throws DataAccessException {
        return repository.findAll();
    }

    public List<SolarPanel> findBySection(String section) throws DataAccessException {

        return repository.findPanelBySection(section);
    }

    public SolarPanel findById(String id) throws DataAccessException {
        Optional panelOptional = repository.findById(id);
       if (panelOptional.isPresent()) {
           return (SolarPanel) panelOptional.get();
       }

       return null;
    }

    public SolarPanelResult create(SolarPanel solarPanel) throws DataAccessException {
        SolarPanelResult result = validate(solarPanel);

        if (solarPanel != null && solarPanel.getId() != null) {
            result.addErrorMessage("SolarPanel `id` should not be set.", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            solarPanel.setId(UUID.randomUUID().toString());
            solarPanel = repository.save(solarPanel);
            result.setSolarPanel(solarPanel);
        }

        return result;
    }

    public SolarPanelResult update(SolarPanel solarPanel) throws DataAccessException {
        SolarPanelResult result = validate(solarPanel);

        if (solarPanel.getId() == null) {
            result.addErrorMessage("SolarPanel `id` is required.", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            if (repository.existsById(solarPanel.getId())) {
                repository.save(solarPanel);
                result.setSolarPanel(solarPanel);
            } else {
                result.addErrorMessage("SolarPanel id %s was not found.", ResultType.NOT_FOUND, solarPanel.getId());
            }
        }
        return result;
    }

    public SolarPanelResult deleteById(String id) throws DataAccessException {
        SolarPanelResult result = new SolarPanelResult();
        repository.deleteById(id);

        if (repository.findById(id).isPresent()) {
            result.addErrorMessage("Panel could not be deleted", ResultType.NOT_FOUND);
        }

        return result;
    }

    private SolarPanelResult validate(SolarPanel solarPanel) throws DataAccessException {
        SolarPanelResult result = new SolarPanelResult();

        if (solarPanel == null) {
            result.addErrorMessage("SolarPanel cannot be null.", ResultType.INVALID);
            return result;
        }

        if (solarPanel.getSection() == null || solarPanel.getSection().isBlank()) {
            result.addErrorMessage("SolarPanel `section` is required.", ResultType.INVALID);
        }

        if (solarPanel.getRow() < 1 || solarPanel.getRow() >= MAX_ROW_COLUMN) {
            result.addErrorMessage("SolarPanel `row` must be a positive number less than or equal to %s.",
                    ResultType.INVALID, MAX_ROW_COLUMN);
        }

        if (solarPanel.getColumn() < 1 || solarPanel.getColumn() >= MAX_ROW_COLUMN) {
            result.addErrorMessage("SolarPanel `column` must be a positive number less than or equal to %s.",
                    ResultType.INVALID, MAX_ROW_COLUMN);
        }

        if (solarPanel.getYearInstalled() > getMaxInstallationYear()) {
            result.addErrorMessage("SolarPanel `yearInstalled` must be in the past.", ResultType.INVALID);
        }

        if (solarPanel.getMaterial() == null) {
            result.addErrorMessage("SolarPanel `material` is required.", ResultType.INVALID);
        }

        // If everything is successful so far, then check if the combined values
        // of **Section**, **Row**, and **Column** are unique (i.e. the natural key).
        if (result.isSuccess()) {
            List<SolarPanel> existingSolarPanels = repository.findPanelBySection(solarPanel.getSection());

            for (SolarPanel existingSolarPanel : existingSolarPanels) {
                // If an existing panel was found for the provided **Section**, **Row**, and **Column** values
                // add an error message if the id values don't match (i.e. they're not the same record).
                if (existingSolarPanel.getId() != solarPanel.getId() &&
                        existingSolarPanel.getSection().equalsIgnoreCase(solarPanel.getSection()) &&
                        existingSolarPanel.getRow() == solarPanel.getRow() &&
                        existingSolarPanel.getColumn() == solarPanel.getColumn()) {
                    result.addErrorMessage("SolarPanel `section`, `row`, and `column` must be unique.",
                            ResultType.INVALID);
                }
            }
        }

        return result;
    }
}
