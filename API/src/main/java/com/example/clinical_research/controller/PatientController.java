package com.example.clinical_research.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinical_research.model.Patient;
import com.example.clinical_research.service.PatientService;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    /**
     * Creates a new patient.
     * 
     * @param patient The patient to create.
     * @return ResponseEntity containing the created patient or an error response if
     *         an exception occurs.
     */
    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        try {
            Patient createdPatient = patientService.save(patient);
            return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Gives all patients.
     * 
     * @return ResponseEntity containing the list of patients or an error response
     *         if an exception occurs.
     */
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        try {
            List<Patient> patients = patientService.findAll();
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Gives a patient by ID.
     * 
     * @param id The ID of the patient to retrieve.
     * @return ResponseEntity containing the patient with the specified ID or an
     *         error response if the patient is not found or an exception occurs.
     */
    @GetMapping("/{id}")
    // @Cacheable(value = "patients", key = "#id") // Cache with name "patients" and
    // key as the patient ID
    public ResponseEntity<Optional<Patient>> getPatientById(@PathVariable Long id) {
        try {
            Optional<Patient> patient = patientService.findById(id);
            if (patient.isPresent()) {
                return new ResponseEntity<>(patient, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates a patient by ID.
     * 
     * @param id             The ID of the patient to update.
     * @param patientDetails The updated patient details.
     * @return ResponseEntity containing the updated patient or an error response if
     *         the patient is not found or an exception occurs.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        try {
            Patient updatedPatient = patientService.update(id, patientDetails);
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a patient by ID.
     * 
     * @param id The ID of the patient to delete.
     * @return ResponseEntity indicating success or an error response if the patient
     *         is not found or an exception occurs.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        try {
            patientService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Partially updates a patient by ID.
     * 
     * @param id      The ID of the patient to update.
     * @param updates The map containing partial updates to apply to the patient.
     * @return ResponseEntity containing the updated patient or an error response if
     *         the patient is not found, an invalid field is provided, or an
     *         exception occurs.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Patient> patchPatient(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Patient patient = patientService.getPatientById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

            // Apply partial updates which are present in the payload
            updates.forEach((key, value) -> {
                switch (key) {
                    case "name":
                        patient.setName((String) value);
                        break;
                    case "age":
                        patient.setAge((Integer) value);
                        break;
                    case "gender":
                        patient.setGender((String) value);
                        break;
                    case "condition":
                        patient.setCondition((String) value);
                        break;
                    case "recruitmentDate":
                        patient.setRecruitmentDate((String) value);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid field: " + key);
                }
            });

            // Save the updated patient
            Patient updatedPatient = patientService.updatePatient(id, patient);
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}