package com.mozart.mockserver.Service;

import com.mozart.mockserver.domain.Projects;
import com.mozart.mockserver.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Optional<Projects> getProject(String hostName) {
        return projectRepository.findByProjectHashKey(hostName);
    }
}
