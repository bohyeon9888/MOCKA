package com.mozart.mocka.dto.request;

import lombok.Data;

@Data
public class InitializerRequestDto {
    private String springType;
    private String springLanguage;
    private String springPlatformVersion;
    private String springPackaging;
    private String springJvmVersion;
    private String springGroupId;
    private String springArtifactId;
    private String springName;
    private String springDescription;
    private String springPackageName;
    private String springDependencyName;
}
