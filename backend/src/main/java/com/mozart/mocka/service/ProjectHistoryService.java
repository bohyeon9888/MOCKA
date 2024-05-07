package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.domain.ProjectHistories;
import com.mozart.mocka.domain.ProjectHistoryPK;
import com.mozart.mocka.domain.ProjectInvitations;
import com.mozart.mocka.dto.response.ProjectMemberDto;
import com.mozart.mocka.repository.MembersRepository;
import com.mozart.mocka.repository.ProjectHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class ProjectHistoryService {

    private final ProjectHistoryRepository historyRepository;
    private final MembersRepository membersRepository;

    @Transactional
    public void createProjectMember(ProjectInvitations invitation) {
        ProjectHistoryPK historyPK = ProjectHistoryPK.builder()
                .projectId(invitation.getProjects().getProjectId())
                .memberId(invitation.getMembers().getMemberId())
                .build();

        ProjectHistories history = ProjectHistories.builder()
                .projectHistoryPK(historyPK)
                .projectRole(invitation.getProjectRole())
                .recentRead(LocalDateTime.now())
                .build();

        historyRepository.save(history);
    }

    @Transactional
    public boolean patchProjectMember(String ownerName, Long memberId, Long projectId, String projectRole) {
        Long ownerId = membersRepository.findByMemberNickname(ownerName).getMemberId();
        if (historyRepository.findOwnerByMemberIdAndProjectId(ownerId, projectId).isEmpty()) {
            log.info("프로젝트의 소유주와 일치하지 않습니다.");
            return false;
        }

        Optional<ProjectHistories> history = historyRepository.findByProjectHistoryPK_MemberIdAndProjectHistoryPK_ProjectId(
                memberId, projectId
        );

        if (history.isEmpty()) {
            log.info("해당 사용자는 프로젝트의 멤버가 아닙니다.");
            return false;
        }

        ProjectHistories data = history.get();
        data.setProjectRole(projectRole);

        historyRepository.save(data);
        log.info("================= patch 완료 ===============");
        return true;
    }

    public List<ProjectMemberDto> getMemberList(Long projectId) {
        List<ProjectHistories> list = historyRepository.findAllByProjectHistoryPK_ProjectId(projectId);
        log.info("data size : " + list.size());
        List<ProjectMemberDto> resp = new ArrayList<>();

        for (ProjectHistories hist : list) {
            Members mem = membersRepository.findByMemberId(hist.getProjectHistoryPK().getMemberId());
            ProjectMemberDto dto = ProjectMemberDto.builder()
                    .memberId(mem.getMemberId())
                    .email(mem.getMemberEmail())
                    .profile(mem.getMemberProfile())
                    .role(hist.getProjectRole())
                    .build();

            resp.add(dto);
        }

        return resp;
    }

    @Transactional
    public boolean updateRecentTime(Long projectId, Long memberId) {
        Optional<ProjectHistories> data = historyRepository.findByProjectHistoryPK_MemberIdAndProjectHistoryPK_ProjectId(memberId, projectId);

        if (data.isEmpty()) {
            log.debug("해당하는 프로젝트가 없습니다.");
            return false;
        }

        ProjectHistories ph = data.get();
        ph.setRecentRead(LocalDateTime.now());

        historyRepository.save(ph);
        log.debug("========== 업데이트 완료 ==========");

        return true;
    }

}
