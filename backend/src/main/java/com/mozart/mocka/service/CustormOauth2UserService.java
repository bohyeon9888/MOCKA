package com.mozart.mocka.service;

import com.mozart.mocka.dto.CustomOauth2User;
import com.mozart.mocka.dto.response.GoogleResponseDto;
import com.mozart.mocka.dto.response.Oauth2ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustormOauth2UserService extends DefaultOAuth2UserService {

    private final OatuhService oatuhService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attribute = oAuth2User.getAttributes();
        System.out.println(attribute);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Oauth2ResponseDto oAuth2Response = null;

        if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponseDto(attribute);

        } else { return null; }

        oatuhService.saveUser(oAuth2Response);

        String role = "ROLE_USER";


        // Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                new CustomOauth2User(oAuth2Response, role), null, Collections.singletonList(new SimpleGrantedAuthority(role))
        );

        // SecurityContext에 Authentication 객체 저장
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        return new CustomOauth2User(oAuth2Response, role);
    }
}
