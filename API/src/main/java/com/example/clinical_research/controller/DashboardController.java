package com.example.clinical_research.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinical_research.model.PatientStudy;
import com.example.clinical_research.service.DashboardService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * Retrieves details of patient studies from the dashboard service.
     * 
     * @return ResponseEntity containing the list of PatientStudy objects, or an
     *         error response if an exception occurs
     */
    @GetMapping("/dashboard")
    public ResponseEntity<List<PatientStudy>> getPatientStudies() {
        try {
            List<PatientStudy> patientStudies = dashboardService.getPatientStudyDetails();
            return ResponseEntity.ok(patientStudies);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
