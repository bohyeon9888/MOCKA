const javafakerMap = {
  String: {
    major: ["name", "address", "company", "phoneNumber", "lorem", "date"],
    sub: {
      name: ["firstName", "lastName", "fullName"],
      address: ["fullAddress", "city", "country"],
      company: ["name", "industry"],
      phoneNumber: ["phoneNumber"],
      lorem: ["sentence", "paragraph"],
      date: ["past", "future"],
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
