/** @type {import('jest').Config} */
export default {
  // jsdom plus Node's fetch, Response and Request, which plain jsdom lacks.
  testEnvironment: 'jest-fixed-jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node10',
          ignoreDeprecations: '6.0',
          esModuleInterop: true,
          isolatedModules: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
    // Assets become their file name, as Vite turns them into URLs.
    '\\.(svg|png)$': '<rootDir>/test/fileTransform.cjs',
  },
  moduleNameMapper: {
    // Stylesheets (the font faces) have no exports; Jest cannot parse CSS.
    '\\.css$': '<rootDir>/test/styleMock.cjs',
  },
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx', '!src/**/*.d.ts'],
}
