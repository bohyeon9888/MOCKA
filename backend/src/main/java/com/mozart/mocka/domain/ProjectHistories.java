package com.mozart.mocka.domain;

import com.mozart.mocka.domain.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE project_histories SET is_deleted = TRUE WHERE history_id = ?")
public class ProjectHistories extends BaseEntity {
    @EmbeddedId
    private ProjectHistoryPK projectHistoryPK;

    @Column
    private String projectRole;

    @Column
    private LocalDateTime recentRead;

}
