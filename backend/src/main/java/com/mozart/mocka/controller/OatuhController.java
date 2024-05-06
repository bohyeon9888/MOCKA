package com.mozart.mocka.controller;

import com.mozart.mocka.service.OatuhService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping("/redirect/{provider}")
    public RedirectView redirectUser(@PathVariable String provider) {
//        System.out.println(provider);
//        System.out.println("code " + code);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("https://codakcodak.store/oauth2/authorization/" + provider);

        return redirectView;
    }

    @GetMapping("/callback/{provider}")
    public ResponseEntity<?> callResp(@RequestParam String code, @PathVariable String provider) {
        log.info(provider + " " + code);

        return ResponseEntity.ok().body(oauthService.getAccessToken(code, provider));

    }
}
