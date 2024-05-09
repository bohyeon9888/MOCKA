package com.mozart.mocka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mocka.domain.Members;
import com.mozart.mocka.dto.request.ProjectRequestDto;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import com.mozart.mocka.repository.MembersRepository;
import com.mozart.mocka.service.ProjectService;
import com.mozart.mocka.util.LogExecutionTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;
    private final ObjectMapper objectMapper;
    private final MembersRepository membersRepository;

    @LogExecutionTime
    @GetMapping
    public ResponseEntity<List<ProjectsListResponseDto>> getProjectList(){
//        Long memberId = 1L;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Members member = membersRepository.findByMemberProviderId(auth.getName());

        return new ResponseEntity<>(projectService.getProjectList(member.getMemberId()),HttpStatus.OK);
    }

    @LogExecutionTime
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequestDto request){
//        Long memberId = 1L;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Members member = membersRepository.findByMemberProviderId(auth.getName());

        int editNum = request.getVisibility().charAt(0) - '0';
        if(editNum > 2 || editNum < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        projectService.create(member.getMemberId(), request.getProjectName(),request.getCommonUri(),request.getVisibility());
        return new ResponseEntity<>(HttpStatus.OK);
    }
//    @CacheEvict(value = "api-project", key = "#projectId")
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
//    @CacheEvict(value = "api-project", key = "#projectId")
    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable("projectId") Long projectId){
        Long memberId = 1L;
        Boolean check = projectService.delete(memberId, projectId);

        if(check)
            return new ResponseEntity<>(HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @LogExecutionTime
//    @Cacheable(value = "api-project", key = "#projectId")
    @GetMapping("{projectId}")
    public ResponseEntity<?> receiveProjectDetail(@PathVariable("projectId") Long projectId) throws JsonProcessingException {
        Long memberId = 1L;
       int authority = projectService.checkAuthority(projectId,memberId);
       System.out.println("authority " + authority);
       if(authority > 2)
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
       JsonNode jsonNode = objectMapper.valueToTree(projectService.getProjectAPIList(projectId, memberId));

       return new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentProject() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Members member = membersRepository.findByMemberProviderId(auth.getName());

        if (member == null) {
            log.debug("일치하는 멤버가 없습니다.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<ProjectsListResponseDto> data = projectService.getRecentList(member.getMemberId());
        if (data.isEmpty()) {
            log.debug("데이터가 없습니다.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ResponseEntity.ok(data);
    }
}
