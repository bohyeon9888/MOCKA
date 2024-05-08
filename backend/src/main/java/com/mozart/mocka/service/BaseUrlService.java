package com.mozart.mocka.service;


import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.BaseUriErrorCode;
import com.mozart.mocka.repository.BaseUriRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BaseUrlService {
    private final BaseUriRepository baseUriRepository;

    public void createBaseUri(Long projectId,String baseUri) {
        //softDelete 기능 적용 전에 영구삭제 방식 도입
        baseUriRepository.deleteByUriDeleted(projectId,baseUri);
        BaseUris newBaseUri=BaseUris.builder().projectId(projectId).uri(baseUri).build();
        baseUriRepository.save(newBaseUri);
    }

    public void updateBaseUri(Long baseUriId,Long projectId,String baseUri) {
        //softDelete 기능 적용 전에 영구삭제 방식 도입
        baseUriRepository.deleteByUriDeleted(projectId,baseUri);
        BaseUris baseUrl=baseUriRepository.findByBaseId(baseUriId);
        baseUrl.setUri(baseUri);
        baseUriRepository.save(baseUrl);
    }
    public void deleteBaseUri(Long baseUriId) {
        baseUriRepository.deleteById(baseUriId);
    }
    public List<BaseUris> readBaseUris(Long projectId){
        return baseUriRepository.findByProjectId(projectId);
    }
}
