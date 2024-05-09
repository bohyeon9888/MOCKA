package com.mozart.mocka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.service.ApiService;
import com.mozart.mocka.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/method")
public class MethodController {
   private final ApiService apiService;
   private final AuthService authService;
//    @Cacheable(value = "api-project", key = "#projectId")
    @PostMapping("{projectId}/{groupId}")
    public ResponseEntity<?> createApi(@PathVariable("projectId") Long projectId,
                                       @PathVariable("groupId") Long groupId,
                                       @RequestBody ApiCreateRequestDto requestDto) throws JsonProcessingException {
        //edit 인증 체크

        //method 중복 체크
        authService.methodCreateCheck(projectId,requestDto);

        apiService.createApi(projectId, groupId, requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @Cacheable(value = "api-project", key = "#projectId")
    @DeleteMapping("{projectId}/{apiId}")
    public ResponseEntity<?> deleteApi(@PathVariable("projectId") Long projectId, @PathVariable("apiId") Long apiId){
        //delete 삭제 인증 체크
        authService.methodDeleteCheck(projectId,apiId);

        apiService.deleteApi(projectId, apiId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("{projectId}/{groupId}/{apiId}")
    public ResponseEntity<?> updateApi(@PathVariable("projectId") Long projectId,
                                       @PathVariable("groupId") Long groupId,
                                       @PathVariable("apiId")Long apiId, @RequestBody ApiCreateRequestDto requestDto) throws JsonProcessingException {
        //edit 인증 체크

        //method 중복 체크
        authService.methodUpdateCheck(projectId,apiId,requestDto);
        apiService.deleteApi(projectId,apiId);
        apiService.createApi(projectId, groupId, requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
