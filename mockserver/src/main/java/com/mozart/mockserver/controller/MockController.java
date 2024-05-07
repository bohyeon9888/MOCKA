package com.mozart.mockserver.controller;

import com.mozart.mockserver.Service.HashKeyService;
import com.mozart.mockserver.Service.MockService;
import com.mozart.mockserver.Service.ProjectService;
import com.mozart.mockserver.domain.Projects;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Optional;

import static javax.xml.crypto.dsig.Transform.BASE64;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/**")
public class MockController {
    private final MockService mockService;
    private final HashKeyService hashKeyService;
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<?> getController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long projectId = findProjectId(url);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, projectId, url, "Get");
    }

    @GetMapping("/hash/encode/{id}")
    public String encode(@PathVariable("id") Long id) throws Exception {
        return hashKeyService.encryptLong(id);
    }
    @GetMapping("/hash/decode/{id}")
    public Long decode(@PathVariable("id") String id) throws Exception {
        return hashKeyService.decryptLong(id);
    }

    @PostMapping
    public ResponseEntity<?> postController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long projectId = findProjectId(url);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, projectId, url, "Post");
    }

    @PutMapping
    public ResponseEntity<?> putController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long projectId = findProjectId(url);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, projectId, url, "Put");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long projectId = findProjectId(url);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, projectId, url, "Delete");
    }

    @PatchMapping
    public ResponseEntity<?> patchController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long projectId = findProjectId(url);
        if(projectId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, projectId, url, "Patch");
    }

    /*
     *  400 BAD_REQUEST : url 의 path variable type이 맞지 않은 경우
     *  404 NOT_FOUND   : 없는 url의 요청
     * */
    private ResponseEntity<?> mockServe(HttpServletRequest request, Long projectId, URL url, String method) {
        // 요청된 URL 검증
        Long apiId = mockService.findApi(projectId, url, method);
        if(apiId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(apiId == 0L)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // request body 검증
        try {
            if(!mockService.requestCheck(projectId, apiId, request))
                return new ResponseEntity<>("request body 의 값이 잘못되었습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // response faker.js 반환
        return new ResponseEntity<>(mockService.createMock(apiId), HttpStatus.OK);

    }
    /*
    * hash value decode
    * */
    private Long findProjectId(URL url){
        Optional<Projects> project = projectService.getProject(mockService.getHostName(url));
        if (project.isPresent())
            return project.get().getProjectId();
        else
            return -1L;
    }
}
