package com.mozart.mocka.service.generator;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class GenInit {

    public void createDirectories(Path projectRoot, InitializerRequestDto request) throws IOException {
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/main/resources"));
        Files.createDirectories(projectRoot.resolve("src/test/java/" + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/test/resources"));
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace(".", "/") + "/controller")); // 컨트롤러 디렉토리 생성
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace(".", "/") + "/dto")); // DTO 디렉토리 생성
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace(".", "/") + "/dto/response")); // Response 디렉토리 생성
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace(".", "/") + "/dto/request")); // Request 디렉토리 생성
    }

    public void createApplicationProperties(Path projectRoot) throws IOException {
        Path propertiesPath = projectRoot.resolve("src/main/resources/application.properties");
        Files.createFile(propertiesPath);
    }

    public void createApplicationClass(Path projectRoot, InitializerRequestDto request) throws IOException {
        Path mainClassPath = projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace('.', '/') + "/Application.java");
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
            "        SpringApplication.run(ApplicationApplication.class, args);\n" +
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
        return "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n" +
            "         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
            "         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n" +
            "    <modelVersion>4.0.0</modelVersion>\n" +
            "    <groupId>" + request.getSpringGroupId() + "</groupId>\n" +
            "    <artifactId>" + request.getSpringArtifactId() + "</artifactId>\n" +
            "    <version>0.0.1-SNAPSHOT</version>\n" +
            "    <name>" + request.getSpringName() + "</name>\n" +
            "    <description>" + request.getSpringDescription() + "</description>\n" +
            "    <parent>\n" +
            "        <groupId>org.springframework.boot</groupId>\n" +
            "        <artifactId>spring-boot-starter-parent</artifactId>\n" +
            "        <version>" + request.getSpringPlatformVersion() + "</version>\n" +
            "        <relativePath/> <!-- lookup parent from repository -->\n" +
            "    </parent>\n" +
            "    <dependencies>\n" +
            "        <dependency>\n" +
            "            <groupId>org.springframework.boot</groupId>\n" +
            "            <artifactId>spring-boot-starter</artifactId>\n" +
            "        </dependency>\n" +
            "        <!-- Additional dependencies can be added here -->\n" +
            "    </dependencies>\n" +
            "    <properties>\n" +
            "        <java.version>" + request.getSpringJvmVersion() + "</java.version>\n" +
            "    </properties>\n" +
            "</project>";
    }

    public void createGradleBuildFile(Path projectRoot, InitializerRequestDto request) throws IOException {
        Path buildFilePath = projectRoot.resolve("build.gradle");
        try (BufferedWriter writer = Files.newBufferedWriter(buildFilePath)) {
            writer.write(generateGradleBuildContent(request));
        }
    }

    private String generateGradleBuildContent(InitializerRequestDto request) {
        return "plugins {\n" +
            "    id 'org.springframework.boot' version '" + request.getSpringPlatformVersion() + "'\n" +
            "    id 'io.spring.dependency-management' version '1.0.11.RELEASE'\n" +
            "    id 'java'\n" +
            "}\n\n" +
            "group = '" + request.getSpringGroupId() + "'\n" +
            "version = '0.0.1-SNAPSHOT'\n" +
            "sourceCompatibility = '" + request.getSpringJvmVersion() + "'\n\n" +
            "repositories {\n" +
            "    mavenCentral()\n" +
            "}\n\n" +
            "dependencies {\n" +
            "    implementation 'org.springframework.boot:spring-boot-starter-web'\n" +
            "    testImplementation('org.springframework.boot:spring-boot-starter-test')\n" +
            "    // Add additional dependencies here\n" +
            "}\n\n" +
            "test {\n" +
            "    useJUnitPlatform()\n" +
            "}";
    }

    public void createMavenSettings(Path projectRoot, InitializerRequestDto request) throws IOException{
        Path sourceDirectory = Paths.get("src/main/templates/maven" + request.getSpringPlatformVersion());

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
                System.out.println("Copied: " + sourceFile + " to " + targetFile);
            } else {
                System.out.println("File does not exist: " + sourceFile);
            }
        }
    }

    public void createGradleSettings(Path projectRoot, InitializerRequestDto request) throws IOException{
        Path sourceDirectory = Paths.get("src/main/templates/gradle" + request.getSpringPlatformVersion());

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
                System.out.println("Copied: " + sourceFile + " to " + targetFile);
            } else {
                System.out.println("File does not exist: " + sourceFile);
            }
        }
    }
}
