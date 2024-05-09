package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.CreateGroupRequestDto;
import com.mozart.mocka.service.GroupService;
import com.mozart.mocka.service.ProjectService;
import com.mozart.mocka.util.LogExecutionTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/group")
public class GroupController {
    private final ProjectService projectService;
    private final GroupService groupService;

    @LogExecutionTime
    @GetMapping("{projectId}")
    public ResponseEntity<?> getGroupList(@PathVariable("projectId") Long projectId){
        Long memberId = 1L;
        return new ResponseEntity<>(groupService.getGroupList(projectId), HttpStatus.OK);
    }

    @PostMapping("{projectId}")
    public ResponseEntity<?> createGroup(@PathVariable("projectId") Long projectId,@RequestBody CreateGroupRequestDto request){
        Long memberId = 1L;
        groupService.create(projectId,request.getGroupName(),request.getGroupUri());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("{projectId}/{groupId}")
    public ResponseEntity<?> updateGroup(@RequestBody CreateGroupRequestDto request, @PathVariable("projectId") Long projectId,@PathVariable("groupId")Long groupId){
        Long memberId = 1L;

        groupService.update(projectId,groupId,request.getGroupName(),request.getGroupUri());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @LogExecutionTime
    @DeleteMapping("{projectId}/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable("projectId") Long projectId,@PathVariable("groupId")Long groupId){
        Long memberId = 1L;
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @LogExecutionTime
    @GetMapping("{groupId}")
    public ResponseEntity<?> receiveGroupDetail(@PathVariable("groupId") Long groupId) {
        Long memberId = 1L;
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
