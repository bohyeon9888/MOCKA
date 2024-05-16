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

export default function Initializer() {
  const { openModal } = useModalStore();
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

  const openDependencyModal = () => {
    openModal("Add Dependency", <DependencyModal />, {
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
    downloadSpringInitializer({
      projectId,
      initializerSetting,
      projectName: project.projectName,
    }).then((data) => {});
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
      <div className="text-1 font-semibold leading-normal">Project Name</div>
      <div className="mt-8 flex flex-col space-y-[27px] px-20">
        <div>
          <h2 className="leading-normal">Spring Initializer Setting</h2>
          <h4 className="leading-normal text-gray-500">
            Select your preferred settings on Spring Initializer to configure
            your new Spring Boot project
          </h4>
        </div>
        <div>
          <h3 className="mb-2 leading-normal">Project</h3>
          <Radio
            value={initializerSetting.project}
            options={initializerOptions.project}
            changeHandler={(value) => {
              changeHandler("project", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 leading-normal">Language</h3>
          <Radio
            value={initializerSetting.language}
            options={initializerOptions.language}
            changeHandler={(value) => {
              changeHandler("language", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 leading-normal">Spring Boot</h3>
          <Radio
            value={initializerSetting.springBoot}
            options={initializerOptions.springBoot}
            changeHandler={(value) => {
              changeHandler("springBoot", value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-1 leading-normal">Project Metadata</h3>
          <div className="flex w-[750px] flex-col space-y-[15px] text-[14px] leading-normal">
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Group</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.group}
                onChange={(e) => {
                  changeHandler("group", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Artifact</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.artifact}
                onChange={(e) => {
                  changeHandler("artifact", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Name</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.name}
                onChange={(e) => {
                  changeHandler("name", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Description</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.description}
                onChange={(e) => {
                  changeHandler("description", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Package Name</div>
              <input
                className={projectMetaDataClassName.input}
                value={initializerSetting.packageName}
                onChange={(e) => {
                  changeHandler("packageName", e.target.value);
                }}
              />
            </div>
            <div className={projectMetaDataClassName.container}>
              <div className={projectMetaDataClassName.text}>Java Version</div>
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
              <div className={projectMetaDataClassName.text}>Packaging</div>
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
            <h3 className="mb-1 leading-normal">Dependencies</h3>
            <button
              className="flex items-center text-gray-500 duration-200 hover:text-gray-700"
              type="button"
              onClick={openDependencyModal}
            >
              <span className="mb-[2px] mr-1 text-3">+</span> Add Dependencies
            </button>
          </div>
          <div className="ml-1 mt-2 flex flex-col space-y-2">
            <DependencyBox
              name={"Lombok"}
              description={
                "Java annotation library which helps to reduce boilerplate code."
              }
              fixed
            />
            <DependencyBox
              name={"Spring Web"}
              description={
                "Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container."
              }
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
          <Button type="Generate" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
