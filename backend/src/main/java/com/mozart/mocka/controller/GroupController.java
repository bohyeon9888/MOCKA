package com.mozart.mocka.controller;

import com.mozart.mocka.domain.CustomUserDetails;
import com.mozart.mocka.domain.Groups;
import com.mozart.mocka.dto.request.CreateGroupRequestDto;
import com.mozart.mocka.dto.response.GroupResponseDto;
import com.mozart.mocka.repository.GroupRepository;
import com.mozart.mocka.service.*;
import com.mozart.mocka.util.LogExecutionTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/group")
public class GroupController {
    private final GroupService groupService;
    private final AuthService authService;
    private final ApiService apiService;

    @LogExecutionTime
    @GetMapping("{projectId}")
    public ResponseEntity<?> getGroupList(
            @PathVariable("projectId") Long projectId,
            @AuthenticationPrincipal CustomUserDetails user
    ){
        System.out.println("GetGroupList");
        //사용자 프로젝트 조회 권한 check
        authService.groupListReadCheck(user.getProviderId(),projectId);

        return new ResponseEntity<>(groupService.getGroupList(projectId), HttpStatus.OK);
    }

    @PostMapping("{projectId}")
    public ResponseEntity<?> createGroup(
            @PathVariable("projectId") Long projectId,
            @RequestBody CreateGroupRequestDto request,
            @AuthenticationPrincipal CustomUserDetails user
    ){
        authService.groupCreateCheck(projectId, user.getProviderId());
        boolean isCreate = groupService.create(projectId,request.getGroupName(),request.getGroupUri());
        if(!isCreate)
            return new ResponseEntity<>("You can't create Group",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Create Success",HttpStatus.OK);
    }

    //그룹 이름만 변경
    @PutMapping("{projectId}/{groupId}")
    public ResponseEntity<?> updateGroup(
            @RequestBody CreateGroupRequestDto request,
            @PathVariable("projectId") Long projectId,
            @PathVariable("groupId")Long groupId,
            @AuthenticationPrincipal CustomUserDetails user
    ){
        //사용자 프로젝트 편집 권한 check
        authService.groupUpdateCheck(user.getProviderId(),projectId,groupId);
        if(groupService.update(projectId,groupId,request.getGroupName(),request.getGroupUri()))
            return new ResponseEntity<>("Update Success",HttpStatus.OK);

        return new ResponseEntity<>("You can't update Group",HttpStatus.OK);
    }

    @LogExecutionTime
    @DeleteMapping("{projectId}/{groupId}")
    public ResponseEntity<?> deleteGroup(
            @PathVariable("projectId") Long projectId,
            @PathVariable("groupId")Long groupId,
            @AuthenticationPrincipal CustomUserDetails user
    ){
        //사용자 프로젝트 편집 권한 check
        authService.groupDeleteCheck(user.getProviderId(),projectId,groupId);
        apiService.deleteGroup(projectId,groupId);
        return new ResponseEntity<>("delete success",HttpStatus.OK);
    }

    @LogExecutionTime
    @GetMapping("{projectId}/{groupId}")
    public ResponseEntity<?> receiveGroupDetail(
            @PathVariable("projectId") Long projectId,
            @PathVariable("groupId") Long groupId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        authService.groupReadCheck(projectId,user.getProviderId(),groupId);

        Groups group=groupService.getGroup(groupId);
        return new ResponseEntity<>(GroupResponseDto.groupResponseDto_from_domain(group), HttpStatus.OK);
    }
}
