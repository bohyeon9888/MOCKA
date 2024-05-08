package com.mozart.mockserver.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class RequestApiDto {
    String key;
    String type;
    @JsonDeserialize(using = CustomValueDeserializer.class)
    String value;
    String fakerSub;
    boolean arrayList;
    int arraySize;
    String fakerMajor;
    String fakerLocale;

    @JsonCreator
    public RequestApiDto(@JsonProperty("key") String key,
                         @JsonProperty("type") String type,
                         @JsonProperty("value") Object value,
                         @JsonProperty("fakerSub") String fakerSub,
                         @JsonProperty("arrayList") boolean arrayList,
                         @JsonProperty("arraySize") int arraySize,
                         @JsonProperty("fakerMajor") String fakerMajor,
                         @JsonProperty("fakerLocale") String fakerLocale) {
        this.key = key;
        this.type = type;
        this.value = (String) value;
        this.fakerSub = fakerSub;
        this.arrayList = arrayList;
        this.arraySize = arraySize;
        this.fakerMajor = fakerMajor;
        this.fakerLocale = fakerLocale;
    }
}
