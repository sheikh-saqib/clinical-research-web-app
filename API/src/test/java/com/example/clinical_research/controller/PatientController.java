package com.example.clinical_research.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import com.example.clinical_research.model.Patient;
import com.example.clinical_research.service.PatientService;

@SpringBootTest
@AutoConfigureMockMvc
class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private PatientService patientService;

    @InjectMocks
    private PatientController patientController;

    @Test
    void testCreatePatient() {
        Patient patient = new Patient();
        when(patientService.save(any(Patient.class))).thenReturn(patient);

        ResponseEntity<Patient> createdPatient = patientController.createPatient(patient);

        assertNotNull(createdPatient);
        assertEquals(HttpStatus.CREATED, createdPatient.getStatusCode());
        assertEquals(patient, createdPatient.getBody());
    }

    @Test
    void testGetAllPatients() throws Exception {
        List<Patient> patients = new ArrayList<>();
        when(patientService.findAll()).thenReturn(patients);

        ResponseEntity<List<Patient>> returnedPatients = patientController.getAllPatients();

        assertNotNull(returnedPatients);
        assertEquals(HttpStatus.OK, returnedPatients.getStatusCode());
        assertEquals(patients, returnedPatients.getBody());
    }

    @Test
    void testGetPatientById() {
        Patient patient = new Patient();
        when(patientService.findById(1L)).thenReturn(Optional.of(patient));

        ResponseEntity<Optional<Patient>> response = patientController.getPatientById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(patient, response.getBody().get());
    }

    @Test
    void testUpdatePatient() {
        Long id = 1L;
        Patient updatedPatient = new Patient();
        when(patientService.update(id, updatedPatient)).thenReturn(updatedPatient);

        ResponseEntity<Patient> response = patientController.updatePatient(id, updatedPatient);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedPatient, response.getBody());
    }

    @Test
    void testDeletePatient() {
        Long id = 1L;

        ResponseEntity<Void> response = patientController.deletePatient(id);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
