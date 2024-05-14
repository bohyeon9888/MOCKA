package com.mozart.mocka.service;

import com.mozart.mocka.domain.*;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.dto.request.BaseUriRequestDto;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.*;
import com.mozart.mocka.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

import static com.mozart.mocka.service.ApiService.replacePathUri;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final ApiProjectRepository apiProjectRepository;
    private final ProjectRepository projectRepository;
    private final BaseUriRepository baseUriRepository;
    private final ProjectHistoryRepository projectHistoryRepository;
    private final ProjectHistoryService historyService;
    private final GroupRepository groupRepository;
    private final MembersRepository membersRepository;

    public void methodCreateCheck(Long projectId,ApiCreateRequestDto dto){
        //존재하는 것이 하나라도 찾아지면 throw
        String apiUri = dto.getApiUri();
        int questionMarkIndex = apiUri.indexOf('?');
        if (questionMarkIndex != -1) {
            apiUri = apiUri.substring(0, questionMarkIndex);
        }
        apiUri = replacePathUri(apiUri).replace('/', '.');

        if (apiUri.length() >1 && '.' == apiUri.charAt(0)) {
            apiUri = apiUri.substring(1);
        }
        if (apiUri.length() >1 && '.' == apiUri.charAt(apiUri.length() - 1)) {
            apiUri = apiUri.substring(0, apiUri.length() - 1);
        }
        System.out.println(apiProjectRepository.selectCountMatchApiUriAndMethod(apiUri,dto.getApiMethod(),projectId));
        if (apiProjectRepository.selectCountMatchApiUriAndMethod(apiUri,dto.getApiMethod(),projectId)>=1){
            throw new CustomException(MethodErrorCode.AlreadyExist.getCode(),MethodErrorCode.AlreadyExist.getDescription());
        }
    }

    public void methodDeleteCheck(Long projectId,Long apiId){
        Projects project=projectRepository.findByProjectId(projectId);
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        int apiProjectsCount=apiProjectRepository.selectCountMatchApiId(apiId,projectId);
        System.out.println(apiProjectsCount);
        if (apiProjectsCount==0){
            throw new CustomException(MethodErrorCode.NotExist.getCode(), MethodErrorCode.NotExist.getDescription());
        }
    }
    public void baseUriCreateCheck(Long projectId, BaseUriRequestDto baseUriRequestDto){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        //해당 프로젝트에 대한 같은 uri가 이미 존재합니다.
        int baseUriCount=baseUriRepository.selectCountMatchUri(projectId,baseUriRequestDto.getBaseUri());
        if (baseUriCount>=1){
            throw new CustomException(BaseUriErrorCode.AlreadyExist.getCode(), BaseUriErrorCode.AlreadyExist.getDescription());
        }

        //softDelete적용시
        //1.삭제상태 상관없이 ProjectId와 Uri가 일치하는 row 조회
        //1-1 존재하지 않는다면 정상생성
        //1-2 존재하지만 삭제된 상태라면 복구경고 예외처리
        //1-3 존재한다면 존재 예외처리
    }

    public void baseUriUpdateCheck(Long projectId,Long baseUriId, BaseUriRequestDto baseUriRequestDto){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }

        BaseUris baseUri=baseUriRepository.findByBaseId(baseUriId);
        //baseId가 존재하지 않습니다.
        if(baseUri==null){
            throw new CustomException(BaseUriErrorCode.NotExist.getCode(), BaseUriErrorCode.NotExist.getDescription());
        }

        //softDelete적용시
        //1.삭제상태 상관없이 BaseId가 일치하는 BaseUris 조회
        //1-1 존재하지 않는다면 미존재 예외처리
        //1-2 존재하지만 삭제된 상태라면 삭제된 상태 예외처리
        //1-2 존재한다면 정상수정
        //2.삭제상태 상관없이 ProjectId와 Uri가 일치하는 row 조회
        //2-1 존재하지 않는다면 정상생성
        //2-2 존재하지만 삭제된 상태라면 복구경고 예외처리
        //2-3 존재한다면 존재 예외처리

        int baseUriCount=baseUriRepository.selectCountMatchUri(projectId,baseUriRequestDto.getBaseUri());
        ////해당 프로젝트에 대한 같은 uri가 이미 존재합니다.
        if (baseUriCount>=1){
            throw new CustomException(BaseUriErrorCode.AlreadyExist.getCode(), BaseUriErrorCode.AlreadyExist.getDescription());
        }
    }

    public void baseUriDeleteCheck(Long projectId,Long baseUriId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }

        BaseUris baseUri=baseUriRepository.findByBaseId(baseUriId);
        //baseId가 존재하지 않습니다.
        if(baseUri==null){
            throw new CustomException(BaseUriErrorCode.NotExist.getCode(), BaseUriErrorCode.NotExist.getDescription());
        }

        //1.삭제상태 상관없이 ProjectId와 Uri가 일치하는 row 조회
        //2-1 존재하지 않는다면 미존재 예외처리
        //2-2 존재하지만 삭제된 상태라면 삭제상태 예외처리
        //2-3 존재한다면 정상삭제
    }

    public void baseUriReadCheck(Long projectId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
    }

    public void methodUpdateCheck(Long projectId, Long apiId, ApiCreateRequestDto dto) {
        //존재하는 것이 하나라도 찾아지면 throw
        String apiUri = dto.getApiUri();
        int questionMarkIndex = apiUri.indexOf('?');
        if (questionMarkIndex != -1) {
            apiUri = apiUri.substring(0, questionMarkIndex);
        }
        apiUri = replacePathUri(apiUri).replace('/', '.');

        if ('.' == apiUri.charAt(0)) {
            apiUri = apiUri.substring(1);
        }

        if ('.' == apiUri.charAt(apiUri.length() - 1)) {
            apiUri = apiUri.substring(0, apiUri.length() - 1);
        }
//        System.out.println(apiProjectRepository.selectCountMatchApiUriAndMethod(apiUri,dto.getApiMethod(),projectId));
        if (apiProjectRepository.selectCountMatchApiUriAndMethodExceptSelf(apiUri,dto.getApiMethod(),projectId, apiId)>=1){
            throw new CustomException(MethodErrorCode.AlreadyExist.getCode(),MethodErrorCode.AlreadyExist.getDescription());
        }

    }
    public void groupCreateCheck(Long projectId,String providerId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        Members member=membersRepository.findByMemberProviderId(providerId);
        ProjectHistoryPK pk = ProjectHistoryPK.builder()
                .memberId(member.getMemberId())
                .projectId(projectId)
                .build();
        ProjectHistories projectHistories=projectHistoryRepository.findByProjectHistoryPK(pk);
        if (projectHistories==null){
            throw new CustomException(ProjectHistoryErrorCode.NotMemberOfProject.getCode(),ProjectHistoryErrorCode.NotMemberOfProject.getDescription());
        }
        String projectRole=projectHistories.getProjectRole();
        if (!projectRole.equals("OWNER") && !projectRole.equals("EDITOR"))
            throw new CustomException(ProjectHistoryErrorCode.NotAvailableAuthority.getCode(), ProjectHistoryErrorCode.NotAvailableAuthority.getDescription());
    }
    public void groupListReadCheck(String providerId,Long projectId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        Members member=membersRepository.findByMemberProviderId(providerId);
        //프로젝트의 소유자가 아닙니다
        if (!historyService.checkAuthority(member.getMemberId(), projectId)) {
            throw new CustomException(GroupErrorCode.MemberNotMatch.getCode(),GroupErrorCode.MemberNotMatch.getDescription());
        }
    }
    public void groupReadCheck(Long projectId,String providerId,Long groupId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        //프로젝트의 소유자가 아닙니다.
        Members member=membersRepository.findByMemberProviderId(providerId);
        if (!historyService.checkAuthority(member.getMemberId(), projectId)) {
            throw new CustomException(GroupErrorCode.MemberNotMatch.getCode(),GroupErrorCode.MemberNotMatch.getDescription());
        }

        //해당 그룹이 존재하지 않습니다.
        Groups group=groupRepository.findByGroupId(groupId);
        if(group==null){
            throw new CustomException(GroupErrorCode.NotFoundGroup.getCode(),GroupErrorCode.NotFoundGroup.getDescription());
        }

    }

    public void groupDeleteCheck(String providerId,Long projectId,Long groupId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        Members member=membersRepository.findByMemberProviderId(providerId);
        ProjectHistoryPK pk = ProjectHistoryPK.builder()
                .memberId(member.getMemberId())
                .projectId(projectId)
                .build();
        ProjectHistories projectHistories=projectHistoryRepository.findByProjectHistoryPK(pk);
        if (projectHistories==null){
            throw new CustomException(ProjectHistoryErrorCode.NotMemberOfProject.getCode(),ProjectHistoryErrorCode.NotMemberOfProject.getDescription());
        }
        String projectRole=projectHistories.getProjectRole();
        if (!projectRole.equals("OWNER") && !projectRole.equals("EDITOR"))
            throw new CustomException(ProjectHistoryErrorCode.NotAvailableAuthority.getCode(), ProjectHistoryErrorCode.NotAvailableAuthority.getDescription());

        //해당 그룹이 존재하지 않습니다.
        Groups group=groupRepository.findByGroupId(groupId);
        if(group==null){
            throw new CustomException(GroupErrorCode.NotFoundGroup.getCode(),GroupErrorCode.NotFoundGroup.getDescription());
        }

        if(! Objects.equals(group.getProject().getProjectId(), projectId)) {
            throw new CustomException(GroupErrorCode.ProjectNotMatch.getCode(),GroupErrorCode.ProjectNotMatch.getDescription());
        }
    }
    public void groupUpdateCheck(String providerId,Long projectId,Long groupId){
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        Members member=membersRepository.findByMemberProviderId(providerId);
        ProjectHistoryPK pk = ProjectHistoryPK.builder()
                .memberId(member.getMemberId())
                .projectId(projectId)
                .build();
        ProjectHistories projectHistories=projectHistoryRepository.findByProjectHistoryPK(pk);
        if (projectHistories==null){
            throw new CustomException(ProjectHistoryErrorCode.NotMemberOfProject.getCode(),ProjectHistoryErrorCode.NotMemberOfProject.getDescription());
        }
        String projectRole=projectHistories.getProjectRole();
        if (!projectRole.equals("OWNER") && !projectRole.equals("EDITOR"))
            throw new CustomException(ProjectHistoryErrorCode.NotAvailableAuthority.getCode(), ProjectHistoryErrorCode.NotAvailableAuthority.getDescription());

        //해당 그룹이 존재하지 않습니다.
        Groups group=groupRepository.findByGroupId(groupId);
        if(group==null){
            throw new CustomException(GroupErrorCode.NotFoundGroup.getCode(),GroupErrorCode.NotFoundGroup.getDescription());
        }

        if(! Objects.equals(group.getProject().getProjectId(), projectId)) {
            throw new CustomException(GroupErrorCode.ProjectNotMatch.getCode(),GroupErrorCode.ProjectNotMatch.getDescription());
        }
    }

    public void methodReadCheck(String providerID,Long projectId, Long apiId) {
        Projects project=projectRepository.findByProjectId(projectId);
        //프로젝트가 존재하지 않습니다.
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }

        //프로젝트의 일원이 아닙니다.
        Members member=membersRepository.findByMemberProviderId(providerID);
        ProjectHistoryPK pk = ProjectHistoryPK.builder()
                .memberId(member.getMemberId())
                .projectId(projectId)
                .build();
        ProjectHistories projectHistories=projectHistoryRepository.findByProjectHistoryPK(pk);
        if (projectHistories==null){
            throw new CustomException(ProjectHistoryErrorCode.NotMemberOfProject.getCode(),ProjectHistoryErrorCode.NotMemberOfProject.getDescription());
        }

        int apiProjectsCount=apiProjectRepository.selectCountMatchApiId(apiId,projectId);
        if (apiProjectsCount==0){
            throw new CustomException(MethodErrorCode.NotExist.getCode(), MethodErrorCode.NotExist.getDescription());
        }
    }
}
