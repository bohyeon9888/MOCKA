package com.mozart.mocka.jwt;

import com.mozart.mocka.domain.CustomUserDetails;
import com.mozart.mocka.domain.Members;
import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.JwtErrorCode;
import com.mozart.mocka.repository.MembersRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;


@Slf4j
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    public static final String AUTHORIZATION_HEADER="Authorization";
    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.debug("class:==================doFilterInternal=====================");
//        String authorization = request.getHeader("Authorization");
//
//        //Authorization 헤더 검증
//        if (authorization == null || !authorization.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            //조건이 해당되면 메소드 종료 (필수)
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        }

        Optional<String> accessToken=resolveToken(request);
        System.out.println(accessToken.isPresent());
        if (accessToken.isPresent()){
            log.debug("ACCESSTOKEN VALID CHECK");
            try {
                jwtUtil.checkToken(accessToken.get());
                log.debug("ACCESSTOKEN 유효함");

                String name = jwtUtil.getUsername(accessToken.get());
                String role = jwtUtil.getRole(accessToken.get());
                String profile = jwtUtil.getProfile(accessToken.get());
                String providerId = jwtUtil.getProviderId(accessToken.get());

                //userEntity를 생성하여 값 set
                Members userEntity = Members.builder()
                        .memberNickname(name)
                        .memberProfile(profile)
                        .memberProviderId(providerId)
                        .memberRole(role)
                        .build();

                log.debug("Member from token:  "+userEntity);

                CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);
                Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                SecurityContextHolder.clearContext();
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }catch(CustomException ce) {
                log.debug("JWT가 유효하지 않음");
                log.debug(ce.getMsg());
                request.setAttribute("exception", ce);
            }
        }else{
            log.debug("Authorization 헤더가 비어있음");
            request.setAttribute("exception",
                    new CustomException(JwtErrorCode.IllegalArgumentException.getCode(), JwtErrorCode.IllegalArgumentException.getDescription()));
        }

        filterChain.doFilter(request, response);
    }
    private Optional<String> resolveToken(HttpServletRequest request){
        String authToken=request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(authToken) && authToken.startsWith("Bearer ")) {
            return Optional.of(authToken.replace("Bearer ",""));
        }else {
            authToken=request.getParameter(AUTHORIZATION_HEADER);
            if(StringUtils.hasText(authToken) && authToken.startsWith("Bearer ")) {
                return Optional.of(authToken);
            }
        }
        return Optional.empty();
    }

}
