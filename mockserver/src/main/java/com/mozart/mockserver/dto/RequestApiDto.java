package com.mozart.mockserver.dto;

import lombok.Data;

@Data
public class RequestApiDto {
    String key;
    String type;
    boolean arrayList;
    String fakerLocale;
    String fakerMajor;
    String fakerSub;
    String value;
}
