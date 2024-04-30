package com.mozart.mocka.dto;

import lombok.Data;

@Data
public class RequestApiDto {
    String key;
    String type;
    boolean arrayList;
    Object value;
}
