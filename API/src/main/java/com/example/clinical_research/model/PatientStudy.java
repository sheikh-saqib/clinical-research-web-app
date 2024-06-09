package com.example.clinical_research.model;

public class PatientStudy {
    private String patientName;
    private String studyTitle;
    private String studyDescription;
    private String studyStatus;
    private String recruitmentDate;
    private Long id;
    private Long studyId;

    public PatientStudy() {
    }

    public PatientStudy(String patientName, String studyTitle, String studyDescription, String studyStatus,
            String recruitmentDate, Long id, Long studyId) {
        this.patientName = patientName;
        this.studyTitle = studyTitle;
        this.studyDescription = studyDescription;
        this.studyStatus = studyStatus;
        this.recruitmentDate = recruitmentDate;
        this.id = id;
        this.studyId = studyId;
    }

    // Getters and Setters
    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getStudyTitle() {
        return studyTitle;
    }

    public void setStudyTitle(String studyTitle) {
        this.studyTitle = studyTitle;
    }

    public String getStudyDescription() {
        return studyDescription;
    }

    public void setStudyDescription(String studyDescription) {
        this.studyDescription = studyDescription;
    }

    public String getStudyStatus() {
        return studyStatus;
    }

    public void setStudyStatus(String studyStatus) {
        this.studyStatus = studyStatus;
    }

    public String getRecruitmentDate() {
        return recruitmentDate;
    }

    public void setRecruitmentDate(String recruitmentDate) {
        this.recruitmentDate = recruitmentDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudyId() {
        return studyId;
    }

    public void setStudyId(Long studyId) {
        this.studyId = studyId;
    }
}
