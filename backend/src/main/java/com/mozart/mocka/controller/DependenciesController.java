package com.mozart.mocka.controller;

import com.mozart.mocka.util.DependencyManager;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DependenciesController {
    private final DependencyManager dependencyManager;

    @GetMapping("/dependency/gradle")
    public ResponseEntity<String> getGradleDependency(
        @RequestParam("version") String version,
        @RequestParam("dependencyId") String dependencyId) {
        String dependency = dependencyManager.getGradleDependency(version, dependencyId);
        return dependency != null ? ResponseEntity.ok(dependency) : ResponseEntity.notFound().build();
    }

    @GetMapping("/dependency/pom")
    public ResponseEntity<String> getPomDependency(
        @RequestParam("version") String version,
        @RequestParam("dependencyId") String dependencyId) {
        String dependency = dependencyManager.getPomDependency(version, dependencyId);
        return dependency != null ? ResponseEntity.ok(dependency) : ResponseEntity.notFound().build();
    }

    @GetMapping("/dependency/gradle/all")
    public ResponseEntity<Map<String, String>> getAllGradleDependencies(@RequestParam("version") String version) {
        Map<String, String> dependencies = dependencyManager.getAllGradleDependencies(version);
        return !dependencies.isEmpty() ? ResponseEntity.ok(dependencies) : ResponseEntity.notFound().build();
    }

    @GetMapping("/dependency/pom/all")
    public ResponseEntity<Map<String, String>> getAllPomDependencies(@RequestParam("version") String version) {
        Map<String, String> dependencies = dependencyManager.getAllPomDependencies(version);
        return !dependencies.isEmpty() ? ResponseEntity.ok(dependencies) : ResponseEntity.notFound().build();
    }
}
