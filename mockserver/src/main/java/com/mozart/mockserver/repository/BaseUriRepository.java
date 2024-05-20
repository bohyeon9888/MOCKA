package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.BaseUris;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseUriRepository extends JpaRepository<BaseUris, Long> {
}
