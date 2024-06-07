package com.example.clinical_research.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Patient {
    @Id
    private Long patientID;
    private String name;
    private int age;
    private String gender;
    private String condition;
    private String recruitmentDate;

    // Constructors
    public Patient() {
    }

    public Patient(String name, int age, String gender, String condition, String recruitmentDate) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.condition = condition;
        this.recruitmentDate = recruitmentDate;
    }

    // Getters and Setters
    public Long getPatientID() {
        return patientID;
    }

    public void setPatientID(Long patientID) {
        this.patientID = patientID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getRecruitmentDate() {
        return recruitmentDate;
    }

    public void setRecruitmentDate(String recruitmentDate) {
        this.recruitmentDate = recruitmentDate;
    }
}