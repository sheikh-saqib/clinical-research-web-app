package com.example.clinical_research.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String therapeutics;
    private String description;
    private String status;

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

    // Constructors
    public Study() {
    }

    public Study(String title, String therapeutics, String description, String status) {
        this.title = title;
        this.therapeutics = therapeutics;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTherapeutics() {
        return therapeutics;
    }

    public void setTherapeutics(String therapeutics) {
        this.therapeutics = therapeutics;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }
}