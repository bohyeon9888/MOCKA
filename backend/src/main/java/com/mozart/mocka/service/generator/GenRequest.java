package com.mozart.mocka.service.generator;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mozart.mocka.domain.ApiRequest;
import com.mozart.mocka.repository.ApiRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class GenRequest {
    private final ApiRequestRepository apiRequestRepository;
    private static final String whiteSpace = "    ";

    public String makeStrObject(String dtoClassName, String springPackageName, Long apiId,String dir) throws Exception{
        List<ApiRequest> apiRequests=apiRequestRepository.findByApiProject_ApiId(apiId);

        HashMap<String, String> appendedClassList = new HashMap<String,String>();

        appendedClassList.put(dtoClassName,"package " + springPackageName +";\n");
        String importList=addDefaultPackage("");
        String classOuterString=addAnnotation("public class "+dtoClassName+"{"+"\n");
        String classInnerString="";

        if(apiRequests.isEmpty()) {
            log.info("null");
        }
        else {
            Set<String> fieldNameList = new HashSet<String>();
            for (ApiRequest apiRequest : apiRequests) {
                //필드네임 정하기
                String fieldName=apiRequest.getKey().substring(0, 1).toLowerCase() + apiRequest.getKey().substring(1);
                if( fieldNameList.contains(fieldName)){
                    fieldName=fieldName+"Copy";
                    fieldNameList.add(fieldName);
                }else{
                    fieldNameList.add(fieldName);
                }

                if(apiRequest.getType().equals("Object")){
                    //클래스 이름 정하기
                    String className=apiRequest.getKey().substring(0, 1).toUpperCase() + apiRequest.getKey().substring(1);
                    if (appendedClassList.containsKey(className)){
                        className=className+"Copy";
                    }
                    importList=importList+"import "+springPackageName+"."+className+";"+"\n";

                    //data안의 json을 로드 후 map으로 변환
                    List<Map<String, Object>> dataMap =
                            new ObjectMapper().readValue(apiRequest.getData(), new TypeReference<List<Map<String, Object>>>(){});
                    makeInnerClass(dataMap,className,appendedClassList,springPackageName);

                    String type=className;

                    if(apiRequest.getArrayList()){
                        type="List<"+type+">";
                    }
                    String instanceVariable="private"+" "+type+" "+fieldName+";"+"\n";

                    classInnerString=classInnerString+instanceVariable;
                }else{
                    String type=apiRequest.getType();
                    if(apiRequest.getArrayList()){
                        type="List<"+type+">";
                    }
                    String instanceVariable="private"+" "+type+" "+fieldName+";"+"\n";
                    classInnerString=classInnerString+instanceVariable;
                }
            }
        }
        appendedClassList.put(dtoClassName,appendedClassList.get(dtoClassName)+importList+classOuterString+getDeepWhiteSpace(classInnerString,1)+"}"+"\n");

        String result="";
        for( Map.Entry<String, String> elem : appendedClassList.entrySet() ){
            BufferedWriter writer = new BufferedWriter(new FileWriter(dir+"/"+elem.getKey()+".java"));
            System.out.println(elem.getValue());
            writer.write(elem.getValue());
            writer.close();
        }

        return result;
    }
    public void makeInnerClass(List<Map<String, Object>> dataList,String className,HashMap<String, String> appendedClassList,String packageName){
        appendedClassList.put(className,"package " + packageName +";\n");
        String importList=addDefaultPackage("");
        String classOuterString=addAnnotation("public class "+className+"{"+"\n");
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
                if (appendedClassList.containsKey(innerClassName)) {
                    innerClassName = innerClassName + "Copy";
                }
                importList=importList+"import "+packageName+"."+innerClassName+";"+"\n";

                List<Map<String, Object>> valueMap=(List<Map<String,Object>>)data.get("value");
                makeInnerClass(valueMap,innerClassName,appendedClassList,packageName);

                type=innerClassName;
                if((boolean) data.get("arrayList")){
                    type="List<"+type+">";
                }
                String instanceVariable="private"+" "+type+" "+fieldName+";"+"\n";

                classInnerString=classInnerString+instanceVariable;
            }else{
                if(isArray){
                    type="List<"+type+">";
                }
                String instanceVariable="private"+" "+type+" "+fieldName+";"+"\n";
                classInnerString=classInnerString+instanceVariable;
            }
        }
        appendedClassList.put(className,appendedClassList.get(className)+importList+classOuterString+getDeepWhiteSpace(classInnerString,1)+"}"+"\n");
    }


    public static String addDefaultPackage(String content){
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
