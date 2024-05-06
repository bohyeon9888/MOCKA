package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ApiProjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApiProjectRepository extends JpaRepository<ApiProjects, Long> {
//
//    INSERT INTO your_table (api_uri)
//    VALUES ('your_string_value'::ltree);

//    @Modifying
//@Modifying
@Query(value = "INSERT INTO api_projects " +
        "(project_id, api_method, api_uri, api_uri_str, api_response_is_array, api_response_size) " +
        "VALUES (:id, :method, CAST(:uri AS ltree), :str, :array, :size) RETURNING api_id", nativeQuery = true)
int createApi(@Param("id") Long projectId,
               @Param("method") String apiMethod,
               @Param("uri") String apiUri,
               @Param("str") String str,
               @Param("array") boolean apiResponseIsArray,
               @Param("size") int apiResponseSize);

    List<ApiProjects> findByProjectId(Long projectId);

    void deleteByApiId(Long apiId);
}
