package com.mozart.mocka.service.generator;

import com.mozart.mocka.repository.ApiPathRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class GenRequest {
    private final ApiPathRepository apiPathRepository;
}
