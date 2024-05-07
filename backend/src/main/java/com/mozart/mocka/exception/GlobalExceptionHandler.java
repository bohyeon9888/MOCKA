package com.mozart.mocka.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception e) {
        log.error("internal error: "+e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("예기치 않은 내부 오류가 발생했습니다");
    }
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleUserNotFoundException(CustomException ce){
        return ResponseEntity.status(ce.getCode()).body(ce.getMsg());
    }
}