package com.mozart.mocka.domain;

import com.mozart.mocka.domain.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE projects SET is_deleted = TRUE WHERE project_id = ?")
public class Projects extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column
    private String projectName;

    @Setter
    @Column
    private String projectHashKey;

    @Column
    private String projectVisibility;

    @Column
    private String commonUri;

    @Column
    private Long hashId;

    @Column
    private String hash_value;

    @Setter
    @Column
    private Long defaultGroupId;

//    @OneToMany(mappedBy = "project")
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Groups> groups = new ArrayList<>();

    public Projects(String projectName, String visibility, String commonUri) {
        this.projectName = projectName;
        this.projectVisibility = visibility;
        this.commonUri = commonUri;
    }

    public Projects(String projectName, String visibility, String commonUri, Long projectId) {
        this.projectName = projectName;
        this.projectVisibility = visibility;
        this.commonUri = commonUri;
        this.projectId = projectId;
    }
}
