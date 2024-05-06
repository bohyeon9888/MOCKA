package com.mozart.mocka.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final StringRedisTemplate redisTemplate;

    @Transactional
    public void storeRefreshToken(String username, String refresh, long duration) {
        redisTemplate.opsForValue().set(
                username,
                refresh,
                duration,
                TimeUnit.MILLISECONDS
        );
    }

    public String getRefreshToken(String username) {
        return redisTemplate.opsForValue().get(username);
    }

    @Transactional
    public void deleteRefreshToken(String username) {
        redisTemplate.delete(username);
    }
}
