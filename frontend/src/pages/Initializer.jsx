import { useEffect, useState } from "react";
import Radio from "../components/Radio";
import initializerOptions from "../constants/initializerOptions";
import Button from "../components/button/Button";
import downloadSpringInitializer from "../apis/initializer";
import DependencyBox from "../components/DependencyBox";
import { useModalStore, useProjectStore } from "../store";
import DependencyModal from "../components/modal/DependencyModal";
import { useParams, useSearchParams } from "react-router-dom";
import { getProjectDetail } from "../apis/project";
import { useLanguage } from "../contexts/LanguageContext";
import Spinner from "../components/Spinner";

export default function Initializer() {
  const { openModal } = useModalStore();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState();
  const [initializerSetting, setInitializerSetting] = useState({
    project: "Gradle-Groovy",
    language: "Java",
    springBoot: "3.2.5",
    group: "",
    artifact: "",
    name: "",
    description: "",
    packageName: "",
    javaVersion: 17,
    packaging: "Jar",
    dependencies: [],
  });

  const { projectId } = useParams();
  const { project, setProject } = useProjectStore();

  useEffect(() => {
    if (!project) {
      getProjectDetail(projectId).then((data) => {
        setProject(data);
      });
    }
  }, [project]);

  const translations = {
    ko: {
      springInitializerSetting: "Spring 초기 설정",
      selectSettings:
        "Spring 초기 설정을 선택하여 새 Spring Boot 프로젝트를 구성하십시오",
      project: "프로젝트",
      language: "언어",
      springBoot: "Spring Boot",
      projectMetadata: "프로젝트 메타데이터",
      group: "그룹",
      artifact: "아티팩트",
      name: "이름",
      description: "설명",
      packageName: "패키지 이름",
      javaVersion: "자바 버전",
      packaging: "패키징",
      dependencies: "의존성",
      addDependencies: "의존성 추가",
      generate: "생성",
      lombok: {
        name: "Lombok",
        description:
          "보일러 플레이트 코드를 줄이는 데 도움이 되는 Java 어노테이션 라이브러리입니다.",
      },
      springWeb: {
        name: "Spring Web",
        description:
          "Spring MVC를 사용하여 RESTful 응용 프로그램을 포함한 웹을 빌드합니다. 기본 임베디드 컨테이너로 Apache Tomcat을 사용합니다.",
      },
    },
    en: {
      springInitializerSetting: "Spring Initializer Setting",
      selectSettings:
        "Select your preferred settings on Spring Initializer to configure your new Spring Boot project",
      project: "Project",
      language: "Language",
      springBoot: "Spring Boot",
      projectMetadata: "Project Metadata",
      group: "Group",
      artifact: "Artifact",
      name: "Name",
      description: "Description",
      packageName: "Package Name",
      javaVersion: "Java Version",
      packaging: "Packaging",
      dependencies: "Dependencies",
      addDependencies: "Add Dependencies",
      generate: "Generate",
      lombok: {
        name: "Lombok",
        description:
          "Java annotation library which helps to reduce boilerplate code.",
      },
      springWeb: {
        name: "Spring Web",
        description:
          "Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.",
      },
    },
  };

  const t = translations[language];

  const openDependencyModal = () => {
    openModal(t.addDependencies, <DependencyModal />, {
      dependencies: initializerSetting.dependencies,
      setDependencies: (dependencies) => {
        setInitializerSetting({
          ...initializerSetting,
          dependencies,
        });
      },
    });
  };

  const changeHandler = (key, value) => {
    setInitializerSetting((setting) => {
      const newSetting = { ...setting };
      newSetting[key] = value;
      return newSetting;
    });
  };

  const projectMetaDataClassName = {
    container: "flex space-x-[15px] items-center",
    text: "w-[120px] text-right",
    input: "grow h-[30px] p-2 rounded-[4px] border-2 border-gray-500",
  };

  const onClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    downloadSpringInitializer({
      projectId,
      initializerSetting,
      projectName: project.projectName,
    })
      .then((data) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDependency = (idx) => {
    setInitializerSetting({
      ...initializerSetting,
      dependencies: [
        ...initializerSetting.dependencies.slice(0, idx),
        ...initializerSetting.dependencies.slice(
          idx + 1,
          initializerSetting.dependencies.length,
        ),
      ],
    });
  };

  useEffect(() => {
    setInitializerSetting({
      ...initializerSetting,
      packageName: `${initializerSetting.group}.${initializerSetting.artifact}`,
    });
  }, [initializerSetting.group]);

  useEffect(() => {
    setInitializerSetting({
      ...initializerSetting,
      name: initializerSetting.artifact,
      packageName: `${initializerSetting.group}.${initializerSetting.artifact}`,
    });
  }, [initializerSetting.artifact]);

  return (
    <div className="flex h-full grow-0 flex-col items-start overflow-y-scroll px-12 py-10 pb-40">
      <div className="text-1 font-semibold leading-normal">
        {project.projectName}
      </div>
      <div className="mt-8 flex flex-col space-y-[27px] px-20">
        <div>
          <h2 className="leading-normal">{t.springInitializerSetting}</h2>
          <h4 className="leading-normal text-gray-500">{t.selectSettings}</h4>
        </div>
        <div>
          <h3 className="mb-2 leading-normal">{t.project}</h3>
          <Radio
            value={initializerSetting.project}
            options={initializerOptions.project}
            changeHandler={(value) => {
              changeHandler("project", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 leading-normal">{t.language}</h3>
          <Radio
            value={initializerSetting.language}
            options={initializerOptions.language}
            changeHandler={(value) => {
              changeHandler("language", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 leading-normal">{t.springBoot}</h3>
          <Radio
            value={initializerSetting.springBoot}
            options={initializerOptions.springBoot}
            changeHandler={(value) => {
              changeHandler("springBoot", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-1 leading-normal">{t.projectMetadata}</h3>
          <div className="flex w-[750px] flex-col space-y-[15px] text-[14px] leading-normal">
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>{t.group}</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.group}
                onChange={(e) => {
                  changeHandler("group", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>{t.artifact}</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.artifact}
                onChange={(e) => {
                  changeHandler("artifact", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>{t.name}</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.name}
                onChange={(e) => {
                  changeHandler("name", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>
                {t.description}
              </div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.description}
                onChange={(e) => {
                  changeHandler("description", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>
                {t.packageName}
              </div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.packageName}
                onChange={(e) => {
                  changeHandler("packageName", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>
                {t.javaVersion}
              </div>
              <div className="w-full">
                <Radio
                  value={initializerSetting.javaVersion}
                  options={initializerOptions.javaVersion}
                  changeHandler={(value) => {
                    setInitializerSetting((setting) => {
                      return {
                        ...setting,
                        javaVersion: value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>{t.packaging}</div>
              <div className="w-full">
                <Radio
                  value={initializerSetting.packaging}
                  options={initializerOptions.packaging}
                  changeHandler={(value) => {
                    setInitializerSetting((setting) => {
                      return {
                        ...setting,
                        packaging: value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h3 className="mb-1 leading-normal">{t.dependencies}</h3>
            <button
              className="flex items-center text-gray-500 duration-200 hover:text-gray-700"
              type="button"
              onClick={openDependencyModal}
            >
              <span className="mb-[2px] mr-1 text-3">+</span>{" "}
              {t.addDependencies}
            </button>
          </div>
          <div className="ml-1 mt-2 flex flex-col space-y-2">
            <DependencyBox
              name={t.lombok.name}
              description={t.lombok.description}
              fixed
            />
            <DependencyBox
              name={t.springWeb.name}
              description={t.springWeb.description}
              fixed
            />
            {initializerSetting.dependencies.map(
              ({ id, name, description }, idx) => (
                <DependencyBox
                  key={id}
                  name={name}
                  description={description}
                  deleteItem={() => {
                    deleteDependency(idx);
                  }}
                />
              ),
            )}
          </div>
        </div>
        <div className="ml-auto">
          {isLoading ? (
            <div className="flex h-[30px] w-[71px] cursor-auto items-center justify-center rounded-[10px] bg-gray-600">
              <Spinner
                style={{
                  width: "20px",
                }}
              />
            </div>
          ) : (
            <Button type={t.generate} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}
