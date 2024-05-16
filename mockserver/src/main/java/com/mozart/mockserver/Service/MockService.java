package com.mozart.mockserver.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.javafaker.Faker;
import com.mozart.mockserver.domain.*;
import com.mozart.mockserver.dto.RequestApiDto;
import com.mozart.mockserver.dto.ResponseApiDto;
import com.mozart.mockserver.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MockService {
    private final ProjectRepository projectRepository;
    private final ApiPathRepository apiPathRepository;
    private final ApiProjectRepository apiProjectRepository;
    private final ApiRequestRepository apiRequestRepository;
    private final ApiResponseRepository apiResponseRepository;
    public Long getProjectId(String hashStr){
        return Long.parseLong(hashStr);
    }
    public String getHostName(URL url){
        String[] parts = url.getHost().split("\\.");
        System.out.println("host name : " + parts[0]);
        if (parts.length > 1)
            return parts[0];
        else
            return null;
    }

    public String getPath(URL url){
        String[] path = url.getPath().split("://");
        int index = path[path.length-1].indexOf("/");
        return path[path.length - 1].substring(index + 1);
    }

    public Long findApi(Projects project, URL url, String method) {
        String hash = "34e1c029fab";
        String path = getPath(url);
        int questionMarkIndex = path.indexOf('?');
        if (questionMarkIndex != -1) {
            path = path.substring(0, questionMarkIndex);
        }
        //baseUrl check
        String commonUri = project.getCommonUri();
        if(commonUri.length() > 0)
            commonUri = commonUri.substring(1);
        if (path.contains(commonUri)) {
            path = path.replaceFirst(commonUri,"");
            if(path.length() > 0 && path.charAt(0) == '/')
                path = path.substring(1);
            log.info(path);
        }
        else {
            return -1L;
        }



        String[] pathArray = path.split("/");

        int number = pathArray.length;
        log.info(String.valueOf(number));
        for (int i = (1 << number) - 1 ; i >= 0 ; i--) {

            StringBuilder pathUrl = new StringBuilder();
            String numString = Integer.toBinaryString(i);

            if(number > numString.length())
                for (;numString.length() < number;)
                    numString = "0" + numString;
            for (int j = 0; j < number; j++) {
                if(numString.charAt(j) == '1')
                    pathUrl.append(pathArray[j]);
                else
                    pathUrl.append(hash);
                pathUrl.append(".");
            }
            log.info("--" + i);
            log.info(pathUrl.substring(0, pathUrl.length()-1));
            log.info("--");
            Optional<ApiProjects> apiProjects = apiProjectRepository.findByApiUri(project.getProjectId(), method, pathUrl.substring(0, pathUrl.length()-1));


            if(apiProjects.isPresent()){
                ApiProjects apiProject = apiProjects.get();
                log.info("pathVal");
                return pathVariableCheck(apiProject, path, numString);
            }
        }

        return -1L;
    }

    private Long pathVariableCheck(ApiProjects apiProject, String substring, String subnet) {
        List<ApiPath> apiPathList = apiPathRepository.findByApiProject_ApiId(apiProject.getApiId());

        int pathCnt = 0;
        //pathvar과 0의 갯수가 같은지확인.
        for (int i = 0; i < subnet.length(); i++) {
            if(subnet.charAt(i) == '0')
                pathCnt++;
        }
        if(pathCnt != apiPathList.size())
            return 0L;

        String fullUrl = apiProject.getApiUriStr();
        if(fullUrl.charAt(0) == '/')
            fullUrl = fullUrl.substring(1);
        String[] path = fullUrl.split("/");
        String[] inputPath = substring.split("/");
        for (ApiPath apiPath : apiPathList) {
            for(int i = 0 ; i < path.length ; i++){
                if(path[i].contains(apiPath.getKey())){
                    //그 자리가 path로 되어 있는지
                    if(subnet.charAt(i) == '1')
                        return 0L;
                    // type이 맞는지
                    try {
                        typeCheck(apiPath.getData(),inputPath[i]);
                    }catch (NumberFormatException ignored) {
                        return 0L;
                    }
                }
            }
        }
        return apiProject.getApiId();
    }
    public void typeCheck(String type, String str) throws NumberFormatException{
        switch (type){
            case "String":
                break;
            case "short", "Short":
                short s = Short.parseShort(str);
                break;
            case "int", "Integer":
                int num = Integer.parseInt(str);
                break;
            case "long","Long":
                long l = Long.parseLong(str);
                break;
            case "float", "Float":
                float f = Float.parseFloat(str);
                if (!str.contains("."))
                    throw new NumberFormatException();
                break;
            case "double", "Double":
                double d = Double.parseDouble(str);
                if (!str.contains("."))
                    throw new NumberFormatException();
                break;
            case "boolean", "Boolean":
                if (!str.equalsIgnoreCase("true") && !str.equalsIgnoreCase("false"))
                    throw new NumberFormatException();
                break;
            case "char","Character":
                if (str.length() != 1)
                    throw new NumberFormatException();
                break;
            case "byte","Byte":
                byte b = Byte.parseByte(str);
                break;
        }
    }

    public boolean requestCheck(Long projectId, Long apiId, HttpServletRequest request) throws IOException {
        List<ApiRequest> apiRequestList = apiRequestRepository.findByApiProject_ApiId(apiId);
        if(apiRequestList.isEmpty())
            return true;
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        BufferedReader reader = request.getReader();

        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line).append("\n");
        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map;
        try {
            map = mapper.readValue(stringBuilder.toString(), Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return false;
        }
        log.info("api size" + apiRequestList.size());
        for (ApiRequest apiRequest :apiRequestList) {
            Object obj = map.get(apiRequest.getKey());
            log.info("obj.toString()");
            log.info(apiRequest.getType() + " / " + apiRequest.getKey());
            if(obj == null)
                return false;
            log.info(obj.toString());
            if(!requestParamCheck(RequestApiDto.builder()
                            .key(apiRequest.getKey())
                    .type(apiRequest.getType())
                    .arrayList(apiRequest.getArrayList())
                    .fakerLocale(apiRequest.getFakerLocale())
                    .fakerMajor(apiRequest.getFakerMajor())
                    .fakerSub(apiRequest.getFakerSub())
                    .value(apiRequest.getData())
                    .build(), obj))
                return false;
        }
        return true;
    }

    private boolean requestParamCheck(RequestApiDto apiRequest, Object obj) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        log.info("requestParamCheck" + obj.toString() + "/" + apiRequest.getKey());
        //object type
        if(apiRequest.getType().equals("Object")){
            List<RequestApiDto> apiRequestList;
            try {
                log.info("object / " + apiRequest.getValue() + "/" + apiRequest.getKey() +"/");
                //object의 request 형식 저장
                apiRequestList = mapper.readValue(apiRequest.getValue(), new TypeReference<List<RequestApiDto>>() {});
                log.info("is Error?" + apiRequestList.size());
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
            // 입력받은 데이터 리스트 저장
            List<Object> objectList = new ArrayList<>();
            log.info("1");
            if(apiRequest.isArrayList()){
                objectList = (List<Object>) obj;
            }
            else {
                objectList.add(obj);
            }
            log.info("2");
//            Map<String, Object> map = (Map<String, Object>) obj;
            for (Object list : objectList){
                Map<String, Object> map = (Map<String, Object>) list;
                for (RequestApiDto request :apiRequestList) {
                    Object innerObj = map.get(request.getKey());

                    log.info("object list");
                    if(!requestParamCheck(request,innerObj))
                        return false;
                }
            }

        }
        else{ // int, long ,, 등
            log.info("not object");
            log.info(obj.toString());
            log.info(apiRequest.isArrayList() + " / " + apiRequest.getKey());
            List<Object> objectList = new ArrayList<>();

            if(apiRequest.isArrayList()){
                try {
                    System.out.println("i");
                    objectList = (List<Object>) obj;
                    System.out.println("h");
                }catch (ClassCastException e){
                    return false;
                }

            }else {
                objectList.add(obj);
            }

            for (Object object : objectList){
                String str = object.toString();
                log.info(str);
//                String str = mapper.readTree((JsonParser) object).get(apiRequest.getKey()).toString();
                try{
                    typeCheck(apiRequest.getType(), str);

                }catch (NumberFormatException ignored) {
                    return false;
                }
            }
        }
        return true;
    }

    public Object createMock(Long apiId) {
        log.info("createMock");

        //project 확인
        Optional<ApiProjects> apiProjects = apiProjectRepository.findById(apiId);
        if(apiProjects.isEmpty())
            return null;

        //request 정보 get
        List<ApiResponse> apiResponseList = apiResponseRepository.findByApiProject_ApiId(apiId);
        ObjectMapper mapper = new ObjectMapper();

        //request 가 배열일 경우
        if(apiProjects.get().isApiResponseIsArray()){
            List<ObjectNode> resultList = new ArrayList<>();

            //list 갯수 만큼 생성
            for (int i = 0; i < apiProjects.get().getApiResponseSize(); i++) {
                ObjectNode temp = mapper.createObjectNode();
                for (ApiResponse response : apiResponseList) {
                    if(!response.getType().equals("Object"))
                        temp.put(response.getKey(),generateFakeData(response.getFakerLocale(),response.getFakerMajor(), response.getFakerSub(), response.getType()));
                    else //object
                        temp.put(response.getKey(),getObject(response));
                }
                resultList.add(temp);
            }
            return resultList;
        }
        else { // request가 객체일 경우
            ObjectNode result = mapper.createObjectNode();
            for (ApiResponse response : apiResponseList) {
                log.info(response.getKey() + response.getArrayList() + response.getType());
                if(response.getArrayList()){
                    List<JsonNode> list = new ArrayList<>();
                    for (int i = 0; i < response.getArraySize(); i++) {
                        list.add(getObject(response));
                    }
                    result.put(response.getKey(), list.toString());
                }
                else {
                    if(response.getType().equals("Object"))
                        result.put(response.getKey(),getObject(response));
                    else
                        result.put(response.getKey(),generateFakeData(response.getFakerLocale(),response.getFakerMajor(),response.getFakerSub(), response.getType()));
                }
            }
            return result;
        }
    }

    public JsonNode getObject(ApiResponse response){
        log.info("jsonString : " + response.getData());
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode result = mapper.createObjectNode();
//        if(!response.getType().equals("Object")){
//            result.put(response.getKey(), generateFakeData(response.getFakerLocale(),response.getFakerMajor(), response.getFakerSub(), response.getType()));
//            return result;
//        }
        List<ResponseApiDto> apiResponseList;

        //api responseList check
        try {apiResponseList = mapper.readValue(response.getData(), new TypeReference<List<ResponseApiDto>>() {});
        } catch (Exception e) {
            try {
                String jsonString = mapper.writeValueAsString(response.getData());

                List<Map<String, String>> mapList = parseStringToMapList(jsonString);
                jsonString = "[" + mapper.writeValueAsString(mapList).replace("[","").replace("]","") + "]";
                apiResponseList = mapper.readValue(jsonString, new TypeReference<List<ResponseApiDto>>() {});
            }catch (Exception exception){
                log.info("is exception");
                return null;
            }
        }

        //object가 list 일때
        if(response.getArrayList()){ //list
            List<ObjectNode> resultList = new ArrayList<>();
            log.info("list");
            log.info(response.getKey() +response.getArrayList()+ response.getArraySize() );
            if(response.getArraySize() < 0)
                response.setArraySize(2);
            for (int i = 0; i < response.getArraySize(); i++) {
                log.info("1");
                ObjectNode temp = mapper.createObjectNode();
                for (ResponseApiDto responseNode : apiResponseList) {
                    log.info("2");
                    if(!responseNode.getType().equals("Object"))
                        temp.put(responseNode.getKey(),generateFakeData(responseNode.getFakerLocale(),responseNode.getFakerMajor(), responseNode.getFakerSub(), responseNode.getType()));
                    else {
                        if(response.getArrayList()){
                            List<JsonNode> array1 = new ArrayList<>();

                        }else{

                        }
                        temp.put(responseNode.getKey(),getObject(new ApiResponse
                                (null, responseNode.getKey(), responseNode.getType(), responseNode.getValue(), responseNode.getFakerLocale(),
                                        responseNode.getFakerMajor(), responseNode.getFakerSub(), responseNode.getArrayList(), responseNode.getArraySize())));
                    }

                }
                log.info("3");
                resultList.add(temp);
            }
            log.info("4" + response.getArraySize());
            log.info(response.getData());
//            JsonNode jsonNode = mapper.valueToTree(resultList);
//            result.set("responseApiDtoList", mapper.valueToTree(resultList));
            // 리스트를 ArrayNode로 변환
            ArrayNode arrayNode = mapper.valueToTree(resultList);
            return mapper.valueToTree(resultList);
//            return result.put("adsafsdaf","safdsaf");
        }
        else { // not list
            for (ResponseApiDto responseNode : apiResponseList) {
                log.info("6");
                if(!responseNode.getType().equals("Object"))
                    result.put(responseNode.getKey(),generateFakeData(responseNode.getFakerLocale(),responseNode.getFakerMajor(), responseNode.getFakerSub(), responseNode.getType()));
                else
                    result.put(responseNode.getKey(),getObject(new ApiResponse
                            (null, responseNode.getKey(), responseNode.getType(), responseNode.getValue(), responseNode.getFakerLocale(),
                                    responseNode.getFakerMajor(), responseNode.getFakerSub(), responseNode.getArrayList(), responseNode.getArraySize())));

            }
            log.info("7");
            return result;
        }
    }

    public String generateFakeData(String local, String category, String method, String type) {
        Faker faker = findLocal(local);
        try {
            Object categoryObject = faker.getClass().getDeclaredMethod(category).invoke(faker);
            return (String) categoryObject.getClass().getDeclaredMethod(method).invoke(categoryObject);
        } catch (Exception e) {
//            System.out.println("/" + type);
            return switch (type.toUpperCase()){
                case "BOOLEAN" -> String.valueOf(faker.bool().bool());
                case "INT","INTEGER" -> Integer.toString(faker.hashCode());
                case "FLOAT", "DOUBLE" -> Double.toString(faker.number().randomDouble(2, 1, 100)); // 소수점 두 자리, 1에서 100 사이
                case "CHAR" -> Character.toString(faker.letterify("?").charAt(0));
                case "SHORT" -> Short.toString((short) faker.number().randomNumber(4, false));
                case "BYTE" -> Byte.toString((byte) faker.number().randomNumber(2, false));
                case "LONG" -> Long.toString(faker.number().randomNumber(10, false));
                case "STRING" -> faker.lorem().characters(10);
                default -> "null";
            };
        }
    }

    private Faker findLocal(String local) {
        if(local == null)
            return new Faker(Locale.ENGLISH);
        return switch (local) {
            case "EN", "ENGLISH" -> new Faker(Locale.ENGLISH);
            case "KO", "KOREAN" -> new Faker(Locale.KOREAN);
            case "GERMAN" -> new Faker(Locale.GERMAN);
            case "ITALIAN" -> new Faker(Locale.ITALIAN);
            case "JAPANESE" -> new Faker(Locale.JAPANESE);
            case "CHINESE" -> new Faker(Locale.CHINESE);
            default -> new Faker(Locale.ENGLISH);
        };
    }

    /*
    * postgresql에 저장된 value 부분이 map으로 저장되어 있어, map --> json 변환하는 함수
    * */
    private static List<Map<String, String>> parseStringToMapList(String data) {
        data = data.trim().substring(1, data.length() - 1);
        String[] items = data.split("\\}, \\{");
        List<Map<String, String>> mapList = new ArrayList<>();

        for (String item : items) {
            item = item.replace("{", "").replace("}", "");
            String[] pairs = item.split(", ");
            Map<String, String> map = new HashMap<>();
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                String key = keyValue[0].trim();
                String value = keyValue.length > 1 ? keyValue[1].trim() : "";
                map.put(key, value);
            }
            mapList.add(map);
        }

        return mapList;
    }
}
