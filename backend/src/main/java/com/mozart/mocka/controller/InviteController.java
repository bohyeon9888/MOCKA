package com.mozart.mocka.controller;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.dto.request.InvitationAnswerRequestDto;
import com.mozart.mocka.dto.request.InviteRequestDto;
import com.mozart.mocka.dto.response.InvitationResponseDto;
import com.mozart.mocka.repository.MembersRepository;
import com.mozart.mocka.service.InviteService;
import jakarta.mail.MessagingException;
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
@RequestMapping("/api/invite")
public class InviteController {

    private final InviteService inviteService;
    private final MembersRepository membersRepository;

    @GetMapping("/test")
    public String test() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("사용자 이름 : " + auth.getName());
        Members mem = membersRepository.findByMemberProviderId(auth.getName());

        if (mem == null) {
            return "해당하는 멤버가 없습니다.";
        }

        return mem.getMemberNickname();
    }

    @PostMapping
    public ResponseEntity<?> inviteMember(@RequestBody InviteRequestDto inviteRequestDto) throws MessagingException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (!inviteService.createInvitation(auth.getName(), inviteRequestDto.getProjectId(), inviteRequestDto.getTeamMember())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<InvitationResponseDto> readInvitation(@PathVariable Long projectId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        InvitationResponseDto data = inviteService.checkInvitation(auth.getName(), projectId);
        if (data == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(inviteService.checkInvitation(auth.getName(), projectId));
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<?> answerInvitation(@PathVariable Long projectId, @RequestBody InvitationAnswerRequestDto answerDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!inviteService.answerInvitation(auth.getName(), projectId, answerDto.getAnswer())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
