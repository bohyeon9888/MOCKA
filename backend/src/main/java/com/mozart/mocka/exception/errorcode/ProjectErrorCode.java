package com.mozart.mocka.exception.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectErrorCode {
    NotExist(404,"해당 프로젝트는 존재하지 않는 프로젝트 입니다.")
    ;

    private final int code;
    private final String description;
}
