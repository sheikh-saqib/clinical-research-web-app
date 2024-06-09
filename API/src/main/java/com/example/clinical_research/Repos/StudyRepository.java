package com.example.clinical_research.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.clinical_research.model.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByStatus(String status);
}