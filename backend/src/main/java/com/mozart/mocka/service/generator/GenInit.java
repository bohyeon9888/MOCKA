package com.mozart.mocka.service.generator;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.util.DependencyManager;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GenInit {

    private final DependencyManager dependencyManager;
    public void createDirectories(Path projectRoot, InitializerRequestDto request)
        throws IOException {
        String basePath = "src/main/java/";
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/main/resources"));
        Files.createDirectories(projectRoot.resolve(
            "src/test/java/" + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/test/resources"));
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/")
                + "/controller")); // 컨트롤러 디렉토리 생성
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/") + "/dto")); // DTO 디렉토리 생성
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/")
                + "/dto/response")); // Response 디렉토리 생성
        Files.createDirectories(projectRoot.resolve(
            basePath + request.getSpringPackageName().replace(".", "/")
                + "/dto/request")); // Request 디렉토리 생성
    }

    public void createApplicationProperties(Path projectRoot, String uri) throws IOException {
        Path propertiesPath = projectRoot.resolve("src/main/resources/application.properties");
        try (BufferedWriter writer = Files.newBufferedWriter(propertiesPath, StandardCharsets.UTF_8)) {
            String commonUri = "server.servlet.context-path=" + uri;
            writer.write(commonUri);
        }
    }


    public void createApplicationClass(Path projectRoot, InitializerRequestDto request)
        throws IOException {
        Path mainClassPath = projectRoot.resolve(
            "src/main/java/" + request.getSpringPackageName().replace('.', '/')
                + "/Application.java");
        try (BufferedWriter writer = Files.newBufferedWriter(mainClassPath)) {
            writer.write(generateMainClassContent(request));
        }
    }

    private String generateMainClassContent(InitializerRequestDto request) {
        return "package " + request.getSpringPackageName() + ";\n\n" +
            "import org.springframework.boot.SpringApplication;\n" +
            "import org.springframework.boot.autoconfigure.SpringBootApplication;\n\n" +
            "@SpringBootApplication\n" +
            "public class Application {\n\n" +
            "    public static void main(String[] args) {\n" +
            "        SpringApplication.run(Application.class, args);\n" +
            "    }\n" +
            "}\n";
    }

    public void createPomFile(Path projectRoot, InitializerRequestDto request) throws IOException {
        Path pomPath = projectRoot.resolve("pom.xml");
        try (BufferedWriter writer = Files.newBufferedWriter(pomPath)) {
            writer.write(generatePomContent(request));
        }
    }

    private String generatePomContent(InitializerRequestDto request) {
        StringBuilder sb = new StringBuilder();
        sb.append("<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n")
            .append("         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n")
            .append("         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n")
            .append("    <modelVersion>4.0.0</modelVersion>\n")
            .append("    <groupId>").append(request.getSpringGroupId()).append("</groupId>\n")
            .append("    <artifactId>").append(request.getSpringArtifactId()).append("</artifactId>\n")
            .append("    <version>0.0.1-SNAPSHOT</version>\n")
            .append("    <name>").append(request.getSpringName()).append("</name>\n")
            .append("    <description>").append(request.getSpringDescription()).append("</description>\n")
            .append("    <parent>\n")
            .append("        <groupId>org.springframework.boot</groupId>\n")
            .append("        <artifactId>spring-boot-starter-parent</artifactId>\n")
            .append("        <version>").append(request.getSpringPlatformVersion()).append("</version>\n")
            .append("        <relativePath/> <!-- lookup parent from repository -->\n")
            .append("    </parent>\n")
            .append("    <dependencyManagement>\n")
            .append("        <dependencies>\n")
            .append("            <dependency>\n")
            .append("                <groupId>org.springframework.boot</groupId>\n")
            .append("                <artifactId>spring-boot-dependencies</artifactId>\n")
            .append("                <version>")
            .append(request.getSpringPlatformVersion())
            .append("                </version>\n")
            .append("                <type>pom</type>\n")
            .append("                <scope>import</scope>\n")
            .append("            </dependency>\n")
            .append("        </dependencies>\n")
            .append("    </dependencyManagement>\n\n")
            .append("    <dependencies>\n")
            .append("        <dependency>\n")
            .append("            <groupId>org.springframework.boot</groupId>\n")
            .append("            <artifactId>spring-boot-starter-web</artifactId>\n")
            .append("        </dependency>\n")
            .append("        <dependency>\n")
            .append("            <groupId>org.springframework.boot</groupId>\n")
            .append("            <artifactId>spring-boot-starter-test</artifactId>\n")
            .append("            <scope>test</scope>\n")
            .append("        </dependency>\n")
            .append("        <dependency>\n")
            .append("            <groupId>org.projectlombok</groupId>\n")
            .append("            <artifactId>lombok</artifactId>\n")
            .append("            <optional>true</optional>\n")
            .append("        </dependency>\n");

        // 추가 의존성이 필요하다면 여기에 추가
        for (String dependencyId : request.getSpringDependencyId()) {
            String dependency = dependencyManager.getPomDependency(request.getSpringPlatformVersion(), dependencyId);
            if (dependency != null) {
                sb.append(dependency).append("\n");
            }
        }

        sb.append("    </dependencies>\n")
            .append("    <properties>\n")
            .append("        <java.version>").append(request.getSpringJvmVersion()).append("</java.version>\n")
            .append("    </properties>\n")
            .append("</project>");

        return sb.toString();
    }


    public void createGradleBuildFile(Path projectRoot, InitializerRequestDto request)
        throws IOException {
        Path buildFilePath = projectRoot.resolve("build.gradle");
        try (BufferedWriter writer = Files.newBufferedWriter(buildFilePath)) {
            writer.write(generateGradleBuildContent(request));
        }
    }

    private String generateGradleBuildContent(InitializerRequestDto request) {
        StringBuilder sb = new StringBuilder();
        sb.append("plugins {\n")
            .append("    id 'org.springframework.boot' version '").append(request.getSpringPlatformVersion()).append("'\n")
            .append("    id 'io.spring.dependency-management' version '1.0.11.RELEASE'\n")
            .append("    id 'java'\n")
            .append("}\n\n")
            .append("group = '").append(request.getSpringGroupId()).append("'\n")
            .append("version = '0.0.1-SNAPSHOT'\n\n")
            .append("java {")
            .append("    sourceCompatibility = '").append(request.getSpringJvmVersion()).append("'\n\n")
            .append("}\n\n")
            .append("configurations {\n")
            .append("    compileOnly {\n")
            .append("        extendsFrom annotationProcessor\n")
            .append("    }\n")
            .append("}\n\n")
            .append("repositories {\n")
            .append("    mavenCentral()\n")
            .append("}\n\n")
            .append("dependencyManagement {\n")
            .append("    imports {\n")
            .append("        mavenBom 'org.springframework.boot:spring-boot-dependencies:")
            .append(request.getSpringPlatformVersion())
            .append("'\n")
            .append("    }\n")
            .append("}\n\n")
            .append("dependencies {\n")
            .append("    implementation 'org.springframework.boot:spring-boot-starter-web'\n")
            .append("    testImplementation 'org.springframework.boot:spring-boot-starter-test'\n")
            .append("    compileOnly 'org.projectlombok:lombok'\n")
            .append("    annotationProcessor 'org.projectlombok:lombok'\n");
        // 추가 의존성이 필요하다면 여기에 추가
        for (String dependencyId : request.getSpringDependencyId()) {
            String dependency = dependencyManager.getGradleDependency(request.getSpringPlatformVersion(), dependencyId);
            if (dependency != null) {
                sb.append(dependency).append("\n");
            }
        }

        sb.append("}\n\n")
            .append("tasks.named('test') {\n")
            .append("    useJUnitPlatform()\n")
            .append("}");

        return sb.toString();
    }


    public void createMavenSettings(Path projectRoot, InitializerRequestDto request)
        throws IOException {
//        Path sourceDirectory = Paths.get(
//            "src/main/java/com/mozart/mocka/templates/maven" + request.getSpringPlatformVersion());
        // 로컬 환경
        Path sourceDirectory = Paths.get(
            "templates/maven" + request.getSpringPlatformVersion());

        // 파일 목록: 이곳에 필요한 파일 이름을 추가합니다.
        String[] requiredFiles = {
            "mvnw",
            "mvnw.cmd",
            ".mvn/wrapper/maven-wrapper.jar",
            ".mvn/wrapper/maven-wrapper.properties",
            "HELP.md",
            ".gitignore"
        };

        // 각 파일을 복사
        for (String fileName : requiredFiles) {
            Path sourceFile = sourceDirectory.resolve(fileName);
            Path targetFile = projectRoot.resolve(fileName);

            // 상위 디렉토리가 필요한 경우 생성
            if (targetFile.getParent() != null) {
                Files.createDirectories(targetFile.getParent());
            }

            if (Files.exists(sourceFile)) {
                Files.copy(sourceFile, targetFile);
                log.info("Copied: " + sourceFile + " to " + targetFile);
            } else {
                log.info(Paths.get("").toAbsolutePath().toString());
                log.info("File does not exist: " + sourceFile);
            }
        }
    }

    public void createGradleSettings(Path projectRoot, InitializerRequestDto request)
        throws IOException {
//        Path sourceDirectory = Paths.get(
//            "src/main/java/com/mozart/mocka/templates/gradle" + request.getSpringPlatformVersion());
//        로컬 환경
        Path sourceDirectory = Paths.get(
            "templates/gradle" + request.getSpringPlatformVersion());


        // 파일 목록: 이곳에 필요한 파일 이름을 추가합니다.
        String[] requiredFiles = {
            "gradlew",
            "gradlew.bat",
            "gradle.wrapper/gradle-wrapper.jar",
            "gradle.wrapper/gradle-wrapper.properties",
            "HELP.md",
            ".gitignore",
            "settings.gradle"
        };

        // 각 파일을 복사
        for (String fileName : requiredFiles) {
            Path sourceFile = sourceDirectory.resolve(fileName);
            Path targetFile = projectRoot.resolve(fileName);

            // 상위 디렉토리가 필요한 경우 생성
            if (targetFile.getParent() != null) {
                Files.createDirectories(targetFile.getParent());
            }

            if (Files.exists(sourceFile)) {
                Files.copy(sourceFile, targetFile);
                log.info("Copied: " + sourceFile + " to " + targetFile);
            } else {
                log.info(Paths.get("").toAbsolutePath().toString());
                log.info("File does not exist: " + sourceFile);
            }
        }
    }

    public void updateSettingsGradleFile(Path projectRoot, String projectName) throws IOException {
        Path settingsFile = projectRoot.resolve("settings.gradle");
        List<String> lines = Files.readAllLines(settingsFile, StandardCharsets.UTF_8);
        List<String> modifiedLines = lines.stream()
            .map(line -> line.startsWith("rootProject.name") ? "rootProject.name = '" + projectName
                + "'" : line)
            .collect(Collectors.toList());
        Files.write(settingsFile, modifiedLines, StandardCharsets.UTF_8);
    }
}
