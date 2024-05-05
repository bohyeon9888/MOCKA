package com.mozart.mocka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvitationResponseDto {
    int invite;
    Long projectId;
    String projectName;
}
