package com.example.clinical_research.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import com.example.clinical_research.model.Study;
import com.example.clinical_research.service.StudyService;

@SpringBootTest
@AutoConfigureMockMvc
class StudyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private StudyService studyService;

    @InjectMocks
    private StudyController studyController;

    @Test
    void testCreateStudy() {
        Study study = new Study();
        when(studyService.save(any(Study.class))).thenReturn(study);

        ResponseEntity<Study> createdStudy = studyController.createStudy(study);

        assertNotNull(createdStudy);
        assertEquals(HttpStatus.CREATED, createdStudy.getStatusCode());
        assertEquals(study, createdStudy.getBody());
    }

    @Test
    void testGetAllStudies() throws Exception {
        List<Study> studies = new ArrayList<>();
        when(studyService.findAll()).thenReturn(studies);

        ResponseEntity<List<Study>> returnedStudies = studyController.getAllStudies();

        assertNotNull(returnedStudies);
        assertEquals(HttpStatus.OK, returnedStudies.getStatusCode());
        assertEquals(studies, returnedStudies.getBody());
    }

    @Test
    void testGetStudyById() {
        Study study = new Study();
        when(studyService.findById(1L)).thenReturn(Optional.of(study));

        ResponseEntity<Optional<Study>> response = studyController.getStudyById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(study, response.getBody().get());
    }

    @Test
    void testUpdateStudy() {
        Long id = 1L;
        Study updatedStudy = new Study();
        when(studyService.update(id, updatedStudy)).thenReturn(updatedStudy);

        ResponseEntity<Study> response = studyController.updateStudy(id, updatedStudy);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedStudy, response.getBody());
    }

    @Test
    void testDeleteStudy() {
        Long id = 1L;

        ResponseEntity<Void> response = studyController.deleteStudy(id);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testGetRecruitingStudies() {
        List<Study> studies = new ArrayList<>();
        when(studyService.getRecruitingStudies()).thenReturn(studies);

        ResponseEntity<List<Study>> returnedStudies = studyController.getRecruitingStudies();

        assertNotNull(returnedStudies);
        assertEquals(HttpStatus.OK, returnedStudies.getStatusCode());
        assertEquals(studies, returnedStudies.getBody());
    }
}
