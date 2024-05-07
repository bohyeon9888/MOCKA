package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InvitationAnswerRequestDto;
import com.mozart.mocka.dto.request.InviteRequestDto;
import com.mozart.mocka.dto.response.InvitationResponseDto;
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

    @PostMapping
    public ResponseEntity<?> inviteMember(@RequestBody InviteRequestDto inviteRequestDto) throws MessagingException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        inviteService.createInvitation(auth.getName(), inviteRequestDto.getProjectId(), inviteRequestDto.getTeamMember());
        return null;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<InvitationResponseDto> readInvitation(@PathVariable Long projectId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return ResponseEntity.ok(inviteService.checkInvitation(auth.getName(), projectId));
    }

    @PostMapping("/{projectId}")
    public void readInvitation(@PathVariable Long projectId, @RequestBody InvitationAnswerRequestDto answerDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        inviteService.answerInvitation(auth.getName(), projectId, answerDto.getAnswer());
        // 이후 프론트 쪽으로 redirect view
    }
}
