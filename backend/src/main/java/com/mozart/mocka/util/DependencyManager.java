package com.mozart.mocka.util;

import com.mozart.mocka.dto.response.DependencyResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class DependencyManager {
    private static final String BASE_URL = "https://start.spring.io/dependencies";
    private Map<String, String> pom3111 = new HashMap<>();
    private Map<String, String> gradle3111 = new HashMap<>();
    private Map<String, String> pom325 = new HashMap<>();
    private Map<String, String> gradle325 = new HashMap<>();

    @PostConstruct
    public void init() {
        loadDependencies("3.1.11.RELEASE", pom3111, gradle3111);
        loadDependencies("3.2.5.RELEASE", pom325, gradle325);
    }

    private void loadDependencies(String version, Map<String, String> pomMap, Map<String, String> gradleMap) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + "?bootVersion=" + version;
        DependencyResponse response = restTemplate.getForObject(url, DependencyResponse.class);

        if (response != null) {
            response.getDependencies().forEach((id, dependency) -> {
                String gradleLine = "implementation '" + dependency.getGroupId() + ":" + dependency.getArtifactId() + "'";
                String pomLine = "<dependency>\n" +
                    "    <groupId>" + dependency.getGroupId() + "</groupId>\n" +
                    "    <artifactId>" + dependency.getArtifactId() + "</artifactId>\n" +
                    "    <version>" + dependency.getVersion() + "</version>\n" +
                    "</dependency>";

                gradleMap.put(id, gradleLine);
                pomMap.put(id, pomLine);
            });
        }
    }

    public String getGradleDependency(String version, String dependencyId) {
        if (version.equals("3.1.11")) {
            return gradle3111.get(dependencyId);
        } else if (version.equals("3.2.5")) {
            return gradle325.get(dependencyId);
        }
        return null;
    }

    public String getPomDependency(String version, String dependencyId) {
        if (version.equals("3.1.11")) {
            return pom3111.get(dependencyId);
        } else if (version.equals("3.2.5")) {
            return pom325.get(dependencyId);
        }
        return null;
    }
}