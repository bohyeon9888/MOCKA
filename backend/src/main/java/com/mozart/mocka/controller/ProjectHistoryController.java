package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.ProjectAuthRequestDto;
import com.mozart.mocka.service.ProjectHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/history")
public class ProjectHistoryController {

    private final ProjectHistoryService historyService;

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectMembers(@RequestParam("projectId") Long projectId) {
        // auth 는 이후에
        

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/authority")
    public ResponseEntity<?> patchMemberAuthority(@RequestBody ProjectAuthRequestDto authRequestDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean check = historyService.patchProjectMember(
                auth.getName(), authRequestDto.getMemberId(), authRequestDto.getProjectId(), authRequestDto.getProjectRole()
        );

        if (check) return new ResponseEntity<>(HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

}
