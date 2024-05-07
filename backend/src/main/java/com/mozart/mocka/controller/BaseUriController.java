package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.BaseUriRequestDto;
import com.mozart.mocka.service.AuthService;
import com.mozart.mocka.service.BaseUrlService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/base-url")
public class BaseUriController {
    private final BaseUrlService baseUrlService;
    private final AuthService authService;

    @PostMapping("{projectId}")
    public ResponseEntity<?> createBaseUri(@PathVariable("projectId") Long projectId,@RequestBody BaseUriRequestDto request){
        authService.baseUriCreateCheck(projectId,request);
        baseUrlService.createBaseUri(projectId,request.getBaseUri());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("{projectId}/{baseUriId}")
    public ResponseEntity<?> updateBaseUri(@PathVariable("projectId") Long projectId, @PathVariable("baseUriId") Long baseUriId, @RequestBody BaseUriRequestDto request){
        authService.baseUriUpdateCheck(projectId,baseUriId,request);

        baseUrlService.updateBaseUri(baseUriId,request.getBaseUri());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{projectId}/{baseUriId}")
    public ResponseEntity<?> deleteBaseUri(@PathVariable("projectId") Long projectId,@PathVariable("baseUriId") Long baseUriId){
        authService.baseUriDeleteCheck(projectId,baseUriId);

        baseUrlService.deleteBaseUri(baseUriId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
