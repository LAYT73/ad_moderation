/** @type {import('ts-jest').JestConfigWithTsJest} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};
export const testMatch = ['**/__tests__/**/*.spec.ts', '**/__tests__/**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'];

export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
