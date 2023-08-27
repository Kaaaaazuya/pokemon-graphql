module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "prettier",
    "next",
  ],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};
