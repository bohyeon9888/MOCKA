package com.mozart.mocka.dto.response;

import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.domain.Groups;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GroupResponseDto {
    private String groupName;
    private String groupUri;

    public static GroupResponseDto groupResponseDto_from_domain(Groups group){
        return GroupResponseDto.builder().groupName(group.getGroupName())
                .groupUri(group.getGroupUri())
                .build();
    }
}
