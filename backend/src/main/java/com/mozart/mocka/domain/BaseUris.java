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
public class BaseUris {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long baseId;

    @Column
    private Long projectId;

    @Column
    private String uri;

}
