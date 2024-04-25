package com.mozart.mocka.domain;

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
@SQLDelete(sql = "UPDATE Hash_keys SET is_deleted = TRUE WHERE base_id = ?")
public class ProjectHistories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long baseId;

    @Column
    private Long projectId;

    @Column
    private String uri;
}
