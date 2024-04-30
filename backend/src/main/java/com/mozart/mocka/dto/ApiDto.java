package com.mozart.mocka.dto;

import lombok.Data;

@Data
public class ApiDto {
    String key;
    String type;
    boolean arrayList;
    int arraySize;
    String fakerLocale;
    String fakerMajor;
    String fakerSub;
    Object value;
}
