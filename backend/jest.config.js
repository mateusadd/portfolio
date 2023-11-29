module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    coverageDirectory: './backend/coverage',
    collectCoverage: true,
    setupFiles: ["dotenv/config"]
}