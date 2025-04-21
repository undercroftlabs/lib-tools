import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import type { CommandModule } from 'yargs';
import { run } from './core/run';

const __dirname = path.resolve();

function configExists(filename: string): boolean {
  return fs.existsSync(path.resolve(process.cwd(), filename));
}

const BuildCommand: CommandModule = {
  command: 'build',
  describe: 'Builds the library using tsup and rollup',
  builder: {},
  async handler() {
    try {
      console.log('🔧 Running tsup...');

      const tsupConfig = configExists('tsup.config.js')
        ? 'tsup.config.js'
        : path.resolve(__dirname, '../../config/tsup.config.js');

      await run('tsup', ['--config', tsupConfig]);

      if (configExists('rollup.config.js')) {
        console.log('📦 Running rollup...');
        await run('rollup', ['-c']);
      } else {
        console.log('ℹ️ No rollup.config.js found. Skipping UMD build.');
      }

      console.log('✅ Build complete.');
    } catch (err) {
      console.error('❌ Build failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  },
};

export default BuildCommand;
