package com.mozart.mocka.service.generator;

import com.mozart.mocka.domain.ApiPath;
import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.domain.ApiRequest;
import com.mozart.mocka.domain.ApiResponse;
import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.repository.ApiPathRepository;
import com.mozart.mocka.repository.ApiRequestRepository;
import com.mozart.mocka.repository.ApiResponseRepository;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class GenController {

    private final ApiPathRepository apiPathRepository;
    private final ApiRequestRepository apiRequestRepository;
    private final ApiResponseRepository apiResponseRepository;
    private final GenRequest genRequest;
    private final GenResponse genResponse;

    public void createController(

        Path projectRoot, List<ApiProjects> apis, InitializerRequestDto request) throws Exception {
        String basePath = "src/main/java/";
        Path controllerDir = projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/") + "/controller");
        Files.createDirectories(controllerDir); // 컨트롤러 디렉토리 생성

        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/") + "/dto")); // DTO 디렉토리 생성
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/")
                + "/dto/response")); // Response 디렉토리 생성
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/")
                + "/dto/request")); // Request 디렉토리 생성

        for (int i = 0; i < apis.size(); i++) {
            ApiProjects api = apis.get(i); // 현재 API 프로젝트를 가져옴

            log.info("create dto");

            Path requestDirNo = projectRoot.resolve(
                basePath + request.getSpringPackageName().replace(".", "/") + "/dto/request/api" + (
                    i + 1));
            Files.createDirectories(requestDirNo); // Request 디렉토리 생성
            genRequest.makeStrObject("RequestDtoNo" + (i + 1),
                request.getSpringPackageName() + ".dto.request.api" + (i + 1), api.getApiId(),
                requestDirNo.toString());

            Path responseDirNo = projectRoot.resolve(
                basePath + request.getSpringPackageName().replace(".", "/") + "/dto/response/api"
                    + (i + 1));
            Files.createDirectories(responseDirNo); // Response 디렉토리 생성
            genResponse.makeStrObject("ResponseDtoNo" + (i + 1),
                request.getSpringPackageName() + ".dto.response.api" + (i + 1), api.getApiId(),
                responseDirNo.toString());

            log.info("create dto success");
            log.info("create controller");

            String controllerName = api.getApiUriStr().split("/")[1];
            controllerName =
                controllerName.substring(0, 1).toUpperCase() + controllerName.substring(1);
            String className = controllerName + "Controller";
            Path controllerFile = controllerDir.resolve(className + ".java");

            log.info("create controller success");
            log.info("update controller");

            List<String> lines;
            if (Files.exists(controllerFile)) {
                lines = Files.readAllLines(controllerFile, StandardCharsets.UTF_8);

                int importIndex = findLastImportIndex(lines); // 마지막 import 문의 인덱스 찾기

                // 새로운 import 문 추가 (기존 import가 없을 경우, 패키지 선언 바로 다음에 추가)
                if (importIndex != -1) {
                    lines.add(importIndex + 1, "import " + request.getSpringPackageName() + ".dto.request.api" + (i + 1) + ".*;");
                    lines.add(importIndex + 2, "import " + request.getSpringPackageName() + ".dto.response.api" + (i + 1) + ".*;");
                } else {
                    int packageIndex = findPackageIndex(lines); // 패키지 선언의 인덱스 찾기
                    if (packageIndex != -1) {
                        lines.add(packageIndex + 1, "import " + request.getSpringPackageName() + ".dto.request.api" + (i + 1) + ".*;");
                        lines.add(packageIndex + 2, "import " + request.getSpringPackageName() + ".dto.response.api" + (i + 1) + ".*;");
                    }
                }

                int lastIndex = findLastIndex(lines);
                // 새로운 메소드를 마지막 중괄호 바로 전에 추가
                lines.addAll(lastIndex, generateMethodLines(api, i + 1));
            } else {
                // 새 컨트롤러 파일 생성
                lines = new ArrayList<>();
                lines.add("package " + request.getSpringPackageName() + ".controller;\n");

                lines.add("import org.springframework.web.bind.annotation.*;");
                lines.add("import org.springframework.http.ResponseEntity;");
                lines.add("import " + request.getSpringPackageName() + ".dto.request.api" + (i+1) + ".*;");
                lines.add("import " + request.getSpringPackageName() + ".dto.response.api" + (i+1) + ".*;");

                lines.add("\n@RestController");
                lines.add("@RequestMapping(\"/api/" + controllerName + "\")");
                lines.add("public class " + className + " {");
                lines.addAll(generateMethodLines(api, i + 1));
                lines.add("}");
            }

            log.info("update controller success");

            // 파일 쓰기
            Files.write(controllerFile, lines, StandardCharsets.UTF_8);
            log.info("Updated or created controller: " + controllerFile);
        }
    }

    private List<String> generateMethodLines(ApiProjects api, int index) {
        List<String> methodLines = new ArrayList<>();
        String requestUri = setUri(api.getApiUriStr());
        methodLines.add("\n    @" + api.getApiMethod() + "Mapping(\"" + requestUri + "\")");

        Long apiId = api.getApiId();
        List<ApiPath> apiPaths = apiPathRepository.findByApiProject_ApiId(apiId);
        List<ApiRequest> apiRequests = apiRequestRepository.findByApiProject_ApiId(apiId);
        List<ApiResponse> apiResponses = apiResponseRepository.findByApiProject_ApiId(apiId);

        String methodName = "autoCreatedApiNo" + index;
        String responseType =
            apiResponses.isEmpty() ? "?" : "ResponseDtoNo" + index; // DTO 클래스 이름 또는 Void
        String requestType = "RequestDtoNo" + index; // DTO 클래스 이름

        String methodSignature = "ResponseEntity<" + responseType + ">";
        if (apiPaths.isEmpty() && apiRequests.isEmpty()) {
            methodLines.add("    public " + methodSignature + " " + methodName + "() {");
        } else {
            methodLines.add("    public " + methodSignature + " " + methodName + "(");

            apiPaths.forEach(path -> {
                methodLines.add(
                    "        @PathVariable(\"" + path.getKey() + "\") " + path.getData() + " "
                        + path.getKey() + ",");
            });

            if (!apiRequests.isEmpty()) {
                methodLines.add("        @RequestBody " + requestType + " request) {");
            } else {
                methodLines.remove(methodLines.size() - 1); // 마지막 콤마 제거
                methodLines.add(
                    methodLines.remove(methodLines.size() - 1) + "\n        ) {"); // 메서드 매개변수 닫기
            }
        }

        if (responseType.equals("?")) {
            methodLines.add("        return ResponseEntity.ok().build();");
        } else {
            methodLines.add("        " + responseType + " response = new " + responseType + "();");
            methodLines.add("        return ResponseEntity.ok().body(response);");
        }

        methodLines.add("    }");
        return methodLines;
    }

    public String setUri(String uri) {
        if (uri == null || uri.isEmpty()) {
            return uri;
        }

        String[] segments = uri.split("/");
        StringBuilder result = new StringBuilder();
        for (int i = 2; i < segments.length; i++) {
            result.append("/").append(segments[i]);
        }

        return result.toString();
    }

    private int findLastImportIndex(List<String> lines) {
        int lastIndex = -1;
        for (int j = 0; j < lines.size(); j++) {
            if (lines.get(j).startsWith("import ")) {
                lastIndex = j;
            }
        }
        return lastIndex;
    }

    private int findPackageIndex(List<String> lines) {
        for (int j = 0; j < lines.size(); j++) {
            if (lines.get(j).startsWith("package ")) {
                return j;
            }
        }
        return -1;
    }

    private int findLastIndex(List<String> lines) {
        log.info("lines : " + lines.size());
        for (int j = lines.size() - 1; j >= 0; j--) {
            if (lines.get(j).trim().equals("}")) {
                log.info("lastidx : " + j);
                return j;
            }
        }
        return -1;
    }
}
