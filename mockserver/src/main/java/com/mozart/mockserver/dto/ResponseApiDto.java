package com.mozart.mockserver.dto;

import lombok.Data;

@Data
public class ResponseApiDto {
    String key;
    String type;
    Boolean arrayList;
    int arraySize;
    String fakerLocale;
    String fakerMajor;
    String fakerSub;
    Object value;
}
