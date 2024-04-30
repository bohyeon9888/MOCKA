package com.mozart.mocka.service;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.stereotype.Service;

@Service
public class InitializerService {

    public Path createInitializerFiles(InitializerRequestDto request) throws IOException {
        Path projectRoot = Paths.get(request.getSpringArtifactId());
        createDirectories(projectRoot, request);
        createApplicationProperties(projectRoot);
        createApplicationClass(projectRoot, request);

        if ("maven".equalsIgnoreCase(request.getSpringType())) {
            createPomFile(projectRoot, request);
        } else if ("gradle".equalsIgnoreCase(request.getSpringType())) {
            createGradleBuildFile(projectRoot, request);
        }

        return projectRoot;
    }

    private void createDirectories(Path projectRoot, InitializerRequestDto request) throws IOException {
        Files.createDirectories(projectRoot.resolve("src/main/java/" + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/main/resources"));
        Files.createDirectories(projectRoot.resolve("src/test/java/" + request.getSpringPackageName().replace('.', '/')));
        Files.createDirectories(projectRoot.resolve("src/test/resources"));
    }

    private void createPomFile(Path projectRoot, InitializerRequestDto request) throws IOException {
        Path pomPath = projectRoot.resolve("pom.xml");
        try (BufferedWriter writer = Files.newBufferedWriter(pomPath)) {
            writer.write(generatePomContent(request));
        }
    }

    private void createApplicationProperties(Path projectRoot) throws IOException {
        Path propertiesPath = projectRoot.resolve("src/main/resources/application.properties");
        Files.createFile(propertiesPath);
    }

    private void createApplicationClass(Path projectRoot, InitializerRequestDto request) throws IOException {
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
            "        SpringApplication.run(Application.class, args);\n" +
            "    }\n" +
            "}\n";
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

    private void createGradleBuildFile(Path projectRoot, InitializerRequestDto request) throws IOException {
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
}
