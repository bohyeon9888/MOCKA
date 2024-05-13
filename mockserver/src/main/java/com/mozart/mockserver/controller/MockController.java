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
            return new ResponseEntity<>("잘못된 URL입니다.", HttpStatus.NOT_FOUND);
        }
        Projects project = findProjectId(url);
        if(project == null)
            return new ResponseEntity<>("해당하는 API가 존재하지 않습니다.",HttpStatus.NOT_FOUND);
        return mockServe(request, project, url, "Get");
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
        Projects project = findProjectId(url);
        if(project == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, project, url, "Post");
    }

    @PutMapping
    public ResponseEntity<?> putController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Projects project = findProjectId(url);
        if(project == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, project, url, "Put");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Projects project = findProjectId(url);
        if(project == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, project, url, "Delete");
    }

    @PatchMapping
    public ResponseEntity<?> patchController(HttpServletRequest request){
        URL url = null;
        try {
            url = new URL(request.getRequestURL().toString());
        } catch (MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Projects project = findProjectId(url);
        if(project == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return mockServe(request, project, url, "Patch");
    }

    /*
     *  400 BAD_REQUEST : url 의 path variable type이 맞지 않은 경우
     *  404 NOT_FOUND   : 없는 url의 요청
     * */
    private ResponseEntity<?> mockServe(HttpServletRequest request, Projects project, URL url, String method) {

        // 요청된 URL 검증
        Long apiId = mockService.findApi(project, url, method);
        log.info("1 / " + apiId);
        if(apiId < 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(apiId == 0L)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        log.info("2");
        // request body 검증
        try {
            if(!mockService.requestCheck(project.getProjectId(), apiId, request))
                return new ResponseEntity<>("request body 의 값이 잘못되었습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            log.info("4");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        log.info("5");
        // response faker.js 반환
        return new ResponseEntity<>(mockService.createMock(apiId), HttpStatus.OK);

    }
    /*
    * hash value decode
    * */
    private Projects findProjectId(URL url){
        Optional<Projects> project = projectService.getProject(mockService.getHostName(url));
        if (project.isPresent())
            return project.get();
        else
            return null;
    }
}
