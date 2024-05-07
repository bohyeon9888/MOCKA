package com.mozart.mocka.service;

import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.MethodErrorCode;
import com.mozart.mocka.repository.ApiPathRepository;
import com.mozart.mocka.repository.ApiProjectRepository;
import com.mozart.mocka.repository.ApiRequestRepository;
import com.mozart.mocka.repository.ApiResponseRepository;
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
    public void methodDuplicationCheck(Long projectId,ApiCreateRequestDto dto){
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
}
