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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ApiService {

    private final ApiProjectRepository apiProjectRepository;
    private final ApiPathRepository apiPathRepository;
    private final ApiRequestRepository apiRequestRepository;
    private final ApiResponseRepository apiResponseRepository;

    public void createApi(Long projectId, ApiCreateRequestDto dto) throws JsonProcessingException {
        //api create
        ApiProjects apiProject = insertApiProject(projectId, dto.getApiMethod(), dto.getApiUri(),
            dto.isApiResponseIsArray(), dto.getApiResponseSize());
        for (PathVariableDto path : dto.getApiPathVariable()) {
            //uri contain check
            if (!dto.getApiUri().contains(path.getKey())) {
                return;
            }
            apiPathRepository.create(apiProject.getApiId(), path.getKey(), path.getType());
        }

        ObjectMapper mapper = new ObjectMapper();
        for (RequestApiDto path : dto.getApiRequest()) {
            log.info("request : " +path.getKey() + "/" + path.isArrayList());
            apiRequestRepository.create(apiProject.getApiId(), path.getKey(), path.getType(),
                mapper.writeValueAsString(path.getValue()), path.getFakerLocale(),
                path.getFakerMajor(), path.getFakerSub(), path.isArrayList());
        }
        for (ApiDto path : dto.getApiResponse()) {
            log.info("response : " + path.isArrayList());
            apiResponseRepository.create(apiProject.getApiId(), path.getKey(), path.getType(),
                mapper.writeValueAsString(path.getValue()), path.getFakerLocale(),
                path.getFakerMajor(), path.getFakerSub(), path.isArrayList(), path.getArraySize());
        }
    }

    public ApiProjects insertApiProject(Long projectId, String apiMethod, String apiUri,
        boolean apiResponseIsArray, int apiResponseSize) {
        String apiUriStr = apiUri;
        int questionMarkIndex = apiUriStr.indexOf('?');
        if (questionMarkIndex != -1) {
            apiUri = apiUri.substring(0, questionMarkIndex);
        }
        apiUri = replacePathUri(apiUri).replace('/', '.');
        int queryIndex = apiUri.indexOf('?');
        if (queryIndex != -1) {
            apiUri = apiUri.substring(0, queryIndex);
        }

        if ('.' == apiUri.charAt(0)) {
            apiUri = apiUri.substring(1);
        }

        if ('.' == apiUri.charAt(apiUri.length() - 1)) {
            apiUri = apiUri.substring(0, apiUri.length() - 1);
        }
        log.info(apiUri);
        int id = apiProjectRepository.createApi(projectId, apiMethod, apiUri, apiUriStr,
            apiResponseIsArray, apiResponseSize);
        return apiProjectRepository.findById((long) id).orElse(null);
    }

    public void deleteApi(Long projectId, Long apiId) {
        apiPathRepository.deleteByApiProject_ApiId(apiId);
        apiRequestRepository.deleteByApiProject_ApiId(apiId);
        apiResponseRepository.deleteByApiProject_ApiId(apiId);
        apiProjectRepository.deleteByApiId(apiId);
    }

    public static String replacePathUri(String uri) {
        if (!uri.contains("{")) {
            return uri;
        }

        for (int i = 0; i < uri.length(); i++) {
            if (uri.charAt(i) != '{') {
                continue;
            }

            for (int j = 0; i + j < uri.length(); j++) {
                if (uri.charAt(i + j) != '}') {
                    continue;
                }

                String hash = "34e1c029fab";
                uri = uri.substring(0, i) + hash + uri.substring(i + j + 1);
                break;
            }
        }
        log.info("uri : " + uri);
        return uri;
    }
}
