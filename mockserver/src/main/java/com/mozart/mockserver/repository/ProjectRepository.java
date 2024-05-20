package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Projects, Long> {
    Optional<Projects> findByProjectHashKey(String hostName);
}