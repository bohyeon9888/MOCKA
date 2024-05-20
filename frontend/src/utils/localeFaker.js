import { base, de, de_CH, en, Faker, ko } from "@faker-js/faker";

const customFaker = new Faker({
  locale: [ko, en, de_CH, de, base],
});

export default customFaker;
