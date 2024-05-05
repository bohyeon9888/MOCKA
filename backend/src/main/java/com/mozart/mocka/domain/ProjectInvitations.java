package com.mozart.mocka.domain;

import com.mozart.mocka.domain.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE ProjectInvatations SET is_deleted = TRUE WHERE member_id = ?")
public class ProjectInvitations extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_invitations_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Members members;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Projects projects;

    @Column
    private Boolean accepted;

    @Column(name = "project_role")
    private String projectRole;
}
