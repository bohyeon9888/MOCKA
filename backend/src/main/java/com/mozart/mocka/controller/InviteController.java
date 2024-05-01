package com.mozart.mocka.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invite")
public class InviteController {

    @GetMapping
    public void testApi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
    }
}
