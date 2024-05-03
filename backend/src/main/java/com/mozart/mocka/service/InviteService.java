package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.domain.ProjectInvitations;
import com.mozart.mocka.dto.TeamMemberDto;
import com.mozart.mocka.repository.MembersRepository;
import com.mozart.mocka.repository.ProjectInvitationRepository;
import com.mozart.mocka.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class InviteService {

    private final ProjectRepository projectRepository;
    private final MembersRepository membersRepository;
    private final ProjectInvitationRepository invitationRepository;

    public void createInvitation(String ownerName, Long projectId, List<TeamMemberDto> members) {
        //프로젝트 소유주인지 확인
//        Long ownerId = membersRepository.findByMemberNickname(ownerName).getMemberId();

        // 1. Project_invitations 테이블에 데이터 추가됨
        for (TeamMemberDto mem : members) {
            Members newMem = membersRepository.findByMemberEmail(mem.getEmail());
            ProjectInvitations invitations = ProjectInvitations.builder()
                    .members(newMem)
                    .projects(projectRepository.findByProjectId(projectId))
                    .accepted(null)
                    .build();

            log.info(invitations);
            invitationRepository.save(invitations);
            log.debug("========= save invitation info ============");
        }

    }
}
