package com.mozart.mockserver.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "boolean default false")
    private Boolean arrayList;

    @Column
    private String key;

    @Column
    private String type;

    @Column
    private String fakerLocale;

    @Column
    private String fakerMajor;

    @Column
    private String fakerSub;

    @ManyToOne
    @JoinColumn(name = "api_id", nullable = false)
    @JsonIgnore
    private ApiProjects apiProject;

    @Column(columnDefinition = "jsonb")
    private String data; // JSONB 데이터를 저장

    public ApiRequest(ApiProjects apiProject, String key, String type, Object data) {
        this.apiProject = apiProject;
        this.key = key;
        this.type = type;
        this.data = (String) data;
    }

}
