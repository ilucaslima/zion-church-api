/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: [
    "**/__test__/**/*.ts",
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts",
  ],
};
