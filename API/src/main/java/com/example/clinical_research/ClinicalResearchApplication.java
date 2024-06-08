package com.example.clinical_research;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClinicalResearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicalResearchApplication.class, args);
	}

	@Bean
	public ConfigurableServletWebServerFactory servletContainer() {
		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
		factory.addConnectorCustomizers(connector -> {
			connector.setPort(8080);
			connector.setSecure(true);
			connector.setScheme("https");
		});
		return factory;
	}
}
