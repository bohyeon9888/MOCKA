package com.mozart.mocka.service.generator;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mocka.domain.ApiResponse;
import com.mozart.mocka.repository.ApiResponseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class GenResponse {
    private final ApiResponseRepository apiResponseRepository;
    private static final String whiteSpace = "    ";

    public String makeStrObject(String dtoClassName, String springPackageName, Long apiId) throws Exception{
        String packageName="package " + springPackageName +";\n";
        packageName=addPackage(packageName);
        List<ApiResponse> apiResponses=apiResponseRepository.findByApiProject_ApiId(apiId);
        String classOuterString=addAnnotation("public class "+dtoClassName+"{"+"\n");
        String classInnerString="";
        if(apiResponses.isEmpty()) {
            log.info("null");
        }
        else {
            Set<String> appendedClassNameList = new HashSet<String>();
            Set<String> fieldNameList = new HashSet<String>();
            for (ApiResponse apiResponse : apiResponses) {
                //필드네임 정하기
                String fieldName=apiResponse.getKey().substring(0, 1).toLowerCase() + apiResponse.getKey().substring(1);
                if( fieldNameList.contains(fieldName)){
                    fieldName=fieldName+"Copy";
                    fieldNameList.add(fieldName);
                }else{
                    fieldNameList.add(fieldName);
                }
                
                if(apiResponse.getType().equals("Object")){
                    //클래스 이름 정하기
                    String className=apiResponse.getKey().substring(0, 1).toUpperCase() + apiResponse.getKey().substring(1);
                    if (appendedClassNameList.contains(className)){
                        className=className+"Copy";
                        appendedClassNameList.add(className);
                    }else{
                        appendedClassNameList.add(className);
                    }
                    String type=className;
                    if(apiResponse.getArrayList()){
                        type="List<"+type+">";
                    }
                    String instanceVariable=type+" "+fieldName+";"+"\n";
                    //data안의 json을 로드 후 map으로 변환
                    List<Map<String, Object>> dataMap =
                            new ObjectMapper().readValue(apiResponse.getData(), new TypeReference<List<Map<String, Object>>>(){});
                    classInnerString=classInnerString+instanceVariable+makeInnerClass(dataMap,className,appendedClassNameList);
                }else{
                    String type=apiResponse.getType();
                    if(apiResponse.getArrayList()){
                        type="List<"+type+">";
                    }
                    String instanceVariable=type+" "+fieldName+";"+"\n";
                    classInnerString=classInnerString+instanceVariable;
                }
            }
        }
        return packageName+classOuterString+getDeepWhiteSpace(classInnerString,1)+"}"+"\n";
    }
    public String makeInnerClass(List<Map<String, Object>> dataList,String className,Set<String> appendedClassNameList){
        String classOuterString=addAnnotation("public static class "+className+"{"+"\n");
        String classInnerString="";
        Set<String> fieldNameList = new HashSet<String>();
        for (Map<String, Object> data:dataList){
            String keyValue= (String) data.get("key");
            String fieldName=keyValue.substring(0, 1).toLowerCase() + keyValue.substring(1);
            if( fieldNameList.contains(fieldName)){
                fieldName=fieldName+"Copy";
                fieldNameList.add(fieldName);
            }else{
                fieldNameList.add(fieldName);
            }
            String type=data.get("type").toString();
            boolean isArray=(boolean) data.get("arrayList");
            if(type.equals("Object")){
                //내부 클래스 이름 정하기
                String innerClassName=keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1);
                if (appendedClassNameList.contains(innerClassName)){
                    innerClassName=innerClassName+"Copy";
                    appendedClassNameList.add(innerClassName);
                }else{
                    appendedClassNameList.add(innerClassName);
                }
                type=innerClassName;
                if((boolean) data.get("arrayList")){
                    type="List<"+type+">";
                }
                String instanceVariable=type+" "+fieldName+";"+"\n";
                List<Map<String, Object>> valueMap=(List<Map<String,Object>>)data.get("value");

                classInnerString=classInnerString+instanceVariable+makeInnerClass(valueMap,innerClassName,appendedClassNameList);
            }else{
                if(isArray){
                    type="List<"+type+">";
                }
                String instanceVariable=type+" "+fieldName+";"+"\n";
                classInnerString=classInnerString+instanceVariable;
            }
        }
        return classOuterString+getDeepWhiteSpace(classInnerString,1)+"}"+"\n";
    }


    public static String addPackage(String content){
        return  content+"import lombok.AllArgsConstructor;"+"\n"+
                "import lombok.Builder;"+"\n"+
                "import lombok.Data;"+"\n"+
                "import lombok.NoArgsConstructor;"+"\n"+
                "import java.util.List;"+"\n";
    }
    public static String addAnnotation(String content){
        return  "@NoArgsConstructor"+"\n"+
                "@AllArgsConstructor"+"\n"+
                "@Data"+"\n"+
                "@Builder"+"\n"+
                content;
    }

    public static String getDeepWhiteSpace(String content,int deep){
        String[] lines=content.split("\n");
        System.out.println("============================go");
        System.out.println(Arrays.deepToString(lines)+lines.length);
        System.out.println("============================end");
        for(int i =0;i<lines.length;i++){
            lines[i]=whiteSpace.repeat(deep)+lines[i];
        }
        StringBuilder resultLines = new StringBuilder();
        for(String line : lines){
            resultLines.append(line);
            resultLines.append("\n");
        }
        return resultLines.toString();
    }
}
