module.exports = {
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    setupFiles: ["dotenv/config"],
    transform: {
        "^.+\\.(js|ts)$": "babel-jest"
    },
    transformIgnorePatterns: []
}