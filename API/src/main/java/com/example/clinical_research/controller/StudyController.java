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

@RestController
@RequestMapping("/api/studies")
public class StudyController {

    @Autowired
    private StudyService studyService;

    @PostMapping
    public ResponseEntity<Study> createStudy(@RequestBody Study study) {
        try {
            Study createdStudy = studyService.save(study);
            return new ResponseEntity<>(createdStudy, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Study>> getAllStudies() {
        try {
            List<Study> studies = studyService.findAll();
            return new ResponseEntity<>(studies, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

    @PutMapping("/{id}")
    public ResponseEntity<Study> updateStudy(@PathVariable Long id, @RequestBody Study studyDetails) {
        try {
            Study updatedStudy = studyService.update(id, studyDetails);
            return new ResponseEntity<>(updatedStudy, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudy(@PathVariable Long id) {
        try {
            studyService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
