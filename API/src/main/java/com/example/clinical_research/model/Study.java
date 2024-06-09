package com.example.clinical_research.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyId;

    private String title;
    private String therapeutics;
    private String description;
    private String status;

    // Constructors, getters, and setters
    public Study() {
    }

    public Study(Long studyId, String title, String therapeutics, String description, String status) {
        this.studyId = studyId;
        this.title = title;
        this.therapeutics = therapeutics;
        this.description = description;
        this.status = status;
    }

    public Long getStudyId() {
        return studyId;
    }

    public void setStudyId(Long studyId) {
        this.studyId = studyId;
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
}
