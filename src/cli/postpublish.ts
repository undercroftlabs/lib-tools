import { CommandModule } from "yargs";
import { run } from "./core/run";

export const PostPublishCommand: CommandModule = {
    command: 'postpublish',
    describe: 'Re-enable Git hooks after publishing',
    builder: {},
    async handler() {
      await run('pinst', ['--enable']);
    },
  };
  