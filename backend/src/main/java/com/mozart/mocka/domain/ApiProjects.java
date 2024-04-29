package com.mozart.mocka.domain;

import com.mozart.mocka.util.LTreeConverter;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiProjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apiId;

    @Column(nullable = false)
    private Long projectId;

    @Column(nullable = false)
    private String apiMethod;

//    @Type(type = "com.mozart.mocka.domain.base.PostgreSQLLTreeType") // ltree 타입을 사용하기 위한 설정 org.hibernate.type.TextType
    @Column(nullable = false, columnDefinition = "ltree")
    @Convert(converter = LTreeConverter.class)
    private String apiUri;

    @Column
    private String apiUriStr;

    @Column
    private boolean apiResponseIsArray;

    @Column
    private int apiResponseSize;

    public ApiProjects(Long projectId, String apiMethod, String apiUri, boolean isArray, int arraySize) {
        this.projectId = projectId;
        this.apiMethod = apiMethod;
        this.apiUri = apiUri;
        this.apiResponseIsArray = isArray;
        this.apiResponseSize = arraySize;
    }
}
