package com.mozart.mocka.exception.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JwtErrorCode {
    InvaldJwtSignature(400,"jwt가 손상되었습니다."),
    ExpiredJwt(400,"jwt가 만료되었습니다."),
    UnsupportedJwt(400,"지원하지 않는 jwt입니다."),
    IllegalArgumentException(400,"jwt가 비어있습니다."),
    JwtReqired(400,"jwt가 필요합니다."),
    NotFoundRequiredJwtProperty(400,"jwt에 필수 내용이 없습니다.")
    ;

    private final int code;
    private final String description;
}
