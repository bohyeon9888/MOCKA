package com.mozart.mocka.dto.response;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.exception.CustomException;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BaseUriListResponseDto {
    private Long baseId;
    private String baseUri;

    public static BaseUriListResponseDto from_domain(BaseUris baseUri){
        return BaseUriListResponseDto.builder().baseId(baseUri.getBaseId()).baseUri(baseUri.getUri()).build();
    }
}
