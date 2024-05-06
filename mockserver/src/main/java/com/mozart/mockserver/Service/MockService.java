package com.mozart.mockserver.Service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mockserver.domain.ApiPath;
import com.mozart.mockserver.domain.ApiProjects;
import com.mozart.mockserver.domain.ApiRequest;
import com.mozart.mockserver.repository.ApiPathRepository;
import com.mozart.mockserver.repository.ApiProjectRepository;
import com.mozart.mockserver.repository.ApiRequestRepository;
import com.mozart.mockserver.repository.ProjectRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MockService {
    private final ProjectRepository projectRepository;
    private final ApiPathRepository apiPathRepository;
    private final ApiProjectRepository apiProjectRepository;
    private final ApiRequestRepository apiRequestRepository;
    public Long getProjectId(String hashStr){
        return 16L;
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

    public Long findApi(Long projectId, URL url, String method) {
        String hash = "34e1c029fab";
        String path = getPath(url);
        System.out.println("path : " + path);
        String[] pathArray = path.split("/");

        int number = pathArray.length;
        for (int i = number * 2 - 1 ; i >= 0 ; i--) {

            StringBuilder pathUrl = new StringBuilder();
            String numString = Integer.toBinaryString(i);

            if(number > numString.length())
                for (;numString.length() < number;)
                    numString = "0" + numString;
            System.out.println("/" + numString + "/");
            for (int j = 0; j < number; j++) {
                if(numString.charAt(j) == '1')
                    pathUrl.append(pathArray[j]);
                else
                    pathUrl.append(hash);
                pathUrl.append(".");
            }
            System.out.println(pathUrl.substring(0, pathUrl.length()-1));

            Optional<ApiProjects> apiProjects = apiProjectRepository.findByApiUri(projectId, method, pathUrl.substring(0, pathUrl.length()-1));


            if(apiProjects.isPresent()){
                ApiProjects apiProject = apiProjects.get();
                System.out.println("123456789: "+apiProject.getApiUri());
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
            case "short":
                short s = Short.parseShort(str);
                break;
            case "int":
                int num = Integer.parseInt(str);
                break;
            case "long":
                long l = Long.parseLong(str);
                break;
            case "float":
                float f = Float.parseFloat(str);
                if (!str.contains("."))
                    throw new NumberFormatException();
                break;
            case "double":
                double d = Double.parseDouble(str);
                if (!str.contains("."))
                    throw new NumberFormatException();
                break;
            case "boolean":
                if (!str.equalsIgnoreCase("true") && !str.equalsIgnoreCase("false"))
                    throw new NumberFormatException();
                break;
            case "char":
                if (str.length() != 1)
                    throw new NumberFormatException();
                break;
            case "byte":
                byte b = Byte.parseByte(str);
                break;
        }

    }

    public boolean requestCheck(Long projectId, Long apiId, HttpServletRequest request) throws IOException {
        List<ApiRequest> apiRequestList = apiRequestRepository.findByApiProject_ApiId(apiId);
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
            System.out.println(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return false;
        }
        for (ApiRequest apiRequest :apiRequestList) {
            Object obj = map.get(apiRequest.getKey());
            if(obj == null)
                return false;
            if(!requestParamCheck(apiRequest,obj))
                return false;
        }
        return true;
    }

    private boolean requestParamCheck(ApiRequest apiRequest, Object obj) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(apiRequest.getKey() + " ///" + apiRequest.getData() +"----"+ obj.toString());

        //object type
        if(apiRequest.getType().equals("Object")){
            System.out.println("------OBJECT-----");
            List<ApiRequest> apiRequestList;
            try {
                //object의 request 형식 저장
                apiRequestList = mapper.readValue(apiRequest.getData(), new TypeReference<List<ApiRequest>>() {});
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
            // 입력받은 데이터 리스트 저장
            List<Object> objectList = new ArrayList<>();
            if(apiRequest.getArrayList()){
                objectList = (List<Object>) obj;
            }
            else {
                objectList.add(obj);
            }
//            Map<String, Object> map = (Map<String, Object>) obj;
            for (Object list : objectList){
                Map<String, Object> map = (Map<String, Object>) list;
                for (ApiRequest request :apiRequestList) {
                    Object innerObj = map.get(request.getKey());
                    System.out.println("****" + request.toString() + "***" + innerObj.toString());

                    if(!requestParamCheck(request,innerObj))
                        return false;
                }
            }

        }
        else{ // int, long ,, 등
            System.out.println("------not OBJECT-----" + obj.toString()+ "/" +apiRequest.getArrayList());
            List<Object> objectList = new ArrayList<>();
            if(apiRequest.getArrayList()){
                try {
                    objectList = (List<Object>) obj; ;
                }catch (ClassCastException e){
                    return false;
                }

            }else {
                System.out.println("====");
                objectList.add(obj);
            }
            System.out.println("==");

            for (Object object : objectList){
                String str = object.toString();
//                String str = mapper.readTree((JsonParser) object).get(apiRequest.getKey()).toString();
                try{
                    System.out.println("Str" +str + " //// type : " + apiRequest.getType());
                    typeCheck(apiRequest.getType(), str);

                }catch (NumberFormatException ignored) {
                    System.out.println("//");
                    return false;
                }
            }
        }
        return true;
    }

    public Object createMock(Long apiId) {
        return null;
    }
}
