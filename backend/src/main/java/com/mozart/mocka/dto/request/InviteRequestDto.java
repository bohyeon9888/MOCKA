package com.mozart.mocka.dto.request;

import com.mozart.mocka.dto.TeamMemberDto;

import java.util.List;

public class InviteRequestDto {
    Long projectId;
    List<TeamMemberDto> teamMember;
}
