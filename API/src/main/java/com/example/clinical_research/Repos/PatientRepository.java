package com.example.clinical_research.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.clinical_research.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // We can add custom methods which are non generic
}