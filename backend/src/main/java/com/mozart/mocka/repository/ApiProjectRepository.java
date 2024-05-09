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
            "(project_id, api_method, api_uri, api_uri_str, api_response_is_array, api_response_size, name, description, group_id) " +
            "VALUES (:id, :method, CAST(:uri AS ltree), :str, :array, :size, :name, :description, :group) RETURNING api_id", nativeQuery = true)
    int createApi(@Param("id") Long projectId,
                   @Param("method") String apiMethod,
                   @Param("uri") String apiUri,
                   @Param("str") String str,
                   @Param("array") boolean apiResponseIsArray,
                   @Param("size") int apiResponseSize,
                   @Param("name") String name,
                   @Param("description") String description,
                   @Param("group") Long groupId);

    List<ApiProjects> findByProjectId(Long projectId);

    List<ApiProjects> findByGroupId(Long groupId);

    @Query(value = "SELECT  COUNT(api_uri) FROM api_projects WHERE api_uri = CAST(:api_uri AS ltree) and api_method = :api_method and project_id = :project_id",nativeQuery = true)
    int selectCountMatchApiUriAndMethod(@Param("api_uri") String apiUri,
                                        @Param("api_method") String apiMethod,
                                        @Param("project_id") Long projectId);

    @Query(value = "SELECT  COUNT(api_id) FROM api_projects WHERE api_id = :api_id and project_id = :project_id",nativeQuery = true)
    int selectCountMatchApiId(@Param("api_id") Long apiUri,
                              @Param("project_id") Long projectId);

    void deleteByApiId(Long apiId);

    void deleteByProjectId(Long projectId);

    @Query(value = "SELECT  COUNT(api_uri) FROM api_projects WHERE api_uri = CAST(:api_uri AS ltree) and api_method = :api_method and project_id = :project_id and api_id != :api_id",nativeQuery = true)
    int selectCountMatchApiUriAndMethodExceptSelf(@Param("api_uri") String apiUri,
                                        @Param("api_method") String apiMethod,
                                        @Param("project_id") Long projectId, @Param("api_id") Long apiId);
}
