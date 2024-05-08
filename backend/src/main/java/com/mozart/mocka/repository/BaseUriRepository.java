package com.mozart.mocka.repository;

import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BaseUriRepository extends JpaRepository<BaseUris, Long> {
    void deleteByProjectId(Long projectId);

    @Query(value = "SELECT  COUNT(base_id) FROM base_uris WHERE project_id = :project_id and uri = :uri and is_deleted = false",nativeQuery = true)
    int selectCountMatchUri(@Param("project_id") Long project_id,@Param("uri") String uri);

    BaseUris findByBaseId(Long baseId);

    @Modifying
    @Query(value = "DELETE FROM base_uris WHERE project_id = :project_id and uri = :uri",nativeQuery = true)
    void deleteByUriDeleted(@Param("project_id") Long project_id,@Param("uri") String uri);

    List<BaseUris> findByProjectId(Long projectId);
}
