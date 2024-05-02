package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.ApiRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiRequestRepository extends JpaRepository<ApiRequest, Long> {

    List<ApiRequest> findByApiProject_ApiId(Long apiId);
}
