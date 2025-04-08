const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/tests/**/*.test.tsx', '<rootDir>/src/tests/**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

module.exports = createJestConfig(customJestConfig);