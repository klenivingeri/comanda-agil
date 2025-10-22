import nextJest from "next/jest.js";
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^public/(.*)$": "<rootDir>/public/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

export default async function jestConfig() {
  return await createJestConfig(customJestConfig)();
}
