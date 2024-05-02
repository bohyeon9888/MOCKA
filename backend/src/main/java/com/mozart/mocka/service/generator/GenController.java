package com.mozart.mocka.service.generator;

import com.mozart.mocka.domain.ApiPath;
import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.repository.ApiPathRepository;
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

    public void createController(
        Path projectRoot, List<ApiProjects> apis, InitializerRequestDto request) throws IOException {
        Path controllerDir = projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace(".", "/") + "/controller");
        Files.createDirectories(controllerDir); // 컨트롤러 디렉토리 생성

        int index = 1;
        for (ApiProjects api : apis) {
            String controllerName = api.getApiUriStr().split("/")[1];
            String className = controllerName + "Controller";
            Path controllerFile = controllerDir.resolve(className + ".java");

            List<String> lines;
            if (Files.exists(controllerFile)) {
                // 기존 컨트롤러 파일 수정
                lines = Files.readAllLines(controllerFile, StandardCharsets.UTF_8);
                int lastIndex = lines.size() - 1; // 마지막 중괄호의 인덱스 찾기
                // 새로운 메소드를 마지막 중괄호 바로 전에 추가
                lines.addAll(lastIndex, generateMethodLines(api, index++));
            } else {
                // 새 컨트롤러 파일 생성
                lines = new ArrayList<>();
                lines.add("package " + request.getSpringPackageName() + ".controller;\n");

                lines.add("import org.springframework.web.bind.annotation.RequestMapping;");
                lines.add("import org.springframework.web.bind.annotation.RestController;");
                lines.add("import org.springframework.http.ResponseEntity;");
                lines.add("import " + request.getSpringPackageName() + ".dto.*;\n");

                lines.add("@RestController");
                lines.add("@RequestMapping(\"/api/" + controllerName + "\")");
                lines.add("public class " + className + " {");
                lines.addAll(generateMethodLines(api, index++));
                lines.add("}");
            }

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
        if (apiPaths.isEmpty()) {
            methodLines.add("    public ResponseEntity<?> autoCreatedApiNo" + index + " () {");
        }
        else {
            methodLines.add("    public ResponseEntity<?> autoCreatedApiNo" + index + " (");
            for (int i=0; i<apiPaths.size(); i++) {
                ApiPath apiPath = apiPaths.get(i);
                if (i == apiPaths.size() -1) {
                    methodLines.add("        @PathVariable(\"" + apiPath.getKey() + "\") " + apiPath.getData() + " " + apiPath.getKey());
                }
                else {
                    methodLines.add("        @PathVariable(\"" + apiPath.getKey() + "\") " + apiPath.getData() + " " + apiPath.getKey() + ",");
                }
            }
            methodLines.add("    ) {");
        }

        methodLines.add("        return ResponseEntity.ok().body(\"This is a response from " + api.getApiMethod().toUpperCase() + " endpoint.\");");
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
}
