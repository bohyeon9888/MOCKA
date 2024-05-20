export default function formatDateString(dateString) {
  const date = new Date(dateString + "+00:00");
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const userLocale = navigator.language || "en-US";

  return new Intl.DateTimeFormat(userLocale, options).format(date);
}
