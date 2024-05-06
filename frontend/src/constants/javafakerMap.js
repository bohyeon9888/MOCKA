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
  boolean: {
    major: ["bool"],
    sub: {
      bool: ["bool"],
    },
  },
  byte: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  char: {
    major: ["lorem"],
    sub: {
      lorem: ["character"],
    },
  },
  short: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  int: {
    major: ["number"],
    sub: {
      number: ["random"], 
    },
  },
  long: {
    major: ["number"],
    sub: {
      number: ["random"],
    },
  },
  float: {
    major: ["number"],
    sub: {
      number: ["random"], 
    },
  },
  double: {
    major: ["number"],
    sub: {
      number: ["random"], 
    },
  },
};

export default javafakerMap;
