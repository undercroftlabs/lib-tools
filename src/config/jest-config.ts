import type { Config } from "jest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

interface UndercroftJestOptions {
  roots?: string[];
  coverageThreshold?: Config["coverageThreshold"];
  tsconfig?: string;
}

export function withUndercroftJestConfig(
  options: UndercroftJestOptions = {}
): Config {
  const transformerPath = require.resolve('@undercroft/lib-tools/config/fileTransformer');

  return {
    roots: options.roots || ["<rootDir>"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        transformerPath,
    },
    globals: {
      "ts-jest": {
        tsconfig: options.tsconfig || "tsconfig.json",
      },
    },
    coverageThreshold: options.coverageThreshold || {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  };
}
