import { CommandModule } from 'yargs';
import { run } from './core/run';

export const TestCommand: CommandModule = {
  command: 'test',
  describe: 'Run Jest with shared config',
  builder: {},
  handler: async () => {
    await run('jest', []);
  },
};

export const CoverageCommand: CommandModule = {
  command: 'coverage',
  describe: 'Run Jest with coverage',
  builder: {},
  handler: async () => {
    await run('jest', ['--coverage']);
  },
};
