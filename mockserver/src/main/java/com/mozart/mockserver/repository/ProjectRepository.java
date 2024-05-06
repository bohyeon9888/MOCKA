package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Projects, Long> {
}