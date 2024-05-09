package com.mozart.mocka.service.generator;

import com.mozart.mocka.domain.ApiPath;
import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.domain.ApiRequest;
import com.mozart.mocka.domain.ApiResponse;
import com.mozart.mocka.domain.Groups;
import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.repository.ApiPathRepository;
import com.mozart.mocka.repository.ApiProjectRepository;
import com.mozart.mocka.repository.ApiRequestRepository;
import com.mozart.mocka.repository.ApiResponseRepository;
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
    private final ApiProjectRepository apiProjectRepository;
    private final GenRequest genRequest;
    private final GenResponse genResponse;
    static final String HASH = "34e1c029fab";
    static final String basePath = "src/main/java/";

    public int createController(
        Path projectRoot, Groups group, InitializerRequestDto request, int index) throws Exception {

        List<ApiProjects> apis = apiProjectRepository.findByGroups_GroupId(group.getGroupId());

        Path controllerDir = projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/") + "/controller");

        String groupUri = group.getGroupUri();
        String parseName = "Root";
        if (!groupUri.isEmpty()) {
            parseName = groupUri.split("/")[1];
        }

        String className = parseName + "Controller";
        Path controllerFile = controllerDir.resolve(className + ".java");

        List<String> lines;
            // 새 컨트롤러 파일 생성
        lines = new ArrayList<>();
        lines.add("package " + request.getSpringPackageName() + ".controller;\n");

        int i = 0;
        for (ApiProjects api: apis) {
            String importLine = generateImport(api, request.getSpringPackageName(), projectRoot, index + (i++));
            if (!importLine.isEmpty())
                lines.add(importLine);
        }

        lines.add("import org.springframework.web.bind.annotation.*;");
        lines.add("import org.springframework.http.ResponseEntity;\n");
        lines.add("@RestController");
        if (!className.equals("RootController")) {
            lines.add("@RequestMapping(\"" + groupUri + "\")");
        }
        lines.add("public class " + className + " {");

        i = 0;
        for (ApiProjects api: apis) {
            lines.addAll(generateMethodLines(api, group.getGroupUri() ,index + (i++)));
        }

        lines.add("}");

        // 파일 쓰기
        Files.write(controllerFile, lines, StandardCharsets.UTF_8);

        return index + apis.size();
    }

    private String generateImport(ApiProjects api, String packageName, Path projectRoot, int index)
        throws Exception {

        Long apiId = api.getApiId();
        List<ApiRequest> apiRequests = apiRequestRepository.findByApiProject_ApiId(apiId);
        List<ApiResponse> apiResponses = apiResponseRepository.findByApiProject_ApiId(apiId);

        if (!apiRequests.isEmpty()) { // req dto 생성
            Path requestDirNo = projectRoot.resolve(
                basePath + packageName.replace(".", "/") + "/dto/request/api" + index);
            Files.createDirectories(requestDirNo);
            genRequest.makeStrObject("RequestDtoNo" + index,
                packageName + ".dto.request.api" + index, api.getApiId(),
                requestDirNo.toString());
        }
        else if (!apiResponses.isEmpty()) { // res dto 생성
            Path responseDirNo = projectRoot.resolve(
                basePath + packageName.replace(".", "/") + "/dto/response/api" + index);
            Files.createDirectories(responseDirNo); // ResponseNo 디렉토리 생성
            genResponse.makeStrObject("ResponseDtoNo" + index,
                packageName + ".dto.response.api" + index, api.getApiId(),
                responseDirNo.toString());
        }

        String result="";
        // req O, res O
        if (!apiRequests.isEmpty() && !apiResponses.isEmpty()) {
            result = "import " + packageName + ".dto.request.api" + index + ".*;\n" +
                "import " + packageName + ".dto.response.api" + index + ".*;";
        }
        // req O, res X
        else if (apiRequests.isEmpty() && !apiResponses.isEmpty())
            result = "import " + packageName + ".dto.request.api" + index + ".*;";
        // req X, res O
        else if (!apiRequests.isEmpty() && apiResponses.isEmpty())
            result = "import " + packageName + ".dto.response.api" + index + ".*;";
        // req X, res X

        return result;
    }

    private List<String> generateMethodLines(ApiProjects api, String groupUri, int index) {
        List<String> methodLines = new ArrayList<>();

        String requestUri = setUri(api.getApiUriStr());
        if (groupUri.isEmpty()) {
            requestUri = api.getApiUriStr().split("\\?")[0];
        }

        methodLines.add("\n    @" + api.getApiMethod() + "Mapping(\"" + requestUri + "\")");

        Long apiId = api.getApiId();
        List<ApiPath> apiPaths = apiPathRepository.findByApiProject_ApiId(apiId);
        List<ApiRequest> apiRequests = apiRequestRepository.findByApiProject_ApiId(apiId);
        List<ApiResponse> apiResponses = apiResponseRepository.findByApiProject_ApiId(apiId);

        String methodName = "autoCreatedApiNo" + index;
        String responseType =
            apiResponses.isEmpty() ? "?" : "ResponseDtoNo" + index; // DTO 클래스 이름 또는 Void
        String requestType = "RequestDtoNo" + index; // DTO 클래스 이름

        boolean firstParam = true;
        String methodSignature = "ResponseEntity<" + responseType + ">";
        if (apiPaths.isEmpty() && apiRequests.isEmpty() && !api.getApiUriStr().contains("?")) {
            methodLines.add("    public " + methodSignature + " " + methodName + "() {");
        }
        else {
            methodLines.add("    public " + methodSignature + " " + methodName + "(");

            String[] uriParts = api.getApiUriStr().split("\\?");
            if (uriParts.length > 1) {
                String queryString = uriParts[1];
                String[] queryParams = queryString.split("&");
                for (String param : queryParams) {
                    String[] keyValue = param.split("=");
                    if (keyValue.length > 1) {
                        String key = keyValue[0];
                        String type = keyValue[1]; // 일반적으로 타입 정보는 URI에서 얻을 수 없으므로 예측하거나 기본 타입을 지정해야 함
                        if (!firstParam) {
                            methodLines.add("        ,@RequestParam(\"" + key + "\") " + type + " " + key);
                        }
                        else {
                            methodLines.add("        @RequestParam(\"" + key + "\") " + type + " " + key);
                            firstParam = false;
                        }

                    }
                }
            }

            for (ApiPath path : apiPaths) {
                if (!firstParam) {
                    methodLines.add("        ,@PathVariable(\"" + path.getKey() + "\") " + path.getData() + " " + path.getKey());
                }
                else {
                    methodLines.add("        @PathVariable(\"" + path.getKey() + "\") " + path.getData() + " " + path.getKey());
                    firstParam = false;
                }

            }

            if (!apiRequests.isEmpty()) {
                if (!firstParam) {
                    methodLines.add("        ,@RequestBody " + requestType + " request");
                }
                else {
                    methodLines.add("        @RequestBody " + requestType + " request");
                }
            }

            methodLines.add("        ) {"); // 메서드 매개변수 닫기
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

        return result.toString().split("\\?")[0];
    }
}
