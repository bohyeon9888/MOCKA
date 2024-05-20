package com.mozart.mocka.jwt;

import com.mozart.mocka.exception.CustomException;
import com.mozart.mocka.exception.errorcode.JwtErrorCode;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private final SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public String getCategory(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public String getProviderId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("providerId", String.class);
    }

    public String getUsername(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public String getProfile(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("profile", String.class);
    }

    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String category, String providerId, String username, String profile, String role, Long expiredMs) {

        return Jwts.builder()
                .claim("category", category)
                .claim("providerId", providerId)
                .claim("username", username)
                .claim("profile", profile)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
    public void checkToken(String token) throws CustomException {
        try {
            String category = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
            if (!"access".equals(category)) {
                throw new CustomException(JwtErrorCode.NotFoundRequiredJwtProperty.getCode(), JwtErrorCode.NotFoundRequiredJwtProperty.getDescription());
            }
        } catch (SecurityException | SignatureException | MalformedJwtException e) {
            throw new CustomException(JwtErrorCode.InvaldJwtSignature.getCode(), JwtErrorCode.InvaldJwtSignature.getDescription());
        } catch (ExpiredJwtException e) {
            throw new CustomException(JwtErrorCode.ExpiredJwt.getCode(), JwtErrorCode.ExpiredJwt.getDescription());
        } catch (UnsupportedJwtException e) {
            throw new CustomException(JwtErrorCode.UnsupportedJwt.getCode(), JwtErrorCode.UnsupportedJwt.getDescription());
        } catch (IllegalArgumentException e) {
            throw new CustomException(JwtErrorCode.IllegalArgumentException.getCode(), JwtErrorCode.IllegalArgumentException.getDescription());
        }
    }
}
