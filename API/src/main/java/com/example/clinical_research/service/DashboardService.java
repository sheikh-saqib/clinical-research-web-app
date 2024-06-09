package com.example.clinical_research.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.clinical_research.interfaces.IDashboard;
import com.example.clinical_research.model.Patient;
import com.example.clinical_research.model.PatientStudy;
import com.example.clinical_research.model.Study;

@Service
public class DashboardService implements IDashboard {

    @Autowired
    private StudyService studyService;
    @Autowired
    private PatientService patientService;

    public List<PatientStudy> getPatientStudyDetails() {
        List<Patient> patients = patientService.getAllPatients();
        List<PatientStudy> patientStudy = new ArrayList<>();

        for (Patient patient : patients) {
            // Convert patientId from string to long
            long patientId = Long.parseLong(patient.getPatientID());

            // Retrieve study details by patient ID
            Optional<Study> studyOptional = studyService.getStudyById(patientId);

            // Check if study is present for the patient
            if (studyOptional.isPresent()) {
                Study study = studyOptional.get();
                // Create a PatientStudy instance and populate it
                PatientStudy patientStudyDetails = new PatientStudy();
                patientStudyDetails.setId(patient.getId());
                patientStudyDetails.setPatientName(patient.getName());
                patientStudyDetails.setStudyTitle(study.getTitle());
                patientStudyDetails.setStudyDescription(study.getDescription());
                patientStudyDetails.setStudyStatus(study.getStatus());
                patientStudyDetails.setRecruitmentDate(patient.getRecruitmentDate());
                patientStudyDetails.setStudyId(study.getStudyId());

                // Add the PatientStudy instance to the list
                patientStudy.add(patientStudyDetails);
            } else {
                System.out.println("No study found for patient with ID: " + patientId);
            }
        }

        return patientStudy;
    }
}