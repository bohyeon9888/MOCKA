package com.mozart.mocka.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProjectHistoryPK implements Serializable {
    private Long projectId;
    private Long memberId;

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if( o == null || getClass() != o.getClass()) return false;
        ProjectHistoryPK pk = (ProjectHistoryPK) o;
        return Objects.equals(projectId, pk.projectId) && Objects.equals(memberId, pk.memberId);
    }
}