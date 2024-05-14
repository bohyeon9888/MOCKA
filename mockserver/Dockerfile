FROM gradle:8.7.0-jdk17 as gradlebuild
WORKDIR /build

COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN gradle build -x test --parallel

FROM openjdk:17-slim
WORKDIR /app

VOLUME /tmp
COPY --from=gradlebuild /build/build/libs/mockserver-0.0.1-SNAPSHOT.jar /app/mockserver-0.0.1-SNAPSHOT.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","-Djava.security.egd=file:/dev/./urandom","mockserver-0.0.1-SNAPSHOT.jar"]