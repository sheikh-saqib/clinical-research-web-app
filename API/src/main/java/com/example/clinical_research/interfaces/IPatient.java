package com.example.clinical_research.interfaces;

import java.util.List;
import java.util.Optional;

import com.example.clinical_research.model.Patient;

public interface IPatient {

    Patient savePatient(Patient patient);

    List<Patient> getAllPatients();

    Optional<Patient> getPatientById(Long id);

    Patient updatePatient(Long id, Patient patientDetails);

    void deletePatient(Long id);
}
