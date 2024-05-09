package com.mozart.mocka.service;
import com.mozart.mocka.domain.Groups;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.response.ProjectsListResponseDto;
import com.mozart.mocka.repository.ApiProjectRepository;
import com.mozart.mocka.repository.GroupRepository;
import com.mozart.mocka.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
    public boolean create(Long projectId, String name, String uri) {
        Optional<Projects> project = projectRepository.findById(projectId);
        // uri 내에 계층 하나 체크
        int cnt = 0;
        for (int i = 0; i < uri.length(); i++) {
            if(uri.charAt(i)=='/')
                cnt++;
        }
        if(cnt == 0)
            uri = '/' + uri;
        else if(cnt > 1)
            return false;

        //uri 중복 체크
        List<Groups> groups = groupRepository.findByProject_ProjectId(projectId);
        for(Groups g : groups){
            if(g.getGroupUri().equals(name)){
                return false;
            }
        }

        if(project.isPresent())
            groupRepository.save(new Groups(name,uri,project.get()));
        else
            return false;
        return true;
    }

    public boolean update(Long projectId, Long groupId, String name, String uri) {
        Optional<Groups> group = groupRepository.findById(groupId);
        if(group.isEmpty())
            return false;
        if(Objects.equals(group.get().getProject().getProjectId(), projectId)){
            group.get().setGroupName(name);
            groupRepository.save(group.get());
            return true;
        }
        return false;
    }

    public void deleteAllEntity(Long projectId, Long groupId) {
        Optional<Groups> group = groupRepository.findById(groupId);
        if(group.isEmpty())
            return;
        if(Objects.equals(group.get().getProject().getProjectId(), projectId))
            groupRepository.deleteById(groupId);
    }
}
