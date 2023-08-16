/** @type {import('tailwindcss').Config} */
import withMt from "@material-tailwind/react/utils/withMT";
import scrollBarHide from "tailwind-scrollbar-hide";
export default withMt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {},
      height: {
        "100vh": "100vh",
      },
      backgroundColor: {
        kakao: "#FEE500",
        githup: "#444444",
      },
    },
  },
  plugins: [scrollBarHide],
});
