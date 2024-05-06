package com.mozart.mocka.dto.request;

import com.mozart.mocka.dto.TeamMemberDto;
import lombok.Getter;

import java.util.List;

@Getter
public class InviteRequestDto {
    Long projectId;
    List<TeamMemberDto> teamMember;
}
