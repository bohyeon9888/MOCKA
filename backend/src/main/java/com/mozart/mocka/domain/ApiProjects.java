package com.mozart.mocka.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mozart.mocka.util.LTreeConverter;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

//    @Column
//    private Long groupId;

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

    @Column
    private String name;
    @Column
    private String description;

    @OneToMany(mappedBy = "apiProject")
    private List<ApiPath> apiPaths = new ArrayList<>();
    @OneToMany(mappedBy = "apiProject")
    private List<ApiRequest> apiRequests = new ArrayList<>();
    @OneToMany(mappedBy = "apiProject")
    private List<ApiResponse> apiResponses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    private Groups groups;

    public ApiProjects(Long projectId, String apiMethod, String apiUri, boolean apiResponseIsArray, int arraySize) {
        this.projectId = projectId;
        this.apiMethod = apiMethod;
        this.apiUri = apiUri;
        this.apiResponseIsArray = apiResponseIsArray;
        this.apiResponseSize = arraySize;
    }
    public String toString(){
        return apiUri+" "+apiUriStr+" "+apiMethod+" "+apiResponseIsArray+" "+apiResponseSize;
    }
}
