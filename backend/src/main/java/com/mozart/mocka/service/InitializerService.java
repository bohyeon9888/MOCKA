package com.mozart.mocka.service;

import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.service.generator.GenController;
import com.mozart.mocka.service.generator.GenInit;
import com.mozart.mocka.service.generator.GenRequest;
import com.mozart.mocka.service.generator.GenResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.File;
import java.nio.file.*;
import java.util.Comparator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InitializerService {

    private final GenInit genInit;
    private final GenController genController;

    // 파일 생성
    public Path createInitializerFiles(InitializerRequestDto request, List<ApiProjects> apis, String uri)
        throws Exception {

        Path projectRoot = Paths.get(request.getSpringArtifactId());
        genInit.createDirectories(projectRoot, request);
        genInit.createApplicationProperties(projectRoot, uri);
        genInit.createApplicationClass(projectRoot, request);

        if ("Maven".equalsIgnoreCase(request.getSpringType())) {
            genInit.createPomFile(projectRoot, request);
            genInit.createMavenSettings(projectRoot, request);
        } else if ("Gradle".equalsIgnoreCase(request.getSpringType())) {
            genInit.createGradleBuildFile(projectRoot, request);
            genInit.createGradleSettings(projectRoot, request);
            genInit.updateSettingsGradleFile(projectRoot, request.getSpringName());
        }

        genController.createController(projectRoot, apis, request);

        return projectRoot;
    }

    // 파일 압축
    public Path packageProject(Path projectRoot) throws IOException {
        Path zipPath = projectRoot.resolveSibling(projectRoot.getFileName().toString() + ".zip");
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipPath.toFile()))) {
            Files.walk(projectRoot)
                .filter(path -> !Files.isDirectory(path))
                .forEach(path -> {
                    ZipEntry zipEntry = new ZipEntry(projectRoot.relativize(path).toString());
                    try {
                        zos.putNextEntry(zipEntry);
                        Files.copy(path, zos);
                        zos.closeEntry();
                    } catch (IOException e) {
                        log.error("Error while zipping: " + e.getMessage());
                    }
                });
        }
        return zipPath;
    }

    // 파일 삭제
    public void cleanUpFiles(Path zipPath, Path projectRoot) {
        try {
            // zip 파일 삭제
            Files.deleteIfExists(zipPath);
            // 원본 파일 삭제
            Files.walk(projectRoot)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
        } catch (IOException e) {
            log.error("Error cleaning up project files: " + e.getMessage());
        }
    }
}
