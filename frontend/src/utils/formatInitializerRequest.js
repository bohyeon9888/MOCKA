const typeMapping = {
  "Gradle-Groovy": "gradle",
  Maven: "maven",
};

const languageMapping = {
  Java: "java",
};

const packagingMapping = {
  Jar: "jar",
};

const formatInitializerRequest = (InitializerSetting) => {
  return {
    springType: typeMapping[InitializerSetting.project],
    springLanguage: languageMapping[InitializerSetting.language],
    springPlatformVersion: InitializerSetting.springBoot,
    springPackaging: packagingMapping[InitializerSetting.packaging],
    springJvmVersion: InitializerSetting.javaVersion,
    springGroupId: InitializerSetting.group,
    springArtifactId: InitializerSetting.artifact,
    springName: InitializerSetting.name,
    springDescription: InitializerSetting.description,
    springPackageName: InitializerSetting.packageName,
    springDependencyId: InitializerSetting.dependencies.map(({ id }) => id),
  };
};

export default formatInitializerRequest;
