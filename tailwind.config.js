/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],

  important: true,

  corePlugins: {
    preflight: false // Disable to let antd use its base style
  },

  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "black",
      white: "white",

      primary: "#1B3D72",

      neutral: {
        5: "#F9F9F9",
        10: "#F7F7F7",
        20: "#F3F3F3",
        25: "#EEEFF0",
        30: "#E2E2E2",
        40: "#9B9B9B",
        50: "#666666",
        60: "#333333"
      },

      purple: {
        10: "#F7F2FD",
        20: "#E6D9F2",
        30: "#C5ABDE",
        40: "#9062BC",
        50: "#75489F",
        60: "#4C1E78"
      },

      blue: {
        10: "#F1F4F8",
        20: "#D3E0F5",
        30: "#AFC1DC",
        40: "#1668A4",
        50: "#02527D",
        60: "#1B3D72"
      },

      green: {
        10: "#E8F8F0",
        20: "#BBE8C2",
        30: "#7FC39B",
        40: "#488173",
        50: "#216858"
      },

      red: {
        10: "#FFF0F3",
        20: "#FFD3DC",
        30: "#FF97A5",
        40: "#E22C3B",
        50: "#BD0010"
      },

      yellow: {
        10: "#FFF4D1",
        20: "#FFC405",
        30: "#FF961F",
        40: "#C75306",
        50: "#8B4D1D"
      }
    },

    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },

      lineHeight: {
        looser: "2.25rem",
        "super-loose": "3.375rem"
      },

      zIndex: {
        45: 45,
        1000: 1000,
        1050: 1050,
        9999: 9999
      },

      screens: {
        xs: "320px"
      },

      spacing: {
        68: "17rem",
        76: "19rem",
        84: "21rem",
        88: "22rem",
        92: "23rem",
        100: "25rem",
        104: "26rem",
        108: "27rem",
        112: "28rem",
        116: "29rem",
        120: "30rem",
        124: "31rem",
        128: "32rem",
        132: "33rem",
        136: "34rem",
        140: "35rem",
        144: "36rem",
        148: "37rem",
        152: "38rem",
        156: "39rem",
        160: "40rem",
        164: "41rem",
        168: "42rem",
        172: "43rem",
        176: "44rem",
        180: "45rem"
      },

      boxShadow: {
        "inner-md": "inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
      },

      borderWidth: {
        0.5: "0.5px"
      },

      cursor: {
        forbidden:
          "url(data:image/svg+xml,%3Csvg height='20' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='10' cy='10' rx='8' ry='8' fill='transparent' stroke='red' stroke-width='2'/%3E%3Cpath d='M 4 4 L 16 16' stroke='red' stroke-width='2'/%3E%3C/svg%3E), auto"
      }
    }
  },

  variants: {
    opacity: ["hover", "focus", "responsive"],
    borderColor: ["responsive", "hover", "active", "focus", "first", "last"],
    borderWidth: ["hover", "focus", "responsive", "first", "last"],
    padding: ["responsive", "first", "last"],
    backgroundColor: [
      "responsive",
      "hover",
      "active",
      "focus",
      "first",
      "last"
    ],
    boxShadow: ["responsive", "active", "hover", "focus"],
    textColor: ["responsive", "hover", "active", "focus", "first", "last"]
  }
};
