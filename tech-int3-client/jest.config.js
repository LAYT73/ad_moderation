/** @type {import('ts-jest').JestConfigWithTsJest} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const roots = ['<rootDir>/tests', '<rootDir>/src'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};
export const testMatch = [
  '**/tests/**/*.spec.ts',
  '**/tests/**/*.spec.tsx',
  '**/tests/**/*.test.ts',
  '**/tests/**/*.test.tsx',
];
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
