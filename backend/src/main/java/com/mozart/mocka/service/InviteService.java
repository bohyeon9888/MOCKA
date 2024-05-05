package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.domain.ProjectInvitations;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.TeamMemberDto;
import com.mozart.mocka.dto.response.InvitationResponseDto;
import com.mozart.mocka.repository.MembersRepository;
import com.mozart.mocka.repository.ProjectHistoryRepository;
import com.mozart.mocka.repository.ProjectInvitationRepository;
import com.mozart.mocka.repository.ProjectRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class InviteService {

    private final ProjectHistoryRepository historyRepository;
    private final ProjectRepository projectRepository;
    private final MembersRepository membersRepository;
    private final ProjectInvitationRepository invitationRepository;
    private final EmailService emailService;

    @Transactional
    public void createInvitation(String ownerName, Long projectId, List<TeamMemberDto> members) throws MessagingException {
        //프로젝트 소유주인지 확인
        Long ownerId = membersRepository.findByMemberNickname(ownerName).getMemberId();
        if (historyRepository.findOwnerByMemberIdAndProjectId(ownerId, projectId).isEmpty()) {
            log.info("프로젝트의 소유주와 일치하지 않습니다.");
            return;
        }

        String[] emails = new String[members.size()];

        // 1. Project_invitations 테이블에 데이터 추가됨
        for (int i = 0; i < members.size(); i++) {
            TeamMemberDto mem = members.get(i);
            emails[i] = mem.getEmail();

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

        // 메일 수신
        emailService.sendEmail(emails);
    }

    @Transactional
    public InvitationResponseDto checkInvitation(String name, Long projectId) {
        Members member = membersRepository.findByMemberNickname(name);
        if (member == null) {
            log.warn("No member found with nickname: " + name);
            return null; // 혹은 적절한 예외 처리
        }
        log.info("멤버 아이디 : " + member.getMemberId());

        Projects project = projectRepository.findByProjectId(projectId);
        if (project == null) {
            log.warn("No project found with ID: " + projectId);
            return null; // 혹은 적절한 예외 처리
        }
        log.info("프로젝트 아이디 : " + projectId);

        Optional<ProjectInvitations> invitation = invitationRepository.findByMembers_MemberIdAndProjects_ProjectId(member.getMemberId(), projectId);
        int isResponse = 0;

        if (invitation.isEmpty()) {
            log.debug("해당 초대가 없음");
            isResponse = 10;
            return InvitationResponseDto.builder()
                    .invite(isResponse)
                    .projectId(projectId)
                    .projectName(project.getProjectName())
                    .build();
        }

        log.info("invitation is present!!!!!");
        log.info("invitation project id : " + invitation.get().getProjects().getProjectId());
        if (invitation.get().getAccepted() != null) {
            log.info("invitation project id : " + invitation.get().getAccepted());
            log.info("초대 받고 응답함");
            isResponse = 1;
        } else {
            log.info("초대 받았는데 응답하지 않음");
        }

        return InvitationResponseDto.builder()
                .invite(isResponse)
                .projectId(projectId)
                .projectName(project.getProjectName())
                .build();
    }


}
