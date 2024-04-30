package com.mozart.mocka.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean isArray;

    @Column
    private int arraySize;

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

    public ApiResponse(ApiProjects apiProject, String key, String type, Object value, String fakerLocale, String fakerMajor, String fakerSub, boolean array, int arraySize) {
        this.apiProject = apiProject;
        this.key = key;
        this.type = type;
        this.data = (String) value;
        this.fakerLocale = fakerLocale;
        this.fakerMajor = fakerMajor;
        this.fakerSub = fakerSub;
        this.isArray = array;
        this.arraySize = arraySize;
    }
}