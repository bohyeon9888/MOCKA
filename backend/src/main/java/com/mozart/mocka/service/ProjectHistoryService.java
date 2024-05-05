package com.mozart.mocka.service;

import com.mozart.mocka.domain.ProjectHistories;
import com.mozart.mocka.domain.ProjectHistoryPK;
import com.mozart.mocka.domain.ProjectInvitations;
import com.mozart.mocka.repository.ProjectHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectHistoryService {

    private final ProjectHistoryRepository historyRepository;

    @Transactional
    public void createProjectMember(ProjectInvitations invitation) {
        ProjectHistoryPK historyPK = ProjectHistoryPK.builder()
                .projectId(invitation.getProjects().getProjectId())
                .memberId(invitation.getMembers().getMemberId())
                .build();

        ProjectHistories history = ProjectHistories.builder()
                .projectHistoryPK(historyPK)
                .projectRole(invitation.getProjectRole())
                .build();

        historyRepository.save(history);
    }

}
