# MOCKA

<img src="./img/main.png" width="100%"/>

<br/>

## 프로젝트 진행 기간

```
2024.04.05 ~ 2024.05.20 (약 7주)
```

<br/>

## ❤ 팀 소개

### 팀명

> 📢 안녕하세요! API문서 작성으로 노코딩 목업 배포 서비스 모카 프로젝트를 진행한 팀《목차르트》입니다.

### 팀원 소개

### Frontend

<table style="width: 300px; text-align: center;">
  <tr>
    <td style="padding: 8px; text-align: center;">
      <div style="display: inline-block;">
        <img src="./img/profile/강대은.png" alt="강대은" width="100">
        <br/>
        <strong>강대은</strong>
      </div>
    </td>
    <td style="padding: 8px; text-align: center;">
      <div style="display: inline-block;">
        <img src="./img/profile/황정민.png" alt="황정민" width="100">
        <br/>
        <strong>황정민</strong>
      </div>
    </td>
  </tr>
</table>


<br/>

### Backend

<table style="width: 450px; text-align: center;">
  <tr>
    <td style="padding: 8px; text-align: center;">
      <div style="display: inline-block;">
        <img src="./img/profile/김범수.png" alt="김범수" width="100">
        <br/>
        <strong>김범수</strong>
      </div>
    </td>
    <td style="padding: 8px; text-align: center;">
      <div style="display: inline-block;">
        <img src="./img/profile/김보경.png" alt="김보경" width="100">
        <br/>
        <strong>김보경</strong>
      </div>
    </td>
    <td style="padding: 8px; text-align: center;">
      <div style="display: inline-block;">
        <img src="./img/profile/서정현.png" alt="서정현" width="100">
        <br/>
        <strong>서정현</strong>
      </div>
    </td>
  </tr>
</table>

<br/>

## 🎉 프로젝트 요약

### 💡프로젝트 명: MOCKA

### 목적

MOCKA는 개발자들이 API 문서를 쉽게 작성하고 효율적으로 협업할 수 있도록 지원하는 서비스를 개발하는 것을 목표로 이를 통해 개발 프로세스를 간소화와 효율성 향상을 지원합니다.

1. API 문서 작성
   - API의 Request Body, Response Body, Query Parameter, Path Variable 등을 쉽게 정의하고, 코드 작성 시 필요한 키의 이름과 타입을 명확하게 확인할 수 있습니다.
   - 직관적이고 사용하기 쉬운 인터페이스를 제공하여, 개발자가 신속하게 API 문서를 작성할 수 있도록 지원합니다.
2. 서버 스켈레톤 코드 생성
   - API 문서를 기반으로 Java Spring Boot 프로젝트의 스켈레톤 코드를 자동으로 생성합니다.
   - 개발자들은 이 기능을 통해 초기 프로젝트 설정에 소요되는 시간을 줄이고, 핵심 로직 구현에 집중할 수 있습니다.
3. Mock Server 기능 제공
   - 작성된 API 문서를 기반으로 Mock Server를 생성하여, API를 더미 데이터로 테스트할 수 있습니다.
   - Faker.js, Java Faker와 같은 모킹 라이브러리를 사용하여 실제 서버 구현 전에 API를 테스트할 수 있는 환경을 제공합니다.
   - 이를 통해 개발 과정에서 API의 동작을 미리 확인하고, 문제를 조기에 발견하여 수정할 수 있습니다.

### 기대효과

- 유연한 테스터: 설정된 형태의 더미데이터를 body에 자동으로 삽입해주고, 작성된 url뿐만 아니라 baseUrl을 수정하여 원하는 서버로도 테스트를 할 수 있습니다.
- API 연동:  백엔드 개발자가 api 작업을 완료하지 않아도  프론트엔드 개발자는 약속된 형태의 더미데이터를 응답받을 수 있습니다.
- 휴먼에러:  API명세서를 기반으로 스켈레톤 코드를 생성하여 잘못된 응답 변수 등의 휴먼에러를 예방할 수 있습니다.
- 유지보수 용이성
  - 자동 생성된 스켈레톤 코드는 표준화되고, 재사용 가능한 구조로 되어 있어 유지보수가 용이합니다.
  - API 명세의 변경이 필요한 경우, 명세만 업데이트하면 관련 컨트롤러도 쉽게 재생성되어 변경사항을 반영할 수 있습니다.

### 차별점

- **다기능 통합 서비스**: 포스트맨의 API테스터, 스웨거의 명세 작성 및 공유, 스프링 이니셜라이저의스켈레톤 코드 생성 등의 기능을 한 곳에서 편리하게 누릴 수 있습니다.

<br/>

## ✨주요 기능 및 구현

### 💡 API 문서 작성:

- **프로젝트 생성:** 프로젝트의 이름과 common Uri를 지정하여 모든 api 앞단에 공통으로 들어가는 주소를 지정할 수 있다.
- **API 생성** : 폴더를 생성하여 폴더마다 공통되는 uri를 설정할 수 있어 기능별로 api를 생성이 가능하다. 그리고 api 생성시에 상세한 URI(pathvariable, query parameter), Request, Response의 형태를 지정할 수 있으며, 중첩된 구조로 모든 상황을 상세히 쉽게 클릭으로 작성할 수 있다.

### 💡 API 문서 조회 및 공유:

- **그룹 분류:** 토글을 통해 정리된 API 명세 확인 및 공통 url로 묶을 수 있는 그룹 단위 분류
- **친구 초대:** 뷰어 및 편집자 권한 부여를 기반으로한 초대

### 💡 API Test

- **더미데이터 자동 삽입**: faker.js를 사용하여 요청을 보낼 시 request body에 사용자가 설정한 더미데이터의 유형대로 더미데이터 생성 및 삽입
- **baseUrl수정**:  주소를 수정하여 사용자가 원하는 서버로 테스트

### 💡 Mock Server 생성

- **서브 도메인 분리 :** 고유한 값인 해시키로 서브도메인을 생성하여 사용자별 목업서버 uri 분리
- **URL path + method 구별 :** path내에서 찾은 프로젝트의 Common URI를 제외하고 비트 연산을 통하여 모든 pathvariable의 상황을 찾아간다. 하지만 여기서 가장 같을때를 우선순위를 정하고 path를 찾게되면 해당하는 api로 선택한다.
- **PathVariable type 체크 :** 찾은 api의 Pathvariable의 위치와 변수 타입을 확인하고 일치하지않으면 500 ERROR을 반환한다.
- **Request Body 체크 :** api의 Response body의 리스트 타입, 변수 타입을 재귀를 통해 확인을 하고, 여기서 해당하는 이름이 없거나, 타입이 일치 하지 않을 경우 400 ERROR 을 반환한다.
- **Response Body 생성 :** 위의 상황들에서 통과가 되면 Response를 가짜 데이터로 생성한다. 재귀형태로 지정한 List의 사이즈와 Faker 설정으로 생성하여 객체를 반환한다.

### 💡 API문서 기반 스켈레톤 코드 생성

- **Initializer 생성**: 사용자가 입력한 API 명세서를 기반으로 Spring initializer와 동일한 기능을 하는 프로젝트 생성기를 제공한다 (Maven, Gradle 2가지 형태 제공)
- **Controller 생성:** API 명세서를 분석하여 표준화 된 템플릿을 기반으로 컨트롤러를 생성한다. 각 API 요구 사항에 따라 **`@PathVariable`**, **`@RequestParam`**, **`@RequestBody`** 등의 어노테이션을 조건적으로 적용하여 메서드를 구성한다.
- **DTO 생성:** API명세서 기반으로 중첩구조의 json body까지 재귀적으로 파싱하여 인자로 받을 수 있게 DTO를 생성한다.

<br/>

## 👩🏼‍💻 담당 역할

### 황정민 - Frontend

- 팀장
- 사용자 입력 유효성 검사 로직 작성
- API 생성 및 수정 페이지 제작

### 강대은 - Frontend

- UX/UI 및 페이지 제작
- 페이지 한글 번역

### 김범수 - Backend

- 인프라 (Blue-Green 무중단 배포)
- 스켈레톤 코드 생성 기능 구현

### 김보경 - Backend

- Mock Server
- DB 설계 및 관리

### 서정현 - Backend, Infrastructure

- 인프라(목업 서버 CICD 및 로드밸런서)
- DTO 생성 기능 구현

## 🖥 서비스 화면

<details>
<summary><h4 style="display:inline; margin-left:4px">로그인 페이지</h4></summary>
<img src="./img/main/main_1.png" alt="Image 1" />
<img src="./img/login/login_1.png" alt="Image 1" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">메인 페이지</h4></summary>
<img src="./img/home/home_1.png" alt="Image 1" />
<img src="./img/home/home_2.png" alt="Image 2" />
<img src="./img/home/home_3.png" alt="Image 3" />
<img src="./img/home/home_4.png" alt="Image 4" />
<img src="./img/home/home_5.png" alt="Image 5" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">API 조회 페이지</h4></summary>
<img src="./img/document/document_1.png" alt="Image 1" />
<img src="./img/document/document_2.png" alt="Image 2" />
<img src="./img/document/document_3.png" alt="Image 3" />
<img src="./img/document/document_4.png" alt="Image 4" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">그룹 생성 페이지</h4></summary>
<img src="./img/group/group_1.png" alt="Image 1" />
<img src="./img/group/group_2.png" alt="Image 2" />
<img src="./img/group/group_3.png" alt="Image 3" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">API 생성 페이지</h4></summary>
<img src="./img/api/api_create_1.png" alt="Image 1" />
<img src="./img/api/api_create_2.png" alt="Image 2" />
<img src="./img/api/api_create_3.png" alt="Image 3" />
<img src="./img/api/api_create_4.png" alt="Image 4" />
<img src="./img/api/api_create_5.png" alt="Image 5" />
<img src="./img/api/api_create_6.png" alt="Image 6" />
<img src="./img/api/api_create_7.png" alt="Image 7" />
<img src="./img/api/api_create_8.png" alt="Image 8" />
<img src="./img/api/api_create_9.png" alt="Image 9" />
<img src="./img/api/api_create_10.png" alt="Image 10" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">멤버 초대 페이지</h4></summary>
<img src="./img/member/member_1.png" alt="Image 1" />
<img src="./img/member/member_2.png" alt="Image 2" />
<img src="./img/member/member_3.png" alt="Image 3" />
<img src="./img/member/member_4.png" alt="Image 4" />
<img src="./img/member/member_5.png" alt="Image 5" />
<img src="./img/member/member_6.png" alt="Image 6" />
<img src="./img/member/member_7.png" alt="Image 7" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">API 테스트 페이지</h4></summary>
<img src="./img/api_test/api_test_1.png" alt="Image 1" />
<img src="./img/api_test/api_test_2.png" alt="Image 2" />
<img src="./img/api_test/api_test_3.png" alt="Image 3" />
<img src="./img/api_test/api_test_4.png" alt="Image 4" />
<img src="./img/api_test/api_test_5.png" alt="Image 5" />
<img src="./img/api_test/api_test_6.png" alt="Image 6" />
<img src="./img/api_test/api_test_7.png" alt="Image 7" />
<img src="./img/api_test/api_test_8.png" alt="Image 8" />
<img src="./img/api_test/api_test_9.png" alt="Image 9" />
<img src="./img/api_test/api_test_10.png" alt="Image 10" />
<img src="./img/api_test/api_test_11.png" alt="Image 11" />
<img src="./img/api_test/api_test_12.png" alt="Image 12" />
</details>

<details>
<summary><h4 style="display:inline; margin-left:4px">Spring Initializer 페이지</h4></summary>
<img src="./img/initializer/initializer_1.png" alt="Image 1" />
<img src="./img/initializer/initializer_2.png" alt="Image 2" />
<img src="./img/initializer/initializer_3.png" alt="Image 3" />
<img src="./img/initializer/initializer_4.png" alt="Image 4" />
<img src="./img/initializer/initializer_5.png" alt="Image 5" />
<img src="./img/initializer/initializer_6.png" alt="Image 6" />
<img src="./img/initializer/initializer_7.png" alt="Image 7" />
<img src="./img/initializer/initializer_8.png" alt="Image 8" />
</details>

------

## 🛠 기술 스택

<div align="center">
  <!-- 백엔드 -->
  <div><strong>Backend</strong> </div>
  <img src="https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/-SpringBoot-6DB33F?style=flat-square&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/-JPA-FFCA28?style=flat-square&logo=jpa&logoColor=white">
  <img src="https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white">
  <img src="https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis&logoColor=white">
  <br/>
  <br/>
  <div><strong>Frontend</strong> </div>
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javaScript&logoColor=white">
  <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/-Tailwind CSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white">
  <img src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=Vite&logoColor=white">
  <img src="https://img.shields.io/badge/-Zustand-433D37?style=flat-square&logoColor=white">
  <br/>
  <br/>
  <div><strong>Infrastructure</strong> </div>
  <img src="https://img.shields.io/badge/-EC2-FF9900?style=flat-square&logo=AmazonEC2&logoColor=white">
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/-Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white">
  <img src="https://img.shields.io/badge/-nginx-009639?style=flat-square&logo=nginx&logoColor=white">
</div>

<br/>

## 📝 설계 문서

### 🏗️ 아키텍쳐

<img alt="Architecture" src="./img/architecture.png" />

<br />

### 🏗️ ERD

<img alt="ERD" src="./img/ERD.png" />

<br />

### API 명세서

[API 명세서 노션 링크](https://www.notion.so/API-629eac135d0648b4b762ef5bb89bb66d?pvs=21)
<br />

------

## 📚 컨벤션

### Git Commit Convention

Commit 메세지 구조
- ex) ✨ feat : Add sign in page

## Git flow

- ex) **feature/{이슈 요약}**
- **master** / **main** - 제품으로 출시 및 배포가 가능한 상태인 브랜치 → 최종 결과물 제출 용도
- **develop** - 다음 출시 버전을 개발하는 브랜치 → 기능 완성 후 중간에 취합하는 용도
- **feature** - 각종 기능을 개발하는 브랜치 → feat/login, feat/join 등으로 기능 분류 후 작업
- **hotfix** - 출시 버전에서 발생한 버그를 수정하는 브랜치
- 

### Coding

[Frontend 코딩컨벤션](https://www.notion.so/FE-9c4aceb8bf5f40969fe6aad933d0368a?pvs=21) 

[Backend 코딩컨벤션](https://www.notion.so/3381a3c2d2914cc8bf7961516f22d730?pvs=21)

