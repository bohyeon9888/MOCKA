package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.ProjectRequestDto;
import com.mozart.mocka.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequestDto request){
        Long memberId = 1L;
        int editNum = request.getVisibility().charAt(0) - '0';
        if(editNum > 2 || editNum < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        projectService.create(memberId, request.getProjectName(),request.getCommonUri(),request.getVisibility());
        return new ResponseEntity<>(HttpStatus.OK);
    }

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

    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable("projectId") Long projectId){
        Long memberId = 1L;
        Boolean check = projectService.delete(memberId, projectId);

        if(check)
            return new ResponseEntity<>(HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
