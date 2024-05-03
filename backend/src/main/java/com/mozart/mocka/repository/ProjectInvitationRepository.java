package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ProjectInvitations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectInvitationRepository extends JpaRepository<ProjectInvitations, Long> {

}
