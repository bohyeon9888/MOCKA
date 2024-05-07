package com.mozart.mocka.dto.response;

import com.mozart.mocka.domain.Dependency;
import java.util.Map;
import lombok.Data;

@Data
public class DependencyResponse {
    private Map<String, Dependency> dependencies;
}
