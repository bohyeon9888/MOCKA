package com.mozart.mocka.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDto {
    String nickname;
    String profile;
    String accessToken;
    String refreshToken;
}
