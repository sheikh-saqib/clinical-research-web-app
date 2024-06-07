package com.example.clinical_research.interfaces;

import java.util.List;
import java.util.Optional;

import com.example.clinical_research.model.Study;

public interface IStudy {

    Study saveStudy(Study study);

    List<Study> getAllStudies();

    Optional<Study> getStudyById(Long id);

    Study updateStudy(Long id, Study studyDetails);

    void deleteStudy(Long id);
}