module.exports = {
  verbose: true,
  // Appended to the tests names
  displayName: {
    name: 'eProtocole', color: 'blue',
  },
  // Global variables
  "globals": {
    "__DEV__": true
  },
  // Global setup
  globalSetup: "<rootDir>/jest.global.setup.js",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  // activate code coverage measurements
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    "dist", "/node_modules/"
  ],
  // Define some specific coverage thresholds
  coverageThreshold: {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    },
    "./components/": {
      "branches": 40,
      "statements": 40
    },
    "./pages/": {
      "branches": 40,
      "statements": 40
    },
    // "./src/reducers/**/*.js": {
    //   "statements": 90
    // },
    // "./src/api/very-important-module.js": {
    //   "branches": 100,
    //   "functions": 100,
    //   "lines": 100,
    //   "statements": 100
    // }
  },
  // Testing in the browser vs Node.js
  testEnvironment: 'jsdom',
  setupFiles: [
  ],
  setupFilesAfterEnv: [
    './jest.setup.js'
  ]
}
