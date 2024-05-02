package com.mozart.mockserver.controller;

import com.mozart.mockserver.Service.MockService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/**")
public class MockController {
    private final MockService mockService;

    @GetMapping
    public ResponseEntity<?> getController(HttpServletRequest request) throws MalformedURLException, IOException {
        URL url = new URL(request.getRequestURL().toString());
        String hashValue = mockService.getHostName(url);

        //해시값 검증
        Long projectId = mockService.getProjectId(hashValue);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        /*
        *
        *  400 BAD_REQUEST : url 의 path variable type이 맞지 않은 경우
        *  404 NOT_FOUND   : 없는 url의 요청
        *
        * */
        // 요청된 URL 검증
        Long apiId = mockService.findApi(projectId, url, "Get");
        System.out.println("---------------------------------");
        System.out.println(apiId);
        if(apiId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(apiId == 0L)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // request body 검증
        if(!mockService.requestCheck(projectId, apiId, request))
            return new ResponseEntity<>("request body 의 값이 잘못되었습니다.",HttpStatus.INTERNAL_SERVER_ERROR);

        // response faker.js 반환
        return new ResponseEntity<>(mockService.createMock(apiId), HttpStatus.OK);
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
