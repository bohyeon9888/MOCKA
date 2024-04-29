package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ApiRequest;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ApiRequestRepository extends JpaRepository<ApiRequest, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO api_request (api_id, key,type, data) " +
            " VALUES (:id, :key,:type, CAST(:value AS jsonb))", nativeQuery = true)
    int create(Long id, String key, String type, String value);
}
