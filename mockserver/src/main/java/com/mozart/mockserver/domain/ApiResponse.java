package com.mozart.mockserver.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean arrayList;

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

    public ApiResponse(ApiProjects apiProject, String key, String type, Object data, String fakerLocale, String fakerMajor, String fakerSub, boolean array, int arraySize) {
        this.apiProject = apiProject;
        this.key = key;
        this.type = type;

        this.fakerLocale = fakerLocale;
        this.fakerMajor = fakerMajor;
        this.fakerSub = fakerSub;
        this.arrayList = array;
        this.arraySize = arraySize;
        if(data == null){
            this.data = null;
        }
        else {
            this.data = data.toString();
        }
    }
}