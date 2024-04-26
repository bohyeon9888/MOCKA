package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Projects, Long> {

    @Query("SELECT new com.mozart.mocka.dto.response.ProjectsListResponseDto(" +
            " p.projectId, p.projectName, ph.projectRole " +
            ", p.projectHashKey, p.commonUri ) " +
            " from ProjectHistories ph left join Projects p on ph.projectHistoryPK.projectId = p.projectId " +
            " where ph.projectHistoryPK.memberId =:memberId ")
    List<ProjectsListResponseDto> findMyList(Long memberId);
}