package com.mozart.mocka.repository;

import com.mozart.mocka.domain.BaseUris;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseUriRepository extends JpaRepository<BaseUris, Long> {
    void deleteByProjectId(Long projectId);
}
