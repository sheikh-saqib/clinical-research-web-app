package com.example.clinical_research.service;

import java.util.List;
import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.example.clinical_research.Repos.PatientRepository;
import com.example.clinical_research.interfaces.IPatient;
import com.example.clinical_research.model.Patient;

@Service
public class PatientService extends GenericService<Patient, Long> implements IPatient {

    // @Autowired
    // private PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patient) {
        return save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return findAll();
    }

    @Override
    public Optional<Patient> getPatientById(Long id) {
        return findById(id);
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        return update(id, patientDetails);
    }

    @Override
    public void deletePatient(Long id) {
        deleteById(id);
    }
}