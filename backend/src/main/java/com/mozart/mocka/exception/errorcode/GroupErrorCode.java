package com.mozart.mocka.exception.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GroupErrorCode {
    MemberNotMatch(403,"해당 그룹은 당신의 소유가 아닙니다."),
    NotFoundGroup(404,"해당 그룹은 존재하지 않습니다.")
    ;

    private final int code;
    private final String description;
}
