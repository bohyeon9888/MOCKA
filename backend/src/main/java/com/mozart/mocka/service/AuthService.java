package com.mozart.mocka.service;

import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.dto.request.BaseUriRequestDto;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.BaseUriErrorCode;
import com.mozart.mocka.exception.errorcode.MethodErrorCode;
import com.mozart.mocka.exception.errorcode.ProjectErrorCode;
import com.mozart.mocka.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.mozart.mocka.service.ApiService.replacePathUri;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final ApiProjectRepository apiProjectRepository;
    private final ProjectRepository projectRepository;
    private final BaseUriRepository baseUriRepository;
    public void methodCreateCheck(Long projectId,ApiCreateRequestDto dto){
        //존재하는 것이 하나라도 찾아지면 throw
        String apiUri = dto.getApiUri();
        apiUri = replacePathUri(apiUri).replace('/', '.');

        if ('.' == apiUri.charAt(0)) {
            apiUri = apiUri.substring(1);
        }

        if ('.' == apiUri.charAt(apiUri.length() - 1)) {
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
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        int baseUriCount=baseUriRepository.selectCountMatchUri(projectId,baseUriRequestDto.getBaseUri());
//        System.out.println(baseUriCount);
        if (baseUriCount>=1){
            throw new CustomException(BaseUriErrorCode.AlreadyExist.getCode(), BaseUriErrorCode.AlreadyExist.getDescription());
        }

    }

    public void baseUriUpdateCheck(Long projectId,Long baseUriId, BaseUriRequestDto baseUriRequestDto){
        Projects project=projectRepository.findByProjectId(projectId);
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }
        BaseUris deletedBaseUri=baseUriRepository.findByIdDeleted(projectId);

        if (deletedBaseUri != null){
            throw new CustomException(BaseUriErrorCode.AlreadyDeleted.getCode(), BaseUriErrorCode.AlreadyDeleted.getDescription());
        }

        BaseUris baseUri=baseUriRepository.findByBaseId(baseUriId);
        if(baseUri==null){
            throw new CustomException(BaseUriErrorCode.NotExist.getCode(), BaseUriErrorCode.NotExist.getDescription());
        }

        int baseUriCount=baseUriRepository.selectCountMatchUri(projectId,baseUriRequestDto.getBaseUri());
        if (baseUriCount>=1){
            throw new CustomException(BaseUriErrorCode.AlreadyExist.getCode(), BaseUriErrorCode.AlreadyExist.getDescription());
        }
    }

    public void baseUriDeleteCheck(Long projectId,Long baseUriId){
        Projects project=projectRepository.findByProjectId(projectId);
        if (project==null){
            throw new CustomException(ProjectErrorCode.NotExist.getCode(), ProjectErrorCode.NotExist.getDescription());
        }

        BaseUris deletedBaseUri=baseUriRepository.findByIdDeleted(projectId);

        if (deletedBaseUri != null){
            throw new CustomException(BaseUriErrorCode.AlreadyDeleted.getCode(), BaseUriErrorCode.AlreadyDeleted.getDescription());
        }

        BaseUris baseUri=baseUriRepository.findByBaseId(baseUriId);
        if(baseUri==null){
            throw new CustomException(BaseUriErrorCode.NotExist.getCode(), BaseUriErrorCode.NotExist.getDescription());
        }
    }
}
