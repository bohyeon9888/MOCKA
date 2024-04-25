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
public class HashKeys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long hashId;

    @Column
    private String hashKey;

    @Column
    private boolean used;

}
