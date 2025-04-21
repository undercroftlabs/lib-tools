import type { Options } from 'tsup';

export function withUndercroftTsupConfig(userOptions: Options): Options {
  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    target: 'node18',
    sourcemap: true,
    clean: true,
    dts: true,
    minify: true,
    ...userOptions,
  };
}