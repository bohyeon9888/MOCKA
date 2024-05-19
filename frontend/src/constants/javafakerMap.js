const javafakerMap = {
  String: {
    major: [
      "name",
      "address",
      "company",
      "phoneNumber",
      "lorem",
      "date",
      "internet",
      "file",
      "music",
      "country",
      "string",
      "crypto",
    ],
    sub: {
      name: ["firstName", "lastName", "fullName"],
      address: ["fullAddress", "city", "country"],
      company: ["name", "industry", "catchPhrase", "url", "logo"],
      phoneNumber: ["phoneNumber"],
      lorem: ["paragraph", "sentence", "word", "character"],
      date: ["past", "future"],
      internet: [
        "avatar",
        "domainName",
        "emailAddress",
        "image",
        "password",
        "ipV4Address",
        "url",
      ],
      file: ["extension", "fileName", "mimeType"],
      music: ["chord", "genre", "instrument", "key"],
      country: ["capital", "countryCode", "currency", "flag", "name"],
      string: ["uuid", "alpha", "binary", "numeric", "sample"],
      crypto: ["md5", "sha1", "sha256", "sha512"],
    },
  },
  Boolean: {
    major: ["bool"],
    sub: {
      bool: ["bool"],
    },
  },
  Byte: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  Character: {
    major: ["lorem"],
    sub: {
      lorem: ["character"],
    },
  },
  Short: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  Integer: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  Long: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  Float: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  Double: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
};

export default javafakerMap;
