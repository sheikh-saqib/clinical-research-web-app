package com.example.clinical_research.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinical_research.model.Study;
import com.example.clinical_research.service.StudyService;

/**
 * Controller class for managing study-related endpoints.
 */
@RestController
@RequestMapping("/api/studies")
public class StudyController {

    @Autowired
    private StudyService studyService;

    /**
     * Creates a new study.
     * 
     * @param study The study to create.
     * @return ResponseEntity containing the created study or an error response if
     *         an exception occurs.
     */
    @PostMapping
    public ResponseEntity<Study> createStudy(@RequestBody Study study) {
        try {
            Study createdStudy = studyService.save(study);
            return new ResponseEntity<>(createdStudy, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all studies.
     * 
     * @return ResponseEntity containing the list of studies or an error response if
     *         an exception occurs.
     */
    @GetMapping
    public ResponseEntity<List<Study>> getAllStudies() {
        try {
            List<Study> studies = studyService.findAll();
            return new ResponseEntity<>(studies, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves a study by ID.
     * 
     * @param id The ID of the study to retrieve.
     * @return ResponseEntity containing the study with the specified ID or an error
     *         response if the study is not found or an exception occurs.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Study>> getStudyById(@PathVariable Long id) {
        try {
            Optional<Study> study = studyService.findById(id);
            if (study.isPresent()) {
                return new ResponseEntity<>(study, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates a study by ID.
     * 
     * @param id           The ID of the study to update.
     * @param studyDetails The updated study details.
     * @return ResponseEntity containing the updated study or an error response if
     *         the study is not found or an exception occurs.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Study> updateStudy(@PathVariable Long id, @RequestBody Study studyDetails) {
        try {
            Study updatedStudy = studyService.update(id, studyDetails);
            return new ResponseEntity<>(updatedStudy, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a study by ID.
     * 
     * @param id The ID of the study to delete.
     * @return ResponseEntity indicating success or an error response if the study
     *         is not found or an exception occurs.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudy(@PathVariable Long id) {
        try {
            studyService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Partially updates a study by ID.
     * 
     * @param id      The ID of the study to update.
     * @param updates The map containing partial updates to apply to the study.
     * @return ResponseEntity containing the updated study or an error response if
     *         the study is not found, an invalid field is provided, or an exception
     *         occurs.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Study> patchStudy(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Study study = studyService.getStudyById(id)
                    .orElseThrow(() -> new RuntimeException("Study not found with id: " + id));

            updates.forEach((key, value) -> {
                switch (key) {
                    case "title":
                        study.setTitle((String) value);
                        break;
                    case "therapeutics":
                        study.setTherapeutics((String) value);
                        break;
                    case "description":
                        study.setDescription((String) value);
                        break;
                    case "status":
                        study.setStatus((String) value);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid field: " + key);
                }
            });
            Study patchedStudy = studyService.updateStudy(id, study);
            return new ResponseEntity<>(patchedStudy, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all recruiting studies.
     * 
     * @return ResponseEntity containing the list of recruiting studies or an error
     *         response if an exception occurs.
     */
    @GetMapping("/recruiting")
    public ResponseEntity<List<Study>> getRecruitingStudies() {
        try {
            List<Study> recruitingStudies = studyService.getRecruitingStudies();
            return new ResponseEntity<>(recruitingStudies, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
