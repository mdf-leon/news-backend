module.exports = {
  "roots": [
    "<rootDir>/webserver"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  // "testMatch": [
  //   "<rootDir>/tests/**/*.(test).{js,jsx,ts,tsx}",
  //   "<rootDir>/tests/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  // ],
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};