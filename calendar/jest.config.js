module.exports = {
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    setupFiles: ["dotenv/config"],
    transform: {
        "^.+\\.(js|ts)$": "babel-jest"
    },
    transformIgnorePatterns: [
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(scss|sass|css)$": "identity-obj-proxy"
    }
}