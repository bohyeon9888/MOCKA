package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Projects, Long> {

}
