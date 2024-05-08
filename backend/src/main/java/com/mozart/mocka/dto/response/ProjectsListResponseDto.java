package com.mozart.mocka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectsListResponseDto {
    long projectId;
    String projectName;
    String projectRole;
    String projectHashKey;
    String commonUri;
    LocalDateTime createdAt;
}
