package com.mozart.mockserver.util;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class LTreeConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute;  // 데이터베이스에 저장할 때 변환 로직을 추가할 수 있음
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData;  // 엔티티로 가져올 때 변환 로직을 추가할 수 있음
    }
}

