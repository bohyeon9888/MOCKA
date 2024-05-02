package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.ApiProjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface ApiProjectRepository extends JpaRepository<ApiProjects, Long> {
    @Query(value = "SELECT * FROM api_projects ap WHERE project_id =:id and api_method =:method and api_uri = CAST(:str AS ltree)", nativeQuery = true)
    Optional<ApiProjects> findByApiUri(Long id, String method, String str);
}
