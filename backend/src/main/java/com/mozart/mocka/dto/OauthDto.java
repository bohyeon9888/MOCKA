package com.mozart.mocka.dto;

import com.mozart.mocka.dto.response.LoginResponseDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OauthDto {
    String refresh;
    LoginResponseDto loginResponseDto;
}
