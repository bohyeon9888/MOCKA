package com.mozart.mocka.controller;

import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/method")
public class MethodController {

    @PostMapping("{projectId}")
    public ResponseEntity<?> createApi(@PathVariable("projectId") Long projectId, @RequestBody ApiCreateRequestDto requestDto){

        return null;
    }
}
