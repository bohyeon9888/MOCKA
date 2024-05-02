/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        6: "8px",
        5: "12px",
        4: "15px",
        3: "20px",
        2: "24px",
        1: "40px",
      },
      fontFamily: {
        Pretendard: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
        Fira: ["Fira Mono", "Consolas"],
        Akshar: ["akshar", "Roboto"],
      },
      colors: {
        // Common Colors
        "primary-color": "#000000BF",
        "scondary-color": "#69AA6D",
        "gray-100": "#ECECED",
        "gray-300": "#D9D9D9",
        "gray-500": "#9D9D9D",
        "gray-600": "#5D5D5D",
        "gray-700": "#3E3E3F",
        "red-300": "#F93F3E",
        "green-500": "#69AA6D",
        // Code Colors
        "code-yellow": "#A6AD5F",
        "code-green": "#69AA6D",
        "code-gray": "#BBBDB4",
        "code-pink": "#C77DBB",
        "code-red": "#B65F37",
        "code-blue": "#51A7F4",
        // API Colors
        "get-color": "#00A2FF",
        "post-color": "#4ACB90",
        "put-color": "#FBA12F",
        "delete-color": "#F93F3E",
        "patch-color": "#4FE2C2",
        // Logo Colors
        "logo-cream-color": "#FEDBAB",
        "logo-cup-color": "#CAE8F9",
        "logo-bottom-color": "#528EB0",
        // Component Colors
        "background-color": "#F8F9FA",
        "box-border-color": "#ECECED",
        "modal-background-color": "#B1B1B180",
        "sidebar-division-color": "#8B8A8A66",
      },
    },
  },
  plugins: [],
};
