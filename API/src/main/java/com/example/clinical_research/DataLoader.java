package com.example.clinical_research;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.example.clinical_research.model.Patient;
import com.example.clinical_research.model.Study;
import com.example.clinical_research.service.PatientService;
import com.example.clinical_research.service.StudyService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private PatientService patientService;

    @Autowired
    private StudyService studyService;

    /**
     * Runs the data loading process.
     */
    @Override
    public void run(String... args) throws Exception {
        loadPatients();
        loadStudies();
    }

    /**
     * Loads patient data from a Patients JSON file in resources folder.
     * 
     * @throws IOException if an I/O error occurs
     */

    private void loadPatients() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Patient>> typeReference = new TypeReference<List<Patient>>() {
        };
        InputStream inputStream = new ClassPathResource("patients_data.json").getInputStream();
        List<Patient> patients = mapper.readValue(inputStream, typeReference);
        patients.forEach(patientService::savePatient);
    }

    /**
     * Loads study data from a Studies JSON file from resources folder.
     * 
     * @throws IOException if an I/O error occurs
     */
    private void loadStudies() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Study>> typeReference = new TypeReference<List<Study>>() {
        };
        InputStream inputStream = new ClassPathResource("study_data.json").getInputStream();
        List<Study> studies = mapper.readValue(inputStream, typeReference);
        studies.forEach(studyService::saveStudy);
    }
}