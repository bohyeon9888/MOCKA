package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.service.InitializerService;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/initializer")
public class InitializerController {

    private final InitializerService initializerService;

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody InitializerRequestDto request) {
        try {
            Path projectFolder = initializerService.createInitializerFiles(request);
            return ResponseEntity.ok().body("Project files created at: " + projectFolder.toString());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating project files: " + e.getMessage());
        }
    }
}
