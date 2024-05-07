package com.mozart.mocka.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMemberDto {
    Long memberId;
    String email;
    String profile;
    String role;
}
