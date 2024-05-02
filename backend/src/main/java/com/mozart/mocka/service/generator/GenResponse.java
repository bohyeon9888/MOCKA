package com.mozart.mocka.service.generator;

import com.mozart.mocka.dto.request.InitializerRequestDto;
import com.mozart.mocka.repository.ApiPathRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class GenResponse {
    private final ApiPathRepository apiPathRepository;
    private static final String whiteSpace = "    ";
    public static String makeStrObject(String dtoClassName, InitializerRequestDto request){
        String packageName="package " + request.getSpringPackageName() + dtoClassName+";\n\n";
        return "";
    }
    public static String addAnnotation(String content){
        return """
            @NoArgsConstructor
            @AllArgsConstructor
            @Data
            @Builder
        """+"\n"+content;
    }

    public static String getDeepWhiteSpace(String content,int deep){
        String[] lines=content.split(System.lineSeparator());
        for(int i =0;i<lines.length;i++){
            lines[i]=whiteSpace.repeat(deep)+lines[i];
        }
        StringBuilder resultLines = new StringBuilder();
        for(String line : lines){
            resultLines.append(line);
        }
        return resultLines.toString();
    }
}
