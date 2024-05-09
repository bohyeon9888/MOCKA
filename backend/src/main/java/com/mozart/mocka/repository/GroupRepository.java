package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Groups;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GroupRepository extends JpaRepository<Groups, Long> {
    void deleteByProjectId(Long projectId);

    List<Groups> findByProjectId(Long projectId);
}