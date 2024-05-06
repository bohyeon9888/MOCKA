package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.dto.CustomOauth2User;
import com.mozart.mocka.dto.response.GoogleResponseDto;
import com.mozart.mocka.dto.response.LoginResponseDto;
import com.mozart.mocka.dto.response.Oauth2ResponseDto;
import com.mozart.mocka.jwt.JWTUtil;
import com.mozart.mocka.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class OatuhService {
    private final Environment env;
    private final JWTUtil jwtUtil;
    private final MembersRepository membersRepository;
    private final RefreshService refreshTokenService;

    public LoginResponseDto getAccessToken(String code, String provider) {
        System.out.println("================get access token==================");
        RestTemplate restTemplate = new RestTemplate();
        String clientId = env.getProperty("spring.security.oauth2.client.registration." + provider + ".client-id");
        log.info("client ID : " + clientId);
        String clientSecret = env.getProperty("spring.security.oauth2.client.registration." + provider + ".client-secret");
        String redirectUri = env.getProperty("spring.security.oauth2.client.registration." + provider + ".redirect-uri");
        String tokenUri = env.getProperty("spring.security.oauth2.client.provider." + provider + ".token-uri");

//        System.out.println("clientSecret : " + clientSecret);
//        System.out.println("redirectUri : " + redirectUri);
//        System.out.println("tokenUri : " + tokenUri);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUri, request, Map.class);
        Map respBody = response.getBody();
        System.out.println(respBody);
        String accessToken = (String) respBody.get("access_token");

        return getMemberResource(accessToken, provider);
    }

    public LoginResponseDto getMemberResource(String accessToken, String provider) {
        System.out.println("================get user resource==================");
        String resourceUrl = env.getProperty("spring.security.oauth2.client.provider." + provider + ".user-info-uri");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(accessToken);
        System.out.println(headers);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, Map.class);

        Map respBody = response.getBody();
        System.out.println(respBody);

        Oauth2ResponseDto oAuth2Response = new GoogleResponseDto(respBody);

        log.info(oAuth2Response.getName());
        return getMemberInfo(oAuth2Response);
    }

    public LoginResponseDto getMemberInfo(Oauth2ResponseDto oAuth2Response) {

        System.out.println("================get user info==================");
        String role = "ROLE_USER";

        createMember(oAuth2Response);
        String name = oAuth2Response.getName() + "#" + oAuth2Response.getProviderId().substring(0, 4);

        // JWT Token 생성
        String access = jwtUtil.createJwt("access", name, oAuth2Response.getProfileImg(), role, 43200000L);
        String refresh = jwtUtil.createJwt("refresh", name, oAuth2Response.getProfileImg(), role, 604800000L);

        // Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                new CustomOauth2User(oAuth2Response, role), null, Collections.singletonList(new SimpleGrantedAuthority(role))
        );

        // SecurityContext에 Authentication 객체 저장
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // refresh token 저장
        refreshTokenService.storeRefreshToken(name, refresh, 604800000L);

        return LoginResponseDto.builder()
                .nickname(oAuth2Response.getName() + "#" + oAuth2Response.getProviderId().substring(0, 4))
                .profile(oAuth2Response.getProfileImg())
                .accessToken(access)
                .refreshToken(refresh)
                .build();
    }

    public void createMember(Oauth2ResponseDto oAuth2Response) {

        String name = oAuth2Response.getName();
        String role = "ROLE_USER";
//        String userCode = env.getProperty("user.provider." + oAuth2Response.getProvider() + ".code-name");

        if (membersRepository.existsByMemberProviderId(oAuth2Response.getProviderId())) {
            fetchMember(oAuth2Response);
        } else {
            Members member = Members.builder()
                    .memberEmail(oAuth2Response.getEmail())
                    .memberNickname(name + "#" + oAuth2Response.getProviderId().substring(0, 4))
                    .memberProfile(oAuth2Response.getProfileImg())
                    .memberProviderId(oAuth2Response.getProviderId())
                    .memberRole(role).build();
            membersRepository.save(member);
            log.debug("save UserInfo");
        }

    }

    private void fetchMember(Oauth2ResponseDto oAuth2Response) {
        Members existMember = membersRepository.findByMemberProviderId(oAuth2Response.getProviderId());

        String newName = oAuth2Response.getName() + "#" + oAuth2Response.getProviderId().substring(0, 4);
        String newProfile = oAuth2Response.getProfileImg();

        if ((!newName.equals(existMember.getMemberNickname())) || (!newProfile.equals(existMember.getMemberProfile()))) {
            existMember.setMemberNickname(newName);
            existMember.setMemberProfile(newProfile);

            membersRepository.save(existMember);
            log.debug("fetch UserInfo");
        }
    }
}
