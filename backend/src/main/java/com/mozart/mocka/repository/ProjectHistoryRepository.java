package com.mozart.mocka.repository;

import com.mozart.mocka.domain.ProjectHistories;
import com.mozart.mocka.domain.ProjectHistoryPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectHistoryRepository extends JpaRepository<ProjectHistories, ProjectHistoryPK> {

    @Modifying
    @Query("UPDATE ProjectHistories ph SET ph.isDeleted = true WHERE ph.projectHistoryPK.projectId = :projectId")
    public void softDeleteByProjectId(Long projectId);

    @Query("SELECT ph FROM ProjectHistories ph WHERE ph.projectHistoryPK.memberId = :memberId AND ph.projectHistoryPK.projectId = :projectId AND ph.projectRole = 'OWNER'")
    Optional<ProjectHistories> findOwnerByMemberIdAndProjectId(@Param("memberId") Long memberId, @Param("projectId") Long projectId);

    Optional<ProjectHistories> findByProjectHistoryPK_MemberIdAndProjectHistoryPK_ProjectId(Long memberId, Long projectId);

    void deleteByProjectHistoryPK_ProjectId(Long projectId);
}
