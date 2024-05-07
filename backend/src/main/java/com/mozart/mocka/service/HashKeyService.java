package com.mozart.mocka.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class HashKeyService {
    private static SecretKey key;

    @Value("${hash.key}")
    private String hashKey;

    @PostConstruct
    public void setHashKey() {
        byte[] decodedKey = Base64.getDecoder().decode(hashKey);
        key = new SecretKeySpec(decodedKey, "AES");
    }

    // Long 값을 암호화하고 Base32로 인코딩
    // URL 안전 Base64 인코딩
    public String encryptLong(Long value) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] bytes = ByteBuffer.allocate(Long.BYTES).putLong(value).array();
        byte[] encrypted = cipher.doFinal(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(encrypted);
    }

    // URL 안전 Base64 디코딩
    public Long decryptLong(String encrypted) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decrypted = cipher.doFinal(Base64.getUrlDecoder().decode(encrypted));
        ByteBuffer buffer = ByteBuffer.wrap(decrypted);
        return buffer.getLong();
    }
}
