package com.mozart.mocka.dto.request;

import lombok.Getter;

@Getter
public class ProjectAuthRequestDto {
    Long projectId;
    Long memberId;
    String projectRole;
}
