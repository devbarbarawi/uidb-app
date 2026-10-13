/** Dependencies published only as ES modules; they are compiled for Jest's CommonJS runtime. */
const esmOnly = ['react-router', '@remix-run/route-pattern'].join('|')

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
    [`node_modules/(${esmOnly})/.+\\.js$`]: '<rootDir>/test/esmDependencyTransform.cjs',
  },
  // node_modules are not transformed by default; let the ESM-only ones through.
  transformIgnorePatterns: [`/node_modules/(?!(${esmOnly})/)`],
  moduleNameMapper: {
    // Stylesheets (the font faces) have no exports; Jest cannot parse CSS.
    '\\.css$': '<rootDir>/test/styleMock.cjs',
    // Server-only dependency of React Router, published as .mjs only.
    '^cookie-es$': '<rootDir>/test/cookieEsStub.cjs',
  },
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx', '!src/**/*.d.ts'],
}
