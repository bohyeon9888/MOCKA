package com.mozart.mocka.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mocka.domain.ApiProjects;
import com.mozart.mocka.dto.ApiDto;
import com.mozart.mocka.dto.PathVariableDto;
import com.mozart.mocka.dto.RequestApiDto;
import com.mozart.mocka.dto.request.ApiCreateRequestDto;
import com.mozart.mocka.repository.ApiPathRepository;
import com.mozart.mocka.repository.ApiProjectRepository;
import com.mozart.mocka.repository.ApiRequestRepository;
import com.mozart.mocka.repository.ApiResponseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ApiService {
    private final ApiProjectRepository apiProjectRepository;
    private final ApiPathRepository apiPathRepository;
    private final ApiRequestRepository apiRequestRepository;
    private final ApiResponseRepository apiResponseRepository;
    public void createApi(Long projectId, ApiCreateRequestDto dto) throws JsonProcessingException {
        //api create
        ApiProjects apiProject = insertApiProject(projectId,dto.getApiMethod(),dto.getApiUri(), dto.isApiResponseIsArray(), dto.getApiResponseSize());
        for (PathVariableDto path : dto.getApiPathVariable()) {
            //uri contain check
            if(!dto.getApiUri().contains(path.getKey()))
                return;
            apiPathRepository.create(apiProject.getApiId(), path.getKey(), path.getType());
        }

        ObjectMapper mapper = new ObjectMapper();
        for (RequestApiDto path : dto.getApiRequest()) {
            System.out.println("request///" + path.isArrayList());
            apiRequestRepository.create(apiProject.getApiId(), path.getKey(),path.getType(),path.isArrayList(), mapper.writeValueAsString(path.getValue()) );
        }
        for (ApiDto path : dto.getApiResponse()) {
            System.out.println("response///" + path.isArrayList());
            apiResponseRepository.create(apiProject.getApiId(), path.getKey(), path.getType(), mapper.writeValueAsString(path.getValue()), path.getFakerLocale(), path.getFakerMajor(), path.getFakerSub(),path.isArrayList(), path.getArraySize());
        }
    }

    public ApiProjects insertApiProject(Long projectId, String apiMethod, String apiUri, boolean apiResponseIsArray, int apiResponseSize) {
        String apiUriStr = apiUri;
        apiUri = apiUri.replace('/','.').split("\\{")[0];

        if('.' == apiUri.charAt(0) )
            apiUri = apiUri.substring(1);

        if('.' == apiUri.charAt(apiUri.length()-1) )
            apiUri = apiUri.substring(0,apiUri.length()-1);
        System.out.println(apiUri);
        int id = apiProjectRepository.createApi(projectId, apiMethod, apiUri, apiUriStr, apiResponseIsArray, apiResponseSize);
        return apiProjectRepository.findById((long) id).orElse(null);
    }

    public void deleteApi(Long projectId, Long apiId) {
        apiPathRepository.deleteByApiProject_ApiId(apiId);
        apiRequestRepository.deleteByApiProject_ApiId(apiId);
        apiResponseRepository.deleteByApiProject_ApiId(apiId);
        apiProjectRepository.deleteByApiId(apiId);
    }
}
