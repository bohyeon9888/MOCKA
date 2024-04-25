package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Projects, Long> {

}
