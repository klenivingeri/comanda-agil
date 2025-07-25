export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel-test.config.js" }],
  },
  moduleFileExtensions: ["js", "jsx"],
};
