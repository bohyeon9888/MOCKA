package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Groups;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GroupRepository extends JpaRepository<Groups, Long> {
    void deleteByProject_ProjectId(Long projectId);
    Groups findByGroupId(Long group);
    List<Groups> findByProject_ProjectId(Long projectId);
}