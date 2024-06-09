package com.example.clinical_research;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;

@SpringBootTest
@AutoConfigureMockMvc
class ClinicalResearchApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void testGetAllStudies() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/studies")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk());
		// Add more assertions here for validating the response
	}

}
