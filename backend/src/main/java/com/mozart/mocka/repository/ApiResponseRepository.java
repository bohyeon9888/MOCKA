package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ApiResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ApiResponseRepository extends JpaRepository<ApiResponse, Long> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO api_response (api_id, key, type, data, faker_locale, faker_major, faker_sub, array_list, array_size) " +
            " VALUES (:id, :key, :type, CAST(:value AS jsonb), :locale, :major, :sub, :array, :size)", nativeQuery = true)
    void create(Long id, String key, String type, String value, String locale, String major, String sub, boolean array, int size);

    void deleteByApiProject_ApiId(Long apiId);

    List<ApiResponse> findByApiProject_ApiId(Long apiId);
}
