export default function combineClassName(...classes) {
  return classes.filter(Boolean).join(" ");
}
