//package com.mozart.mocka.domain;
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.Type;
//
//@Entity
//@Data
//public class ApiRequest {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
////    @ManyToOne
////    @JoinColumn(name = "api_project_id", nullable = false)
////    private ApiProjects apiProject;
//
//    @Type(type = "com.vladmihalcea.hibernate.type.json.JsonBinaryType")
//    @Column(columnDefinition = "jsonb")
//    private String data; // JSONB 데이터를 저장
//}
