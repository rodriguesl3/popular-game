const jestConfig = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" }
};
export default jestConfig;
