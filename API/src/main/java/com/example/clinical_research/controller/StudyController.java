package com.example.clinical_research.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
    public Study createStudy(@RequestBody Study study) {
        return studyService.save(study);
    }

    @GetMapping
    public List<Study> getAllStudies() {
        return studyService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Study> getStudyById(@PathVariable Long id) {
        return studyService.findById(id);
    }

    @PutMapping("/{id}")
    public Study updateStudy(@PathVariable Long id, @RequestBody Study studyDetails) {
        return studyService.update(id, studyDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteStudy(@PathVariable Long id) {
        studyService.deleteById(id);
    }
}