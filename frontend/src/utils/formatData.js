export default function formatData(body) {
  if (!body) return null;
  return {
    key: body.key || "key",
    type: body.type || "String",
    arrayList: body.arrayList || false,
    arraySize: body.arraySize || -1,
    fakerLocale: body.fakerLocale || null,
    fakerMajor: body.fakerMajor || null,
    fakerSub: body.fakerSub || null,
    value:
      !body.value || body.value.length === 0
        ? null
        : body.value.map((v) => formatData(v)),
  };
}
