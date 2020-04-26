module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "moduleNameMapper": {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "testEnvironmentOptions": {
      "resources": "usable"
    },
  },
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}