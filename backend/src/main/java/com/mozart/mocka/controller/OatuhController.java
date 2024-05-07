package com.mozart.mocka.controller;

import com.mozart.mocka.dto.OauthDto;
import com.mozart.mocka.service.OatuhService;
import com.mozart.mocka.service.RefreshService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OatuhController {
    private final OatuhService oauthService;
    private final RefreshService refreshService;

    @Value("${spring.security.oauth2.client.provider.google.authorization-uri}")
    private String authorization_uri;

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
