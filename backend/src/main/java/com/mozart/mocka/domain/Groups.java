package com.mozart.mocka.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Groups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column
    private String groupName;

    @Column
    private String groupUri;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Projects project;

    @OneToMany(mappedBy = "groups")
    private List<ApiProjects> apiProjects = new ArrayList<>();

    public Groups(String groupName, String groupUri, Projects projects){
        this.groupName = groupName;
        this.groupUri = groupUri;
        this.project = projects;
    }

    public Groups(Long groupId, String name, String uri, Projects projects) {
        this.groupId = groupId;
        this.groupName = name;
        this.groupUri = uri;
        this.project = projects;
    }
}
