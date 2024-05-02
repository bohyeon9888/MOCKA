package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.ApiPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiPathRepository extends JpaRepository<ApiPath, Long> {
    List<ApiPath> findByApiProject_ApiId(Long apiId);
}
