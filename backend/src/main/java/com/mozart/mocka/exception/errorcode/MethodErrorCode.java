package com.mozart.mocka.exception.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@RequiredArgsConstructor
public enum MethodErrorCode {
    AlreadyExist(403,"이미 존재하는 api입니다."),
    ;
    private final int code;
    private final String description;
}
