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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class InviteService {

    private final ProjectHistoryRepository historyRepository;
    private final ProjectRepository projectRepository;
    private final MembersRepository membersRepository;
    private final ProjectInvitationRepository invitationRepository;
    private final EmailService emailService;
    private final ProjectHistoryService historyService;

    @Transactional
    public boolean createInvitation(String providerId, Long projectId, List<TeamMemberDto> members) throws MessagingException {
        //프로젝트 소유주인지 확인
        Long ownerId = membersRepository.findByMemberProviderId(providerId).getMemberId();
        log.debug("현재 회원 아이디 : " + ownerId);
        if (historyRepository.findOwnerByMemberIdAndProjectId(ownerId, projectId).isEmpty()) {
            log.info("프로젝트의 소유주와 일치하지 않습니다.");
            return false;
        }

        if (!projectRepository.existsByProjectId(projectId)) {
            log.debug("해당 프로젝트가 존재하지 않습니다.");
            return false;
        }

        String[] emails = new String[members.size()];
        Projects project = projectRepository.findByProjectId(projectId);

        // 1. Project_invitations 테이블에 데이터 추가됨
        for (int i = 0; i < members.size(); i++) {
            TeamMemberDto mem = members.get(i);

            Members newMem = membersRepository.findByMemberEmail(mem.getEmail());
            if (newMem == null) {
                log.error("동일한 이메일을 가진 사용자가 없습니다.");
                continue;
            }
            // 동일한 초대 내역이 있는지
            Optional<ProjectInvitations> invitation = invitationRepository.findByMembers_MemberIdAndProjects_ProjectId(newMem.getMemberId(), projectId);
            if (invitation.isPresent()) {
                log.error("동일한 초대내역이 있습니다.");
                continue;
            }

            emails[i] = mem.getEmail();
            ProjectInvitations invitations = ProjectInvitations.builder()
                    .members(newMem)
                    .projects(project)
                    .accepted(null)
                    .projectRole(mem.getProjectRole())
                    .build();

            invitationRepository.save(invitations);
            log.debug("========= save invitation info ============");
        }

        // 메일 수신
        if (emails.length == 0) {
            log.info("회원이 없습니다.");
            return false;
        }
        emailService.sendEmail(emails, project);
        return true;
    }

    @Transactional
    public InvitationResponseDto checkInvitation(String providerId, Long projectId) {
        Members member = membersRepository.findByMemberProviderId(providerId);
        if (member == null) {
            log.error("No member found with nickname: " + providerId);
            return null; // 혹은 적절한 예외 처리
        }
        log.info("멤버 아이디 : " + member.getMemberId());

        Projects project = projectRepository.findByProjectId(projectId);
        if (project == null) {
            log.error("No project found with ID: " + projectId);
            return null; // 혹은 적절한 예외 처리
        }
        log.info("프로젝트 아이디 : " + projectId);

        Optional<ProjectInvitations> invitation = invitationRepository.findByMembers_MemberIdAndProjects_ProjectId(member.getMemberId(), projectId);
        int isResponse = 0;

        if (invitation.isEmpty()) {
            log.warn("해당 초대가 없음");
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

    @Transactional
    public boolean answerInvitation(String providerId, Long projectId, String answer) {
        Members member = membersRepository.findByMemberProviderId(providerId);

        Optional<ProjectInvitations> invitation = invitationRepository.findByMembers_MemberIdAndProjects_ProjectId(member.getMemberId(), projectId);
        if (invitation.isEmpty()) {
            log.error("초대장이 없습니다.");
            return false;
        }

        ProjectInvitations invite = invitation.get();
        if (invite.getAccepted() != null) {
            log.error("이미 답변이 완료된 초대장입니다.");
            return false;
        }

        if (answer.equals("yes")) {
            invite.setAccepted(true);
            // project history에도 설정
            historyService.createProjectMember(invite);
            log.info("초대를 승낙했습니다.");
        } else {
            invite.setAccepted(false);
            log.info("초대를 거절했습니다.");
        }

        return true;
    }
}
