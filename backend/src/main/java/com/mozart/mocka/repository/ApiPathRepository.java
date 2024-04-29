package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ApiPath;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ApiPathRepository extends JpaRepository<ApiPath, Long> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO api_path (api_id, key, data) VALUES (:id, :key, CAST(:value AS jsonb))", nativeQuery = true)
    void create(Long id, String key, String value);
}
