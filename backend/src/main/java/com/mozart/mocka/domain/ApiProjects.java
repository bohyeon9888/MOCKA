//package com.mozart.mocka.domain;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.Type;
//
//@Entity
//@Data
//public class ApiProjects {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long apiId;
//
//    @Column(nullable = false)
//    private Long projectId;
//
//    @Column(nullable = false)
//    private String apiMethod;
//
//    @Type(type = "com.mozart.mocka.domain.base.PostgreSQLLTreeType") // ltree 타입을 사용하기 위한 설정 org.hibernate.type.TextType
//    @Column(nullable = false)
//    private String apiUri;
//}
