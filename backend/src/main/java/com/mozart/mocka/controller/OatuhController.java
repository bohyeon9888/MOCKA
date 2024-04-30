package com.mozart.mocka.controller;

import com.mozart.mocka.service.OatuhService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OatuhController {
    private final OatuhService oauthService;

    @GetMapping("/callback/{provider}")
    public ResponseEntity<Map<String, Object>> callResp(@RequestParam String code, @PathVariable String provider) {
        log.info(provider + " " + code);

        Map<String, Object> resp = oauthService.getAccessToken(code, provider);
//        System.out.println(resp);
        return ResponseEntity.ok().body(resp);

    }
}
