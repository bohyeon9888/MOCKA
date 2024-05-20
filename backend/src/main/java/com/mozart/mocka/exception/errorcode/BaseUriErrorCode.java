package com.mozart.mocka.exception.errorcode;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BaseUriErrorCode {
    AlreadyExist(403,"이 프로젝트에 대한 base uri는 이미 존재하는 base uri 입니다."),
    NotExist(404,"해당 base uri는 삭제되었거나 존재하지 않는 base uri 입니다."),
    AlreadyDeleted(403,"해당 base uri는 이미 삭제되었던 base uri입니다.")
    ;
    private final int code;
    private final String description;
}
