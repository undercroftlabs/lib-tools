import { CommandModule } from 'yargs';
import { spawn } from 'node:child_process';
import { run } from './core/run';

export const TestCICommand: CommandModule = {
  command: 'test:ci',
  describe: 'Run Jest in CI mode with coverage and JUnit output',
  builder: {},
  async handler() {
    try {
      await run('cross-env', [
        'JEST_JUNIT_CLASSNAME={filepath}',
        'jest',
        '--coverage',
        '--runInBand',
        '--reporters=default',
        '--reporters=jest-junit',
      ]);
    } catch (err) {
      console.error('❌ CI Test failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  },
};
