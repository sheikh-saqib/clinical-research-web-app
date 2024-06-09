package com.example.clinical_research.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinical_research.model.PatientStudy;
import com.example.clinical_research.service.DashboardService;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<List<PatientStudy>> getPatientStudies() {
        List<PatientStudy> patientStudies = dashboardService.getPatientStudyDetails();
        return ResponseEntity.ok(patientStudies);
    }
}