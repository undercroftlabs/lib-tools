// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/cli/index.ts'],
    format: ['esm'],
    target: 'node18',
    outDir: 'bin',
    dts: false,
    clean: true,
    shims: true,
    splitting: false,
  },
  {
    entry: ['src/config/index.ts'],
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    dts: true,
    clean: false,
    splitting: false,
  },
]);
