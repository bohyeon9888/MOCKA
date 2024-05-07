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

        if (response != null && response.getDependencies() != null) {
            response.getDependencies().forEach((id, dependency) -> {
                // Gradle dependency line with conditional version and scope
                String gradleLine = mapGradleScope(dependency.getScope()) +
                    " '" + dependency.getGroupId() + ":" + dependency.getArtifactId() +
                    (dependency.getVersion() != null ? ":" + dependency.getVersion() : "") + "'";

                StringBuilder pomBuilder = new StringBuilder();
                pomBuilder.append("\t\t<dependency>\n")
                    .append("\t\t\t<groupId>").append(dependency.getGroupId()).append("</groupId>\n")
                    .append("\t\t\t<artifactId>").append(dependency.getArtifactId()).append("</artifactId>\n");
                if (dependency.getVersion() != null) {
                    pomBuilder.append("\t\t\t<version>").append(dependency.getVersion()).append("</version>\n");
                }
                if (dependency.getScope() != null) {
                    pomBuilder.append("\t\t\t<scope>").append(dependency.getScope()).append("</scope>\n");
                }
                pomBuilder.append("\t\t</dependency>");

                gradleMap.put(id, gradleLine);
                pomMap.put(id, pomBuilder.toString());
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

    public Map<String, String> getAllGradleDependencies(String version) {
        if (version.equals("3.1.11")) {
            return new HashMap<>(gradle3111); // 복사본을 반환하여 외부에서 원본 데이터 수정 방지
        } else if (version.equals("3.2.5")) {
            return new HashMap<>(gradle325); // 복사본을 반환
        }
        return new HashMap<>(); // 해당 버전이 없는 경우 빈 맵 반환
    }

    public Map<String, String> getAllPomDependencies(String version) {
        if (version.equals("3.1.11")) {
            return new HashMap<>(pom3111); // 복사본을 반환
        } else if (version.equals("3.2.5")) {
            return new HashMap<>(pom325); // 복사본을 반환
        }
        return new HashMap<>(); // 해당 버전이 없는 경우 빈 맵 반환
    }

    private String mapGradleScope(String mavenScope) {
        if (mavenScope == null) {
            return "implementation"; // 기본 값
        }
        switch (mavenScope) {
            case "compile":
                return "\tcompileOnly";
            case "runtime":
                return "\truntimeOnly";
            case "test":
                return "\ttestImplementation";
            case "annotationProcessor":
                return "\tannotationProcessor";
            default:
                return "\timplementation"; // Maven과 Gradle 간에 정확한 매핑이 없는 경우
        }
    }
}