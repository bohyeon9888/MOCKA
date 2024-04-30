package com.mozart.mocka.dto;

import com.mozart.mocka.dto.response.Oauth2ResponseDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOauth2User implements OAuth2User {

    private final Oauth2ResponseDto oAuth2Response;
    private final String role;

    public CustomOauth2User(Oauth2ResponseDto oAuth2Response, String role) {
        this.oAuth2Response = oAuth2Response;
        this.role = role;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return role;
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return oAuth2Response.getName();
    }

    public String getMemberNickname() {
        return oAuth2Response.getName();
    }

    public String getEmail() {
        return oAuth2Response.getEmail();
    }

    public String getMemberProfile() {
        return oAuth2Response.getProfileImg();
    }
}
