package com.mozart.mocka.dto.request;

import com.mozart.mocka.dto.ApiDto;
import com.mozart.mocka.dto.PathVariableDto;
import com.mozart.mocka.dto.RequestApiDto;

import java.util.List;

public class ApiCreateRequestDto {
    String apiMethod;
    String apiUri;
    List<PathVariableDto> apiPathVariable;
    List<RequestApiDto> apiRequest;
    boolean apiResponseIsArray;
    int apiResponseSize;
    List<ApiDto> apiResponse;
}
