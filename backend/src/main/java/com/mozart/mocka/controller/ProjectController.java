package com.mozart.mocka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mocka.dto.request.ProjectRequestDto;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import com.mozart.mocka.service.ProjectService;
import com.mozart.mocka.util.LogExecutionTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;
    private final ObjectMapper objectMapper;
    @LogExecutionTime
    @GetMapping
    public ResponseEntity<List<ProjectsListResponseDto>> getProjectList(){
        Long memberId = 1L;
        return new ResponseEntity<>(projectService.getProjectList(memberId),HttpStatus.OK);
    }

    @LogExecutionTime
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequestDto request){
        Long memberId = 1L;
        int editNum = request.getVisibility().charAt(0) - '0';
        if(editNum > 2 || editNum < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        projectService.create(memberId, request.getProjectName(),request.getCommonUri(),request.getVisibility());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @CacheEvict(value = "api-project", key = "#projectId")
    @PutMapping("{projectId}")
    public ResponseEntity<?> updateProject(@RequestBody ProjectRequestDto request, @PathVariable("projectId") Long projectId){
        Long memberId = 1L;
        int editNum = request.getVisibility().charAt(0) - '0';
        if(editNum > 2 || editNum < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        boolean check = projectService.update(projectId,memberId, request.getProjectName(),request.getCommonUri(),request.getVisibility());
        if(check)
            return new ResponseEntity<>(HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @LogExecutionTime
    @CacheEvict(value = "api-project", key = "#projectId")
    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable("projectId") Long projectId){
        Long memberId = 1L;
        Boolean check = projectService.delete(memberId, projectId);

        if(check)
            return new ResponseEntity<>(HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @LogExecutionTime
    @Cacheable(value = "api-project", key = "#projectId")
    @GetMapping("{projectId}")
    public ResponseEntity<?> receiveProjectDetail(@PathVariable("projectId") Long projectId) throws JsonProcessingException {
        Long memberId = 1L;
       int authority = projectService.checkAuthority(projectId,memberId);
       if(authority > 1)
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
       long startTime = System.currentTimeMillis();
       JsonNode jsonNode = objectMapper.valueToTree(projectService.getProjectAPIList(projectId));
       long endTime = System.currentTimeMillis();
       long executionTime = endTime - startTime;
       log.info(executionTime + "ms");

       return new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }
}
