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

    public void makeStrObject(String dtoClassName, String springPackageName, Long apiId) throws Exception{
        String packageName="package " + springPackageName + dtoClassName+";\n\n";
        List<ApiResponse> apiResponses=apiResponseRepository.findByApiProject_ApiId(apiId);
        String classString=addAnnotation("public class "+dtoClassName+"{"+"\n");
        if(apiResponses.isEmpty()) {
            log.info("null");
        }
        else {
            Set<String> appendedClassList = new HashSet<String>();
            for (ApiResponse apiResponse : apiResponses) {
                if(apiResponse.getType().equals("Object")){
                    String type=apiResponse.getKey().substring(0, 1).toUpperCase() + apiResponse.getKey().substring(1);
                    if (appendedClassList.contains(type)){
                        type=type+"_";
                        appendedClassList.add(type);
                    }else{
                        appendedClassList.add(type);
                    }
                    String fieldName=apiResponse.getKey().substring(0, 1).toLowerCase() + apiResponse.getKey().substring(1);
                    String instanceVariable;

                    if (apiResponse.getArrayList()){
                        instanceVariable="private "+"List<"+type+">"+" "+fieldName+";"+"\n";
                    }else{
                        instanceVariable="private "+type+" "+fieldName+";"+"\n";
                    }
                    List<Map<String, Object>> mapList =
                            new ObjectMapper().readValue(apiResponse.getData(), new TypeReference<List<Map<String, Object>>>(){});
                    classString=classString+getDeepWhiteSpace(instanceVariable+recurInnerClass(mapList,type,appendedClassList,1));

                }else{
                    String filedName=apiResponse.getKey().substring(0, 1).toLowerCase() + apiResponse.getKey().substring(1);
                    String instanceVariable=getDeepWhiteSpace("private "+apiResponse.getType()+" "+filedName+";"+"\n",1);
                    classString=classString+instanceVariable;
                }
            }
        }
        classString=classString+"}"+"\n";
        System.out.println("=========================");
        System.out.println(classString);
    }
    public String recurInnerClass(List<Map<String, Object>> dataList,String className,Set<String> appendedClassList,int deep){
        String classString=addAnnotation("public class "+className+"{"+"\n");
        System.out.println("============================= "+className);
        System.out.println(dataList.size());
        for (Map<String, Object> data:dataList){
            if(data.get("type").equals("Object")){
                String keyValue= (String) data.get("key");
                String type=keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1);
                if (appendedClassList.contains(type)){
                    type=type+"_";
                    appendedClassList.add(type);
                }else{
                    appendedClassList.add(type);
                }
                String fieldName=keyValue.substring(0, 1).toLowerCase() + keyValue.substring(1);
                String instanceVariable;
                if ((boolean) data.get("arrayList")){
                    instanceVariable="private "+"List<"+type+">"+" "+fieldName+";"+"\n";
                }else{
                    instanceVariable="private "+type+" "+fieldName+";"+"\n";
                }
                List<Map<String, Object>> mapList=(List<Map<String,Object>>)data.get("value");
                classString=classString+getDeepWhiteSpace(instanceVariable,1)+recurInnerClass(paramMap,type,appendedClassList,2);
            }else{

            }
        }
        System.out.println("=============================");
        classString=classString+"}"+"\n";
        return getDeepWhiteSpace(classString,deep);
    }
    public static String addAnnotation(String content){
        return "@NoArgsConstructor"+"\n"+
                "@AllArgsConstructor"+"\n"+
                "@Data"+"\n"+
                "@Builder"+"\n"+
                content;
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
