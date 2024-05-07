package com.mozart.mocka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectsListResponseDto {
    Long projectId;
    String projectName;
    String projectRole;
    String projectHashKey;
    String commonUri;
}
