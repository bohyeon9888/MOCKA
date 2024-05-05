package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.domain.ProjectInvitations;
import com.mozart.mocka.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectInvitationRepository extends JpaRepository<ProjectInvitations, Long> {

    Optional<ProjectInvitations> findByMembersAndProjects(Members member, Projects project);

}
