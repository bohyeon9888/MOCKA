const dependencyList = [
  {
    name: "Developer Tools",
    values: [
      {
        id: "native",
        name: "GraalVM Native Support",
        description:
          "GraalVM 네이티브 이미지 컴파일러를 사용하여 Spring 애플리케이션을 네이티브 실행 파일로 컴파일하도록 지원합니다.",
      },
      {
        id: "dgs-codegen",
        name: "GraphQL DGS Code Generation",
        description:
          "스키마 파일을 구문 분석하여 GraphQL API 쿼리를 위한 데이터 유형 및 유형 안전 API를 생성합니다.",
      },
      {
        id: "devtools",
        name: "Spring Boot DevTools",
        description:
          "향상된 개발 경험을 위한 빠른 애플리케이션 재시작, LiveReload 및 구성을 제공합니다.",
      },
      {
        id: "configuration-processor",
        name: "Spring Configuration Processor",
        description:
          '개발자가 사용자 정의 구성 키(예:application.properties/.yml 파일)로 작업할 때 상황별 도움말 및 "코드 완성"을 제공할 수 있도록 메타데이터를 생성합니다.',
      },
      {
        id: "docker-compose",
        name: "Docker Compose Support",
        description:
          "향상된 개발 환경을 위해 Docker Compose 지원을 제공합니다.",
      },
      {
        id: "modulith",
        name: "Spring Modulith",
        description: "모듈식 모놀리식 애플리케이션 구축을 지원합니다.",
      },
    ],
  },
  {
    name: "Web",
    values: [
      {
        id: "webflux",
        name: "Spring Reactive Web",
        description:
          "Spring WebFlux 및 Netty를 사용하여 반응형 웹 애플리케이션을 구축하세요.",
      },
      {
        id: "graphql",
        name: "Spring for GraphQL",
        description:
          "GraphQL 및 GraphQL Java용 Spring을 사용하여 GraphQL 애플리케이션을 구축하세요.",
      },
      {
        id: "data-rest",
        name: "Rest Repositories",
        description:
          "Spring Data REST를 통해 REST를 통해 Spring Data 저장소를 노출합니다.",
      },
      {
        id: "session",
        name: "Spring Session",
        description:
          "사용자 세션 정보를 관리하기 위한 API 및 구현을 제공합니다.",
      },
      {
        id: "data-rest-explorer",
        name: "Rest Repositories HAL Explorer",
        description: "브라우저에서 Spring Data REST 저장소를 탐색합니다.",
      },
      {
        id: "hateoas",
        name: "Spring HATEOAS",
        description:
          "Spring/Spring MVC로 작업할 때 HATEOAS 원칙을 따르는 RESTful API 생성을 쉽게 합니다.",
      },
      {
        id: "web-services",
        name: "Spring Web Services",
        description:
          "계약 우선 SOAP 개발을 촉진합니다. XML 페이로드를 조작하는 다양한 방법 중 하나를 사용하여 유연한 웹 서비스를 생성할 수 있습니다.",
      },
      {
        id: "jersey",
        name: "Jersey",
        description:
          "JAX-RS API에 대한 지원을 제공하는 Java에서 RESTful 웹 서비스를 개발하기 위한 프레임워크입니다.",
      },
      {
        id: "vaadin",
        name: "Vaadin",
        description:
          "JS, HTML, CSS에 얽매이지 않고 순수 Java로 UI를 작성할 수 있는 웹 프레임워크입니다.",
      },
      {
        id: "hilla",
        name: "Hilla",
        description:
          "Spring Boot Java 백엔드를 반응형 TypeScript 프런트엔드와 통합하는 오픈 소스 프레임워크입니다.",
      },
    ],
  },
  {
    name: "Template Engines",
    values: [
      {
        id: "thymeleaf",
        name: "Thymeleaf",
        description:
          "웹 및 독립형 환경 모두를 위한 최신 서버측 Java 템플릿 엔진입니다. HTML이 브라우저에 정적 프로토타입으로 올바르게 표시되도록 허용합니다.",
      },
      {
        id: "freemarker",
        name: "Apache Freemarker",
        description:
          "템플릿 및 변경 데이터를 기반으로 텍스트 출력(HTML 웹 페이지, 이메일, 구성 파일, 소스 코드 등)을 생성하는 Java 라이브러리입니다.",
      },
      {
        id: "mustache",
        name: "Mustache",
        description:
          "웹 및 독립 실행형 환경 모두를 위한 로직 없는 템플릿입니다. if 문, else 절 또는 for 루프가 없습니다. 대신 태그만 있습니다.",
      },
      {
        id: "groovy-templates",
        name: "Groovy Templates",
        description: "그루비 템플릿 엔진.",
      },
    ],
  },
  {
    name: "Security",
    values: [
      {
        id: "security",
        name: "Spring Security",
        description:
          "Spring 애플리케이션을 위한 고도로 사용자 정의 가능한 인증 및 액세스 제어 프레임워크입니다.",
      },
      {
        id: "oauth2-client",
        name: "OAuth2 Client",
        description:
          "Spring Security의 OAuth2/OpenID Connect 클라이언트 기능을 위한 Spring Boot 통합입니다.",
      },
      {
        id: "oauth2-authorization-server",
        name: "OAuth2 Authorization Server",
        description: "Spring Authorization Server를 위한 Spring Boot 통합.",
      },
      {
        id: "oauth2-resource-server",
        name: "OAuth2 Resource Server",
        description:
          "Spring Security의 OAuth2 리소스 서버 기능을 위한 Spring Boot 통합입니다.",
      },
      {
        id: "data-ldap",
        name: "Spring LDAP",
        description:
          "Lightweight Directory Access Protocol을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.",
      },
      {
        id: "okta",
        name: "Okta",
        description:
          "Spring Security/Spring Boot OAuth2 기능을 위한 Okta 특정 구성입니다. OAuth 2.0/OIDC를 통해 Spring Boot 애플리케이션이 Okta와 작동하도록 활성화합니다.",
      },
    ],
  },
  {
    name: "SQL",
    values: [
      {
        id: "jdbc",
        name: "JDBC API",
        description:
          "클라이언트가 데이터베이스에 연결하고 쿼리하는 방법을 정의하는 데이터베이스 연결 API입니다.",
      },
      {
        id: "data-jpa",
        name: "Spring Data JPA",
        description:
          "Spring Data 및 Hibernate를 사용하여 Java Persistence API를 사용하여 SQL 저장소에 데이터를 유지합니다.",
      },
      {
        id: "data-jdbc",
        name: "Spring Data JDBC",
        description:
          "Spring Data를 사용하여 일반 JDBC로 SQL 저장소에 데이터를 유지합니다.",
      },
      {
        id: "data-r2dbc",
        name: "Spring Data R2DBC",
        description:
          "반응형 애플리케이션에서 Spring 데이터를 사용하여 SQL 저장소에 데이터를 유지하기 위한 반응형 관계형 데이터베이스 연결을 제공합니다.",
      },
      {
        id: "mybatis",
        name: "MyBatis Framework",
        description:
          "사용자 정의 SQL, 저장 프로시저 및 고급 매핑을 지원하는 지속성 프레임워크입니다. MyBatis는 XML 설명자 또는 주석을 사용하여 객체를 저장 프로시저 또는 SQL 문과 연결합니다.",
      },
      {
        id: "liquibase",
        name: "Liquibase Migration",
        description:
          "Liquibase 데이터베이스 마이그레이션 및 소스 제어 라이브러리.",
      },
      {
        id: "flyway",
        name: "Flyway Migration",
        description:
          "데이터베이스의 버전 제어를 통해 모든 버전(빈 데이터베이스 포함)에서 최신 버전의 스키마로 마이그레이션할 수 있습니다.",
      },
      {
        id: "jooq",
        name: "JOOQ Access Layer",
        description:
          "데이터베이스에서 Java 코드를 생성하고 유창한 API를 통해 안전한 SQL 쿼리를 빌드하세요.",
      },
      {
        id: "db2",
        name: "IBM DB2 Driver",
        description: "IBM DB2에 대한 액세스를 제공하는 JDBC 드라이버입니다.",
      },
      {
        id: "derby",
        name: "Apache Derby Database",
        description:
          "완전히 Java로 구현된 오픈 소스 관계형 데이터베이스입니다.",
      },
      {
        id: "h2",
        name: "H2 Database",
        description:
          "작은(2mb) 설치 공간으로 JDBC API 및 R2DBC 액세스를 지원하는 빠른 인메모리 데이터베이스를 제공합니다. 브라우저 기반 콘솔 애플리케이션은 물론 임베디드 모드와 서버 모드도 지원합니다.",
      },
      {
        id: "hsql",
        name: "HyperSQL Database",
        description: "경량의 100% Java SQL 데이터베이스 엔진.",
      },
      {
        id: "mariadb",
        name: "MariaDB Driver",
        description: "MariaDB JDBC 및 R2DBC 드라이버.",
      },
      {
        id: "sqlserver",
        name: "MS SQL Server Driver",
        description:
          "모든 Java 애플리케이션에서 Microsoft SQL Server 및 Azure SQL Database에 대한 액세스를 제공하는 JDBC 및 R2DBC 드라이버입니다.",
      },
      {
        id: "mysql",
        name: "MySQL Driver",
        description: "MySQL JDBC 드라이버.",
      },
      {
        id: "oracle",
        name: "Oracle Driver",
        description: "Oracle에 대한 액세스를 제공하는 JDBC 드라이버입니다.",
      },
      {
        id: "postgresql",
        name: "PostgreSQL Driver",
        description:
          "Java 프로그램이 데이터베이스 독립적인 표준 Java 코드를 사용하여 PostgreSQL 데이터베이스에 연결할 수 있도록 하는 JDBC 및 R2DBC 드라이버입니다.",
      },
    ],
  },
  {
    name: "NoSQL",
    values: [
      {
        id: "data-redis",
        name: "Spring Data Redis (Access+Driver)",
        description:
          "동기식, 비동기식, 반응형 사용을 위한 고급 스레드 안전 Java Redis 클라이언트입니다. 클러스터, 센티넬, 파이프라이닝, 자동 재연결, 코덱 등을 지원합니다.",
      },
      {
        id: "data-redis-reactive",
        name: "Spring Data Reactive Redis",
        description:
          "Spring Data Redis를 사용하여 반응형 방식으로 Redis 키-값 데이터 저장소에 액세스하세요.",
      },
      {
        id: "data-mongodb",
        name: "Spring Data MongoDB",
        description:
          "JSON과 유사한 유연한 문서에 데이터를 저장합니다. 즉, 필드는 문서마다 다를 수 있고 데이터 구조는 시간이 지남에 따라 변경될 수 있습니다.",
      },
      {
        id: "data-mongodb-reactive",
        name: "Spring Data Reactive MongoDB",
        description:
          "MongoDB에 대한 비차단 역압력으로 비동기식 스트림 처리를 제공합니다.",
      },
      {
        id: "data-elasticsearch",
        name: "Spring Data Elasticsearch (Access+Driver)",
        description:
          "Spring Data Elasticsearch를 갖춘 분산형 RESTful 검색 및 분석 엔진입니다.",
      },
      {
        id: "data-cassandra",
        name: "Spring Data for Apache Cassandra",
        description:
          "높은 확장성과 고성능을 제공하는 무료 오픈 소스 분산형 NoSQL 데이터베이스 관리 시스템입니다.",
      },
      {
        id: "data-cassandra-reactive",
        name: "Spring Data Reactive for Apache Cassandra",
        description:
          "반응형 방식으로 Cassandra NoSQL 데이터베이스에 액세스합니다.",
      },
      {
        id: "data-couchbase",
        name: "Spring Data Couchbase",
        description:
          "메모리 우선 아키텍처, 지리적으로 분산된 배포 및 워크로드 격리를 제공하는 NoSQL 문서 중심 데이터베이스입니다.",
      },
      {
        id: "data-couchbase-reactive",
        name: "Spring Data Reactive Couchbase",
        description:
          "Spring Data Couchbase를 사용하여 반응형 방식으로 Couchbase NoSQL 데이터베이스에 액세스하세요.",
      },
      {
        id: "data-neo4j",
        name: "Spring Data Neo4j",
        description:
          "관계로 연결된 노드로 구성된 그래프 구조의 데이터를 저장하는 오픈소스 NoSQL 데이터베이스입니다.",
      },
    ],
  },
  {
    name: "Messaging",
    values: [
      {
        id: "integration",
        name: "Spring Integration",
        description:
          "엔터프라이즈 통합 패턴에 대한 지원을 추가합니다. 경량 메시징을 활성화하고 선언적 어댑터를 통해 외부 시스템과의 통합을 지원합니다.",
      },
      {
        id: "amqp",
        name: "Spring for RabbitMQ",
        description:
          "애플리케이션에 메시지를 보내고 받을 수 있는 공통 플랫폼을 제공하고, 메시지를 수신할 때까지 안전하게 보관할 수 있는 장소를 제공합니다.",
      },
      {
        id: "amqp-streams",
        name: "Spring for RabbitMQ Streams",
        description: "RabbitMQ를 사용하여 스트림 처리 애플리케이션 구축",
      },
      {
        id: "kafka",
        name: "Spring for Apache Kafka",
        description: "레코드 스트림을 게시, 구독, 저장 및 처리합니다.",
      },
      {
        id: "kafka-streams",
        name: "Spring for Apache Kafka Streams",
        description:
          "Apache Kafka Streams를 사용하여 스트림 처리 애플리케이션을 구축합니다.",
      },
      {
        id: "activemq",
        name: "Spring for Apache ActiveMQ 5",
        description: "Apache ActiveMQ 'Classic'을 통한 Spring JMS 지원.",
      },
      {
        id: "artemis",
        name: "Spring for Apache ActiveMQ Artemis",
        description: "Apache ActiveMQ Artemis를 통한 Spring JMS 지원.",
      },
      {
        id: "pulsar",
        name: "Spring for Apache Pulsar",
        description: "Apache Pulsar를 사용하여 메시징 애플리케이션 구축",
      },
      {
        id: "pulsar-reactive",
        name: "Spring for Apache Pulsar (Reactive)",
        description: "Apache Pulsar를 사용하여 반응형 메시징 애플리케이션 구축",
      },
      {
        id: "websocket",
        name: "WebSocket",
        description:
          "SockJS 및 STOMP를 사용하여 서블릿 기반 WebSocket 애플리케이션을 구축하세요.",
      },
      {
        id: "rsocket",
        name: "RSocket",
        description:
          "Spring Messaging 및 Netty를 사용한 RSocket.io 애플리케이션.",
      },
      {
        id: "camel",
        name: "Apache Camel",
        description:
          "Apache Camel은 데이터를 소비하거나 생성하는 다양한 시스템을 빠르고 쉽게 통합할 수 있는 오픈 소스 통합 프레임워크입니다.",
      },
      {
        id: "solace",
        name: "Solace PubSub+",
        description:
          "Solace PubSub+ Advanced Event Broker에 연결하여 메시지 게시, 구독, 요청/응답 및 저장/재생",
      },
    ],
  },
  {
    name: "I/O",
    values: [
      {
        id: "batch",
        name: "Spring Batch",
        description:
          "트랜잭션, 재시도/건너뛰기 및 청크 기반 처리를 갖춘 일괄 애플리케이션입니다.",
      },
      {
        id: "validation",
        name: "Validation",
        description: "Hibernate 검증자를 사용한 Bean 검증.",
      },
      {
        id: "mail",
        name: "Java Mail Sender",
        description:
          "Java Mail 및 Spring Framework의 JavaMailSender를 사용하여 이메일을 보냅니다.",
      },
      {
        id: "quartz",
        name: "Quartz Scheduler",
        description: "Quartz를 사용하여 작업을 예약하세요.",
      },
      {
        id: "cache",
        name: "Spring Cache Abstraction",
        description:
          "캐시 콘텐츠 업데이트 기능과 같은 캐시 관련 작업을 제공하지만 실제 데이터 저장소는 제공하지 않습니다.",
      },
      {
        id: "picocli",
        name: "Picocli",
        description: "picocli를 사용하여 명령줄 애플리케이션을 구축하세요.",
      },
      {
        id: "spring-shell",
        name: "Spring Shell",
        description: "Spring으로 명령줄 애플리케이션을 구축하세요.",
      },
    ],
  },
  {
    name: "Ops",
    values: [
      {
        id: "actuator",
        name: "Spring Boot Actuator",
        description:
          "애플리케이션 상태, 지표, 세션 등과 같은 애플리케이션을 모니터링하고 관리할 수 있는 내장(또는 사용자 정의) 엔드포인트를 지원합니다.",
      },
      {
        id: "codecentric-spring-boot-admin-client",
        name: "codecentric's Spring Boot Admin (Client)",
        description:
          "애플리케이션이 Codecentric의 Spring Boot Admin Server 인스턴스에 등록하는 데 필요합니다.",
      },
      {
        id: "codecentric-spring-boot-admin-server",
        name: "codecentric's Spring Boot Admin (Server)",
        description:
          "Spring Boot 애플리케이션을 관리하고 모니터링하는 커뮤니티 프로젝트입니다. Spring Boot Actuator 엔드포인트 위에 UI를 제공합니다.",
      },
      {
        id: "sentry",
        name: "Sentry",
        description:
          "소프트웨어 팀이 더 명확하게 보고, 더 빠르게 해결하고, 지속적으로 학습할 수 있도록 지원하는 애플리케이션 성능 모니터링 및 오류 추적.",
      },
    ],
  },
  {
    name: "Observability",
    values: [
      {
        id: "datadog",
        name: "Datadog",
        description:
          "내장된 대시보드 및 경고 기능을 갖춘 차원 시계열 SaaS인 Datadog에 마이크로미터 측정항목을 게시합니다.",
      },
      {
        id: "dynatrace",
        name: "Dynatrace",
        description:
          "관찰 가능성, AIOps, 애플리케이션 보안 및 분석 기능을 갖춘 플랫폼인 Dynatrace에 Micrometer 측정항목을 게시합니다.",
      },
      {
        id: "influx",
        name: "Influx",
        description:
          "데이터의 실시간 스트림 처리를 지원하는 차원 시계열 서버인 InfluxDB에 Micrometer 메트릭을 게시합니다.",
      },
      {
        id: "graphite",
        name: "Graphite",
        description:
          "고정 크기 데이터베이스가 지원하는 계층적 측정 시스템인 Graphite에 마이크로미터 측정 항목을 게시합니다.",
      },
      {
        id: "new-relic",
        name: "New Relic",
        description:
          "전체 UI와 NRQL이라는 쿼리 언어를 갖춘 SaaS 제품인 New Relic에 Micrometer 메트릭을 게시합니다.",
      },
      {
        id: "prometheus",
        name: "Prometheus",
        description:
          "간단한 내장 UI, 사용자 정의 쿼리 언어 및 수학 연산을 갖춘 인메모리 차원 시계열 데이터베이스인 Prometheus 형식의 마이크로미터 메트릭을 노출합니다.",
      },
      {
        id: "distributed-tracing",
        name: "Distributed Tracing",
        description: "로그에서 범위 및 추적 ID를 활성화합니다.",
      },
      {
        id: "wavefront",
        name: "Wavefront",
        description:
          "전체 스택의 데이터를 시각화, 쿼리 및 경고할 수 있는 SaaS 기반 메트릭 모니터링 및 분석 플랫폼인 Wavefront의 Tanzu Observability에 메트릭을 게시하고 선택적으로 분산 추적을 게시합니다.",
      },
      {
        id: "zipkin",
        name: "Zipkin",
        description: "범위 및 추적 ID를 활성화하고 Zipkin에 노출합니다.",
      },
    ],
  },
  {
    name: "Testing",
    values: [
      {
        id: "restdocs",
        name: "Spring REST Docs",
        description:
          "Asciidoctor로 직접 작성한 내용과 Spring MVC 테스트로 생성된 자동 생성된 스니펫을 결합하여 RESTful 서비스를 문서화합니다.",
      },
      {
        id: "testcontainers",
        name: "Testcontainers",
        description:
          "일반 데이터베이스, Selenium 웹 브라우저 또는 Docker 컨테이너에서 실행할 수 있는 모든 항목의 가볍고 일회용 인스턴스를 제공합니다.",
      },
      {
        id: "cloud-contract-verifier",
        name: "Contract Verifier",
        description:
          "CDC(Consumer Driven Contract) 개발을 활성화하여 TDD를 소프트웨어 아키텍처 수준으로 이동합니다.",
      },
      {
        id: "cloud-contract-stub-runner",
        name: "Contract Stub Runner",
        description:
          "HTTP/메시징 기반 통신을 위한 Stub Runner입니다. RestDocs 테스트에서 WireMock 스텁을 생성할 수 있습니다.",
      },
      {
        id: "unboundid-ldap",
        name: "Embedded LDAP Server",
        description:
          "단위 테스트에서 LDAP 서버를 실행하기 위한 플랫폼 중립적인 방법을 제공합니다.",
      },
    ],
  },
  {
    name: "Spring Cloud",
    values: [
      {
        id: "cloud-starter",
        name: "Cloud Bootstrap",
        description:
          "외부 라이브러리 또는 통합과 관련되지 않은 비특정 Spring Cloud 기능(예: Bootstrap 컨텍스트 및 @RefreshScope)",
      },
      {
        id: "cloud-function",
        name: "Function",
        description:
          "기능을 통해 비즈니스 로직 구현을 촉진하고 서버리스 공급자 전체에 걸쳐 균일한 프로그래밍 모델을 지원하며 독립 실행형(로컬 또는 PaaS에서)을 실행하는 기능도 지원합니다.",
      },
      {
        id: "cloud-task",
        name: "Task",
        description:
          "사용자가 Spring Cloud를 사용하여 단기 마이크로서비스를 개발하고 실행할 수 있습니다. 로컬, 클라우드 및 Spring Cloud Data Flow에서 실행하세요.",
      },
    ],
  },
  {
    name: "Spring Cloud Config",
    values: [
      {
        id: "cloud-config-client",
        name: "Config Client",
        description:
          "애플리케이션의 구성을 가져오기 위해 Spring Cloud 구성 서버에 연결하는 클라이언트입니다.",
      },
      {
        id: "cloud-config-server",
        name: "Config Server",
        description:
          "Git, SVN 또는 HashiCorp Vault를 통한 구성을 중앙에서 관리합니다.",
      },
      {
        id: "cloud-starter-vault-config",
        name: "Vault Configuration",
        description:
          "분산 시스템의 외부화된 구성에 대한 클라이언트측 지원을 제공합니다. HashiCorp의 Vault를 사용하면 모든 환경에서 애플리케이션의 외부 비밀 속성을 관리할 수 있는 중앙 위치를 갖게 됩니다.",
      },
      {
        id: "cloud-starter-zookeeper-config",
        name: "Apache Zookeeper Configuration",
        description:
          "애플리케이션 내에서 공통 패턴을 활성화 및 구성하고 Apache Zookeeper 기반 구성 요소를 사용하여 대규모 분산 시스템을 구축하세요. 제공되는 패턴에는 서비스 검색 및 구성이 포함됩니다.",
      },
      {
        id: "cloud-starter-consul-config",
        name: "Consul Configuration",
        description:
          "Hashicorp의 Consul을 사용하여 애플리케이션 내에서 공통 패턴을 활성화 및 구성하고 대규모 분산 시스템을 구축하세요. 제공되는 패턴에는 서비스 검색, 분산 구성 및 제어 버스가 포함됩니다.",
      },
    ],
  },
  {
    name: "Spring Cloud Discovery",
    values: [
      {
        id: "cloud-eureka",
        name: "Eureka Discovery Client",
        description:
          "중간 계층 서버의 로드 밸런싱 및 장애 조치를 위해 서비스를 찾기 위한 REST 기반 서비스입니다.",
      },
      {
        id: "cloud-eureka-server",
        name: "Eureka Server",
        description: "spring-cloud-netflix 유레카 서버.",
      },
      {
        id: "cloud-starter-zookeeper-discovery",
        name: "Apache Zookeeper Discovery",
        description: "Apache Zookeeper를 사용한 서비스 검색.",
      },
      {
        id: "cloud-starter-consul-discovery",
        name: "Consul Discovery",
        description: "Hashicorp Consul을 통한 서비스 검색.",
      },
    ],
  },
  {
    name: "Spring Cloud Routing",
    values: [
      {
        id: "cloud-gateway",
        name: "Gateway",
        description:
          "서블릿 기반 애플리케이션에서 API로 라우팅하는 간단하면서도 효과적인 방법을 제공합니다. 보안, 모니터링/메트릭, 복원력 등 API에 대한 교차 문제를 제공합니다.",
      },
      {
        id: "cloud-gateway-reactive",
        name: "Reactive Gateway",
        description:
          "반응형 애플리케이션에서 API로 라우팅하는 간단하면서도 효과적인 방법을 제공합니다. 보안, 모니터링/메트릭, 복원력 등 API에 대한 교차 문제를 제공합니다.",
      },
      {
        id: "cloud-feign",
        name: "OpenFeign",
        description:
          "선언적 REST 클라이언트. OpenFeign은 JAX-RS 또는 Spring MVC 주석으로 장식된 인터페이스의 동적 구현을 생성합니다.",
      },
      {
        id: "cloud-loadbalancer",
        name: "Cloud LoadBalancer",
        description:
          "Spring Cloud LoadBalancer를 사용한 클라이언트 측 로드 밸런싱.",
      },
    ],
  },
  {
    name: "Spring Cloud Circuit Breaker",
    values: [
      {
        id: "cloud-resilience4j",
        name: "Resilience4J",
        description:
          "Resilience4j를 기본 구현으로 사용하는 Spring Cloud 회로 차단기입니다.",
      },
    ],
  },
  {
    name: "Spring Cloud Messaging",
    values: [
      {
        id: "cloud-bus",
        name: "Cloud Bus",
        description:
          "상태 변경이나 기타 관리 지침을 브로드캐스트하는 데 사용할 수 있는 경량 메시지 브로커와 분산 시스템의 노드를 연결합니다(Apache Kafka 또는 RabbitMQ와 같은 바인더 필요).",
      },
      {
        id: "cloud-stream",
        name: "Cloud Stream",
        description:
          "공유 메시징 시스템과 연결된 확장성이 뛰어난 이벤트 기반 마이크로서비스를 구축하기 위한 프레임워크입니다(Apache Kafka, Apache Pulsar, RabbitMQ 또는 Solace PubSub+와 같은 바인더 필요).",
      },
    ],
  },
  {
    name: "VMware Tanzu Application Service",
    values: [
      {
        id: "scs-config-client",
        name: "Config Client (TAS)",
        description: "VMware Tanzu 애플리케이션 서비스의 구성 클라이언트.",
      },
      {
        id: "scs-service-registry",
        name: "Service Registry (TAS)",
        description:
          "VMware Tanzu 애플리케이션 서비스의 Eureka 서비스 검색 클라이언트.",
      },
    ],
  },
  {
    name: "Microsoft Azure",
    values: [
      {
        id: "azure-support",
        name: "Azure Support",
        description:
          "Azure 서비스(Service Bus, Storage, Active Directory, Key Vault 등)에 대한 자동 구성입니다.",
      },
      {
        id: "azure-active-directory",
        name: "Azure Active Directory",
        description:
          "인증을 위해 Azure Active Directory와 Spring Security 통합.",
      },
      {
        id: "azure-cosmos-db",
        name: "Azure Cosmos DB",
        description:
          "Spring Data 지원을 포함하여 최신 앱 개발을 위한 완전 관리형 NoSQL 데이터베이스 서비스입니다.",
      },
      {
        id: "azure-keyvault",
        name: "Azure Key Vault",
        description:
          "모든 주요 자격 증명 모음 기능이 지원됩니다. 애플리케이션 비밀 및 인증서를 관리합니다.",
      },
      {
        id: "azure-storage",
        name: "Azure Storage",
        description:
          "모든 저장소 기능이 지원됩니다. Blob, 파일 공유 및 대기열.",
      },
    ],
  },
  {
    name: "Google Cloud",
    values: [
      {
        id: "cloud-gcp",
        name: "Google Cloud Support",
        description:
          "모든 Google Cloud 통합에 대한 자동 구성 지원이 포함되어 있습니다. 대부분의 자동 구성 코드는 다른 종속성이 클래스 경로에 추가된 경우에만 활성화됩니다.",
      },
      {
        id: "cloud-gcp-pubsub",
        name: "Google Cloud Messaging",
        description:
          "Google Cloud Pub/Sub 통합이 즉시 작동할 수 있도록 Google Cloud 지원 항목과 모든 필수 종속 항목을 추가합니다.",
      },
      {
        id: "cloud-gcp-storage",
        name: "Google Cloud Storage",
        description:
          "Google Cloud Storage 통합이 즉시 작동할 수 있도록 Google Cloud 지원 항목과 모든 필수 종속성을 추가합니다.",
      },
    ],
  },
  {
    name: "AI",
    values: [
      {
        id: "spring-ai-azure-openai",
        name: "Azure OpenAI",
        description:
          "ChatGPT를 기반으로 하는 Azure의 OpenAI 제품에 대한 Spring AI 지원. 이는 기존 OpenAI 기능을 뛰어넘어 향상된 기능으로 AI 기반 텍스트 생성을 제공합니다.",
      },
      {
        id: "spring-ai-vectordb-azure",
        name: "Azure AI Search",
        description:
          "Azure AI Search에 대한 Spring AI 벡터 데이터베이스 지원. 이는 AI 기반 정보 검색 플랫폼이자 Microsoft의 대규모 AI 플랫폼의 일부입니다. 다른 기능 중에서도 사용자는 벡터 기반 저장 및 검색을 사용하여 정보를 쿼리할 수 있습니다.",
      },
      {
        id: "spring-ai-bedrock",
        name: "Amazon Bedrock",
        description:
          "Amazon Bedrock에 대한 Spring AI 지원. 다양한 AI 제공업체의 기반 모델을 통합 API를 통해 제공하는 관리형 서비스입니다.",
      },
      {
        id: "spring-ai-vectordb-chroma",
        name: "Chroma Vector Database",
        description:
          "Chroma에 대한 Spring AI 벡터 데이터베이스 지원. 이는 오픈 소스 임베딩 데이터베이스이며 문서 임베딩, 콘텐츠 및 메타데이터를 저장하는 도구를 제공합니다. 또한 메타데이터 필터링을 포함하여 해당 임베딩을 검색할 수도 있습니다.",
      },
      {
        id: "spring-ai-vectordb-milvus",
        name: "Milvus Vector Database",
        description:
          "Milvus에 대한 Spring AI 벡터 데이터베이스 지원. 데이터 과학 및 기계 학습 분야에서 큰 주목을 받아온 오픈 소스 벡터 데이터베이스입니다. 뛰어난 기능 중 하나는 벡터 인덱싱 및 쿼리에 대한 강력한 지원입니다.",
      },
      {
        id: "spring-ai-mistral",
        name: "Mistral AI",
        description:
          "개발자와 기업을 위한 개방형 휴대용 생성 AI인 Mistral AI에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-vectordb-neo4j",
        name: "Neo4J Vector Database",
        description:
          "Neo4j의 벡터 검색을 위한 Spring AI 벡터 데이터베이스 지원. 이를 통해 사용자는 대규모 데이터 세트에서 벡터 임베딩을 쿼리할 수 있습니다.",
      },
      {
        id: "spring-ai-ollama",
        name: "Ollama",
        description:
          "Ollama에 대한 Spring AI 지원. 이를 통해 다양한 LLM(대형 언어 모델)을 로컬에서 실행하고 해당 모델에서 텍스트를 생성할 수 있습니다.",
      },
      {
        id: "spring-ai-openai",
        name: "OpenAI",
        description:
          "Spring AI는 AI 언어 모델인 ChatGPT와 OpenAI의 이미지 생성 모델인 DALL-E를 지원합니다.",
      },
      {
        id: "spring-ai-vectordb-pgvector",
        name: "PGvector Vector Database",
        description:
          "PGVector에 대한 Spring AI 벡터 데이터베이스 지원. 이는 기계 학습으로 생성된 임베딩을 저장하고 검색할 수 있는 PostgreSQL용 오픈 소스 확장입니다.",
      },
      {
        id: "spring-ai-vectordb-pinecone",
        name: "Pinecone Vector Database",
        description:
          "Pinecone에 대한 Spring AI 벡터 데이터베이스 지원. 널리 사용되는 클라우드 기반 벡터 데이터베이스로 벡터를 효율적으로 저장하고 검색할 수 있습니다.",
      },
      {
        id: "spring-ai-postgresml",
        name: "PostgresML",
        description: "PostgresML 텍스트 임베딩 모델에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-vectordb-redis",
        name: "Redis Search and Query Vector Database",
        description:
          "Redis 검색 및 쿼리를 위한 Spring AI 벡터 데이터베이스 지원. Redis OSS의 핵심 기능을 확장하고 Redis를 벡터 데이터베이스로 사용할 수 있습니다.",
      },
      {
        id: "spring-ai-stabilityai",
        name: "Stability AI",
        description:
          "Stability AI의 텍스트-이미지 생성 모델에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-transformers",
        name: "Transformers (ONNX) Embeddings",
        description:
          "ONNX(Open Neural Network Exchange) 형식으로 직렬화된 사전 훈련된 변환기 모델에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-vertexai-palm2",
        name: "Vertex AI PaLM2",
        description:
          "Google Vertex PaLM2 채팅 및 임베딩 모델에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-vertexai-gemini",
        name: "Vertex AI Gemini",
        description: "Google Vertex Gemini 채팅에 대한 Spring AI 지원.",
      },
      {
        id: "spring-ai-vectordb-qdrant",
        name: "Qdrant Vector Database",
        description:
          "Qdrant에 대한 Spring AI 벡터 데이터베이스 지원. 오픈 소스 고성능 벡터 검색 엔진/데이터베이스입니다.",
      },
      {
        id: "spring-ai-vectordb-weaviate",
        name: "Weaviate Vector Database",
        description:
          "오픈 소스 벡터 데이터베이스인 Weaviate에 대한 Spring AI 벡터 데이터베이스를 지원합니다. 이를 통해 즐겨 사용하는 ML 모델의 데이터 객체와 벡터 임베딩을 저장하고 수십억 개의 데이터 객체로 원활하게 확장할 수 있습니다.",
      },
      {
        id: "timefold-solver",
        name: "Timefold Solver",
        description: "운영 및 일정을 최적화하는 AI 솔버입니다.",
      },
    ],
  },
];

export default dependencyList;
