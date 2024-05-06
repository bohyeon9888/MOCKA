package com.mozart.mocka.dto.response;

public interface Oauth2ResponseDto {
    //제공자 (google에서 확장할 수 있으므로)
    String getProvider();

    //제공자에서 발급해주는 아이디(번호)
    String getProviderId();

    //이메일
    String getEmail();

    //사용자 nickname
    String getName();

    //사용자 프로필 사진
    String getProfileImg();
}
