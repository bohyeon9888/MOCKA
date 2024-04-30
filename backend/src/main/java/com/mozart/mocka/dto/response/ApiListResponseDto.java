package com.mozart.mocka.dto.response;

import com.mozart.mocka.dto.ApiDto;
import com.mozart.mocka.dto.PathVariableDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ApiListResponseDto {
    String apiMethod;
    String apiUri;
    List<PathVariableDto> apiPathVariable;
    List<ApiDto> apiRequest;
    boolean apiResponseIsArray;
    int apiResponseSize;
    List<ApiDto> apiResponse;
}
