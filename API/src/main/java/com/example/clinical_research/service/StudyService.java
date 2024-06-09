package com.example.clinical_research.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.clinical_research.Repos.StudyRepository;
// import com.example.clinical_research.Repos.StudyRepository;
import com.example.clinical_research.interfaces.IStudy;
import com.example.clinical_research.model.Study;

@Service
public class StudyService extends GenericService<Study, Long> implements IStudy {

    @Autowired
    private StudyRepository studyRepository;

    @Override
    public Study saveStudy(Study study) {
        return save(study);
    }

    @Override
    public List<Study> getAllStudies() {
        return findAll();
    }

    @Override
    public Optional<Study> getStudyById(Long id) {
        return findById(id);
    }

    @Override
    public Study updateStudy(Long id, Study studyDetails) {
        return update(id, studyDetails);
    }

    @Override
    public void deleteStudy(Long id) {
        deleteById(id);
    }

    public List<Study> getRecruitingStudies() {
        String status = "Recruiting";
        return studyRepository.findByStatus(status);
    }
}