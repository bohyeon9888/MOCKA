package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InviteRequestDto;
import com.mozart.mocka.service.InviteService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invite")
public class InviteController {

    private final InviteService inviteService;

    @GetMapping("/test")
    public void testApi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.info("auth name : " + auth.getName());
    }

    @PostMapping
    public ResponseEntity<?> inviteMember(@RequestBody InviteRequestDto inviteRequestDto) throws MessagingException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        inviteService.createInvitation(auth.getName(), inviteRequestDto.getProjectId(), inviteRequestDto.getTeamMember());
        return null;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> readInvitation(@PathVariable int projectId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return null;
    }
}
