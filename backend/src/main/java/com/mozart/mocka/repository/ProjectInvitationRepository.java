package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ProjectInvitations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectInvitationRepository extends JpaRepository<ProjectInvitations, Long> {

    Optional<ProjectInvitations> findByMembers_MemberIdAndProjects_ProjectId(Long memberId, Long projectId);

}
