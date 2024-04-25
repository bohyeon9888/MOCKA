package com.mozart.mocka.service;

import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.repository.ProjectRepository;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public void create(Long memberId, String projectName, String commonUri, String visibility) {
        Projects projects = Projects.builder()
                .projectName(projectName)
                .projectVisibility(visibility)
                .commonUri(commonUri)
                .build();

        projectRepository.save(projects);
    }
}
