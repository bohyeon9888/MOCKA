package com.mozart.mocka.service;


import com.mozart.mocka.domain.BaseUris;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.BaseUriErrorCode;
import com.mozart.mocka.repository.BaseUriRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BaseUrlService {
    private final BaseUriRepository baseUriRepository;

    public void createBaseUri(Long projectId,String baseUri) {
        //baseuri 복구기능이 생긴하다면 추후에 로직 분리
        BaseUris deletedBaseUri=baseUriRepository.findByUriDeleted(projectId, baseUri);
        System.out.println(deletedBaseUri);
        if (deletedBaseUri!=null){
            System.out.println("update!");
            baseUriRepository.setActivateBaseUri(projectId,baseUri);
        }else{
            BaseUris newBaseUri=BaseUris.builder().projectId(projectId).uri(baseUri).build();
            baseUriRepository.save(newBaseUri);
        }
    }

    public void updateBaseUri(Long baseUriId,String baseUri) {
        BaseUris baseUrl=baseUriRepository.findByBaseId(baseUriId);
        baseUrl.setUri(baseUri);
        baseUriRepository.save(baseUrl);
    }
    public void deleteBaseUri(Long baseUriId) {
        baseUriRepository.deleteById(baseUriId);
    }
}
