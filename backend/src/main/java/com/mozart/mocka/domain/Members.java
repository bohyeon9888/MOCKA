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
@SQLDelete(sql = "UPDATE Members SET is_deleted = TRUE WHERE member_id = ?")
public class Members extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long memberId;

    @Column
    private String memberEmail;

    @Column
    private String memberNickname;

    @Column
    private String memberProfile;
}
