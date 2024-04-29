FROM gradle:8.7-jdk17-alpine as gradlebuild
WORKDIR /build

COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN gradle build -x test --parallel

FROM openjdk:17-slim
WORKDIR /app

VOLUME /tmp
COPY --from=gradlebuild /build/build/libs/*.jar /app/

EXPOSE 8081
ENTRYPOINT ["java","-jar","-Djava.security.egd=file:/dev/./urandom","*.jar"]