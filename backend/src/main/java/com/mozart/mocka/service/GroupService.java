package com.mozart.mocka.service;
import com.mozart.mocka.domain.Groups;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import com.mozart.mocka.repository.GroupRepository;
import com.mozart.mocka.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final ProjectRepository projectRepository;

    public List<Groups> getGroupList(Long projectId) {
        return groupRepository.findByProject_ProjectId(projectId);
    }
    public void create(Long projectId, String name, String uri) {
        Optional<Projects> project = projectRepository.findById(projectId);

        if(project.isPresent())
        groupRepository.save(new Groups(name,uri,project.get()));
    }

    public void update(Long projectId, Long groupId, String name, String uri) {
        Optional<Projects> project = projectRepository.findById(projectId);

        if(project.isPresent())
        groupRepository.save(new Groups(groupId,name,uri,project.get()));
    }
}
