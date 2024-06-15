package com.example.clinical_research;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // enables auto-configurations, component scanning
public class ClinicalResearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicalResearchApplication.class, args); // triggers intialization
	}

}
