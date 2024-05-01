package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.InviteDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invite")
public class InviteController {

    @PostMapping
    public ResponseEntity<?> inviteMember(@RequestBody InviteDto inviteDto) {

        return null;
    }
}
