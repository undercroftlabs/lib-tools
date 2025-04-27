import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { codecovRollupPlugin } from '@codecov/rollup-plugin';

export interface RollupConfigOptions {
  name: string;
  bundle: string;
  globals?: Record<string, string>;
  plugins?: any[];
  external?: string[];
}

export function withUndercroftRollupConfig(config: RollupConfigOptions) {
  return {
    input: 'dist/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: config.name,
      sourcemap: true,
      globals: {
        ...(config?.globals || {}),
      },
    },
    plugins: [
      ...(config?.plugins || []),
      resolve({
        preferBuiltins: false,  
      }),
      commonjs(),
      terser(),
      codecovRollupPlugin({
        enableBundleAnalysis: Boolean(process.env.CODECOV_TOKEN),
        bundleName: process.env.CODECOV_BUNDLE || config.bundle,
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
    external: config?.external || [],
  };
}