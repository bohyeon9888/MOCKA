package com.mozart.mockserver.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MockController {

    @GetMapping
    public ResponseEntity<?> getController(){
        return null;
    }

    @PostMapping
    public ResponseEntity<?> postController(){
        return null;
    }

    @PutMapping
    public ResponseEntity<?> putController(){
        return null;
    }

    @DeleteMapping
    public ResponseEntity<?> deleteController(){
        return null;
    }

    @PatchMapping
    public ResponseEntity<?> patchController(){
        return null;
    }
}
