// src/commands/prepare-publish.ts
import { run } from './core/run';
import type { CommandModule } from 'yargs';

const PrepareCommand: CommandModule = {
  command: 'prepare',
  describe: 'Disable Git hooks and run dist tests before publishing',
  builder: {},
  async handler() {
    await run('pinst', ['--disable']);
  },
};

export default PrepareCommand;
