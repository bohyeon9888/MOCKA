package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.service.InitializerService;
import java.nio.file.Files;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody InitializerRequestDto request) {
        try {
            Path projectFolder = initializerService.createInitializerFiles(request);
            return ResponseEntity.ok().body("Project files created at: " + projectFolder.toString());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating project files: " + e.getMessage());
        }
    }

    @PostMapping("/download")
    public ResponseEntity<Resource> download(@RequestBody InitializerRequestDto request) {
        try {
            Path projectRoot = initializerService.createInitializerFiles(request);
            Path zipPath = initializerService.packageProject(projectRoot);

            if (!Files.exists(zipPath)) {
                Resource errorResource = new ByteArrayResource("ZIP file not found.".getBytes());
                return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                    .body(errorResource);
            }

            // 파일 메모리에 적재 -> 삭제 -> 리턴
            byte[] data = Files.readAllBytes(zipPath);
            initializerService.cleanUpFiles(zipPath, projectRoot);
            Resource resource = new ByteArrayResource(data);

            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + zipPath.getFileName().toString() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
        } catch (Exception e) {
            Resource errorResource = new ByteArrayResource(("Error creating project files: " + e.getMessage()).getBytes());
            return ResponseEntity.internalServerError()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(errorResource);
        }
    }
}
