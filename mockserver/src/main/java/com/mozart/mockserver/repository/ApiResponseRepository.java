package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.ApiResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiResponseRepository extends JpaRepository<ApiResponse, Long> {
}
