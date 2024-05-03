package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InviteRequestDto;
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


    @GetMapping("/test")
    public void testApi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.info("auth name : " + auth.getName());
    }

    @PostMapping
    public ResponseEntity<?> inviteMember(@RequestBody InviteRequestDto inviteRequestDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return null;
    }
}
