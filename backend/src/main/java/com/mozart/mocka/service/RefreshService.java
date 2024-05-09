package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.dto.OauthDto;
import com.mozart.mocka.dto.response.LoginResponseDto;
import com.mozart.mocka.jwt.JWTUtil;
import com.mozart.mocka.repository.MembersRepository;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RefreshService {

    private final StringRedisTemplate redisTemplate;
    private final MembersRepository membersRepository;
    private final JWTUtil jwtUtil;

    @Transactional
    public void storeRefreshToken(String providerId, String refresh, long duration) {
        redisTemplate.opsForValue().set(
                providerId,
                refresh,
                duration,
                TimeUnit.MILLISECONDS
        );
    }

    // 리팩토링!!!
    public OauthDto createAccessToken(String providerId) {
        Members member = membersRepository.findByMemberProviderId(providerId);
        String username = member.getMemberNickname();

        String newAccess = jwtUtil.createJwt("access", member.getMemberProviderId(), username, member.getMemberProfile(), member.getMemberRole(), 43200000L);
        String newRefresh = jwtUtil.createJwt("refresh", member.getMemberProviderId(), username, member.getMemberProfile(), member.getMemberRole(), 604800000L);

        LoginResponseDto loginDto =  LoginResponseDto.builder()
                .nickname(username)
                .profile(member.getMemberProfile())
                .accessToken(newAccess)
                .build();

        return OauthDto.builder()
                .refresh(newRefresh)
                .loginResponseDto(loginDto)
                .build();
    }

    public Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(7*24*60*60);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);

        return cookie;
    }

    public String getRefreshToken(String providerId) {
        return redisTemplate.opsForValue().get(providerId);
    }

    @Transactional
    public void deleteRefreshToken(String providerId) {
        redisTemplate.delete(providerId);
    }
}
