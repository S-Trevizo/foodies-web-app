package learn.solarfarm.controllers;

import learn.solarfarm.data.DataAccessException;
import learn.solarfarm.domain.ResultType;
import learn.solarfarm.domain.SolarPanelResult;
import learn.solarfarm.domain.SolarPanelService;
import learn.solarfarm.models.SolarPanel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solarpanel")
@CrossOrigin
public class SolarPanelController {
    private final SolarPanelService service;

    public SolarPanelController(SolarPanelService service) {
        this.service = service;
    }

//    @GetMapping
//    public List<SolarPanel> findAll() throws DataAccessException {
//        return service.findAll();
//    }

    @GetMapping
    public ResponseEntity<?> findAll() throws DataAccessException {
        try {
            List<SolarPanel> panels = service.findAll();
            return new ResponseEntity<>(panels, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/section/{section}")
    public List<SolarPanel> findBySection(@PathVariable String section) throws DataAccessException {
        return service.findBySection(section);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolarPanel> findById(@PathVariable String id) throws DataAccessException {
        SolarPanel solarPanel = service.findById(id);
        if (solarPanel == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(solarPanel, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SolarPanel solarPanel) throws DataAccessException {
        SolarPanelResult result = service.create(solarPanel);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); // 400
        }
        return new ResponseEntity<>(result.getSolarPanel(), HttpStatus.CREATED); // 201
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody SolarPanel solarPanel) throws DataAccessException {
        if (!id.equals( solarPanel.getId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
        }

        SolarPanelResult result = service.update(solarPanel);
        if (!result.isSuccess()) {
            if (result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); // 400
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws DataAccessException {
        SolarPanelResult result = service.deleteById(id);
        if (result.getResultType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
    }
}
