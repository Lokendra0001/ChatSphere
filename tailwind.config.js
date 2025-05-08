// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        vibrate: "vibrate 0.3s linear infinite",
      },
    },
  },
};
