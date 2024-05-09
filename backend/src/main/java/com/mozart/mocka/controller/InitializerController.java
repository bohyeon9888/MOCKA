package com.mozart.mocka.controller;

import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.repository.ApiProjectRepository;
import com.mozart.mocka.repository.ProjectRepository;
import com.mozart.mocka.service.InitializerService;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/initializer")
public class InitializerController {
    private final InitializerService initializerService;
    private final ApiProjectRepository apiProjectRepository;
    private final ProjectRepository projectRepository;

    @PostMapping("/create/{projectId}")
    public ResponseEntity<Resource> download(
        @PathVariable("projectId") Long projectId,
        @RequestBody InitializerRequestDto request) {

        List<ApiProjects> apis = apiProjectRepository.findByProjectId(projectId);
        Projects project = projectRepository.findByProjectId(projectId);
        // 프로젝트 가져오기

        try {

            Path projectRoot = initializerService.createInitializerFiles(request, apis, project.getCommonUri());
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
