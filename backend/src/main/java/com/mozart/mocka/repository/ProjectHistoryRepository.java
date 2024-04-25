package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ProjectHistories;
import com.mozart.mocka.domain.ProjectHistoryPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProjectHistoryRepository extends JpaRepository<ProjectHistories, ProjectHistoryPK> {

    @Modifying
    @Query("UPDATE ProjectHistories ph SET ph.isDeleted = true WHERE ph.projectHistoryPK.projectId = :projectId")
    public void softDeleteByProjectId(Long projectId);

}
