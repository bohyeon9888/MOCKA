const fakerJsMap = {
  String: {
    first: [
      "Word",
      "Phone",
      "Color",
      "Commerce",
      "Company",
      "Image",
      "Internet",
      "Date",
      "Location",
      "직접 입력",
    ],
    second: {
      Word: ["words", "adverb", "adjective", "noun", "verb", ""],
      Phone: ["number"],
      Color: ["cmyk", "hsl", "rgb"],
      Commerce: [
        "price",
        "product",
        "isbn",
        "productName",
        "productDescription",
        "department",
      ],
      Company: ["catchPhrase", "buzzNoun", "name"],
      Image: ["avatar", "dataUri", "url"],
      Internet: [
        "domainName",
        "email",
        "emoji",
        "httpMethod",
        "ipv4",
        "ipv6",
        "password",
        "port",
        "url",
        "userName",
      ],
      Date: ["anytime", "birthdate", "future", "past", "recent", "weekday"],
      Location: [
        "city",
        "country",
        "state",
        "street",
        "timeZone",
        "zipCode",
        "latitude",
        "longitude",
      ],
    },
  },
  Integer: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Integer"] },
    min: -2147483648,
    max: 2147483647,
  },
  Boolean: {
    first: ["Datatype", "직접 입력"],
    second: { Datatype: ["Boolean"] },
  },
  Long: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Long"] },
    min: BigInt("-9223372036854775807"),
    max: BigInt("9223372036854775808"),
  },
  Float: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Float"] },
    min: -3.4e5,
    max: 3.4e5,
  },
  Double: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Double"] },
    min: -1.8e10,
    max: 1.8e10,
  },
  Byte: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Byte"] },
    min: -128,
    max: 127,
  },
  Short: {
    first: ["Number", "직접 입력"],
    second: { Number: ["Short"] },
    min: -32768,
    max: 32767,
  },
  Character: {
    first: ["Character", "직접 입력"],
    second: { Character: ["Character"] },
  },
  Object: {
    first: ["Object"],
    second: { Object: ["Object"] },
  },
};

// const fakerJsMap = {
//   String: {
//     first: ["Word"],
//     second: { Word: ["Words"] },
//   },
//   Integer: {
//     first: ["Number"],
//     second: { Number: ["Integer"] },
//     min: -2147483648,
//     max: 2147483647,
//   },
//   Boolean: {
//     first: ["Boolean"],
//     second: { Boolean: ["Boolean"] },
//   },
//   Long: {
//     first: ["Number"],
//     second: { Number: ["Long"] },
//     min: BigInt("-9223372036854775807"),
//     max: BigInt("9223372036854775808"),
//   },
//   Float: {
//     first: ["Number"],
//     second: { Number: ["Float"] },
//     min: -3.4e38,
//     max: 3.4e38,
//   },
//   Double: {
//     first: ["Number"],
//     second: { Number: ["Double"] },
//     min: -1.8e308,
//     max: 1.8e308,
//   },
//   Byte: {
//     first: ["Number"],
//     second: { Number: ["Byte"] },
//   },
//   Short: {
//     first: ["Number"],
//     second: { Number: ["Short"] },
//   },
//   Character: {
//     first: ["Character"],
//     second: { Character: ["Character"] },
//   },
//   Object: {
//     first: ["Object"],
//     second: { Object: ["Object"] },
//   },
// };

export default fakerJsMap;
