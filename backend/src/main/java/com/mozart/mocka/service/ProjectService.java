package com.mozart.mocka.service;

import com.mozart.mocka.domain.ProjectHistories;
import com.mozart.mocka.domain.ProjectHistoryPK;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.repository.ProjectHistoryRepository;
import com.mozart.mocka.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectHistoryRepository projectHistoryRepository;

    public void create(Long memberId, String projectName, String commonUri, String visibility) {
        Projects projects = Projects.builder()
                .projectName(projectName)
                .projectVisibility(visibility)
                .commonUri(commonUri)
                .build();

        projectRepository.save(projects);

        ProjectHistoryPK projectHistoryPK = ProjectHistoryPK.builder()
                .memberId(memberId).projectId(projects.getProjectId())
                .build();
        ProjectHistories projectHistories = ProjectHistories.builder()
                .projectHistoryPK(projectHistoryPK)
                .projectRole("OWNER")
                .build();
        projectHistoryRepository.save(projectHistories);
    }

    public Boolean delete(Long memberId, Long projectId) {
        //is owner?
        ProjectHistoryPK pk = ProjectHistoryPK.builder()
                .projectId(projectId).memberId(memberId)
                .build();
        Optional<ProjectHistories> projectHistories = projectHistoryRepository.findById(pk);

        if(projectHistories.isEmpty() || !"OWNER".equals(projectHistories.get().getProjectRole()))
            return false;

        projectRepository.deleteById(projectId);
        projectHistoryRepository.softDeleteByProjectId(projectId);
        return true;
    }
}
