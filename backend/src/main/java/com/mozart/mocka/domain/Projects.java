package com.mozart.mocka.domain;

import com.mozart.mocka.domain.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
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

    @Column
    private String projectHashKey;

    @Column
    private String projectVisibility;

    @Column
    private String commonUri;

    @Column
    private Long hashId;
}
