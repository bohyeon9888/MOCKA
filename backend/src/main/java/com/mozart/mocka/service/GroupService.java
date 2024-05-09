package com.mozart.mocka.service;
import com.mozart.mocka.domain.Groups;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import com.mozart.mocka.repository.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public List<Groups> getGroupList(Long projectId) {
        return groupRepository.findByProjectId(projectId);
    }
    public void create(Long projectId, String name, String uri) {
        groupRepository.save(Groups.builder()
                .groupName(name).groupUri(uri).projectId(projectId)
                .build());
    }

    public boolean update(Long projectId, Long groupId, String name, String uri) {
//        groupRepository.save(Groups.builder()
//                .groupId(groupId).groupName(name).groupUri(uri).projectId(projectId)
//                .build());
        return false;
    }
}
