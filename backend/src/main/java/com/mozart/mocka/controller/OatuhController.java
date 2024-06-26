package com.mozart.mocka.controller;

import com.mozart.mocka.dto.OauthDto;
import com.mozart.mocka.service.OatuhService;
import com.mozart.mocka.service.RefreshService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OatuhController {
    private final OatuhService oauthService;
    private final RefreshService refreshService;

    @GetMapping("/redirect/{provider}")
    public RedirectView redirectUser(@PathVariable String provider) {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("https://mock-a.com/oauth2/authorization/"+provider);
        return redirectView;
    }

    @GetMapping("/callback/{provider}")
    public ResponseEntity<?> callResp(@RequestParam String code, @PathVariable String provider, HttpServletResponse response) {
        log.info(provider + " " + code);

        OauthDto oauthDto = oauthService.getAccessToken(code, provider);

        response.addCookie(refreshService.createCookie("refreshToken", oauthDto.getRefresh()));
        return ResponseEntity.ok().body(oauthDto.getLoginResponseDto());

    }
}
