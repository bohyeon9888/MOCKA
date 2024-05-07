package com.mozart.mocka.service;

import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.domain.Projects;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.MethodErrorCode;
import com.mozart.mocka.exception.errorcode.ProjectErrorCode;
import com.mozart.mocka.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static com.mozart.mocka.service.ApiService.replacePathUri;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final ApiProjectRepository apiProjectRepository;
    private final ProjectRepository projectRepository;
    public void createCheck(Long projectId,ApiCreateRequestDto dto){
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

    public void deleteCheck(Long projectId,Long apiId){
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
}
