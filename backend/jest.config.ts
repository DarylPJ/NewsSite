import type {Config} from 'jest';

const config: Config = {
  modulePaths: ['<rootDir>'],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      //... // your other configurations here
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ["ts",
      "js"]
};

export default config;