package com.mozart.mocka.service;

import com.mozart.mocka.domain.Members;
import com.mozart.mocka.dto.response.LoginResponseDto;
import com.mozart.mocka.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RefreshService {

    private final StringRedisTemplate redisTemplate;
    private final MembersRepository membersRepository;

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
