const initializerOptions = {
  project: [
    { value: "Gradle-Groovy", disabled: false },
    { value: "Gradle-Kotlin", disabled: true },
    { value: "Maven", disabled: false },
  ],
  language: [
    { value: "Java", disabled: false },
    { value: "Kotlin", disabled: true },
    { value: "Groovy", disabled: true },
  ],
  springBoot: [
    { value: "3.3.0 (SNAPSHOT)", disabled: true },
    { value: "3.3.0 (RC1)", disabled: true },
    { value: "3.2.6 (SNAPSHOT)", disabled: true },
    { value: "3.2.5", disabled: false },
    { value: "3.1.12 (SNAPSHOT)", disabled: true },
    { value: "3.1.11", disabled: false },
  ],
  javaVersion: [
    { value: 22, disabled: false },
    { value: 21, disabled: false },
    { value: 17, disabled: false },
  ],
  packaging: [
    { value: "Jar", disabled: false },
    { value: "War", disabled: false },
  ],
};

export default initializerOptions;
