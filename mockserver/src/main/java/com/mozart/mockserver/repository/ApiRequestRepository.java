package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ApiRequest;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ApiRequestRepository extends JpaRepository<ApiRequest, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO api_request (api_id, key,type,is_array, data) " +
            " VALUES (:id, :key,:type, :array, CAST(:value AS jsonb))", nativeQuery = true)
    int create(Long id, String key, String type,boolean array, String value);

    void deleteByApiProject_ApiId(Long apiId);
}
