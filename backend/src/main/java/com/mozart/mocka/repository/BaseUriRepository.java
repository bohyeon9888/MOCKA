package com.mozart.mocka.repository;

import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BaseUriRepository extends JpaRepository<BaseUris, Long> {
    void deleteByProjectId(Long projectId);

    @Query(value = "SELECT  COUNT(base_id) FROM base_uris WHERE project_id = :project_id and uri = :uri and is_deleted = false",nativeQuery = true)
    int selectCountMatchUri(@Param("project_id") Long project_id,@Param("uri") String uri);

    BaseUris findByBaseId(Long baseId);

    @Query(value = "SELECT * FROM base_uris WHERE project_id = :project_id and uri = :uri and is_deleted = true",nativeQuery = true)
    BaseUris findByUriDeleted(@Param("project_id") Long project_id,@Param("uri") String uri);

    @Modifying
    @Query(value = "UPDATE  base_uris SET is_deleted=true WHERE project_id = :project_id and uri = :uri",nativeQuery = true)
    void setActivateBaseUri(@Param("project_id") Long project_id,@Param("uri") String uri);

    @Query(value = "SELECT * FROM base_uris WHERE project_id = :project_id and is_deleted = true",nativeQuery = true)
    BaseUris findByIdDeleted(@Param("project_id") Long project_id);
}
