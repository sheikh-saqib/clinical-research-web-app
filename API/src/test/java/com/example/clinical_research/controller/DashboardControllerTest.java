package com.example.clinical_research.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.clinical_research.model.PatientStudy;
import com.example.clinical_research.service.DashboardService;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardControllerTest {

    @Mock
    private DashboardService dashboardService;

    @InjectMocks
    private DashboardController dashboardController;

    @Test
    void testGetPatientStudies() {
        // Mocking the service method to return a list of patient studies
        List<PatientStudy> patientStudies = new ArrayList<>();
        // Add some dummy data for testing
        patientStudies.add(new PatientStudy());
        patientStudies.add(new PatientStudy());
        when(dashboardService.getPatientStudyDetails()).thenReturn(patientStudies);

        // Calling the controller method
        ResponseEntity<List<PatientStudy>> response = dashboardController.getPatientStudies();

        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<PatientStudy> responseBody = response.getBody();
        assertEquals(patientStudies.size(), responseBody.size());
    }
}