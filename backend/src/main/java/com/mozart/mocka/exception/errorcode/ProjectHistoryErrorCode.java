package com.mozart.mocka.exception.errorcode;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectHistoryErrorCode {
    NotMemberOfProject(403,"당신은 해당 프로젝트의 멤버가 아닙니다."),
    NotAvailableAuthority(403,"해당 행위에 대한 권한이 없습니다."),
    ;

    private final int code;
    private final String description;
}
