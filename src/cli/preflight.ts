import { CommandModule } from "yargs";
import { run } from "./core/run";

export const PreflightCommand: CommandModule = {
  command: "preflight",
  describe: "Run full validation: CI test, dist test, license, deps, size",
  builder: {},
  async handler() {
    await run("npm", ["run", "test:ci"]);
    await run("undercroft-tools", ["check:licenses"]);
    await run("undercroft-tools", ["check:dependencies"]);
    await run("undercroft-tools", ["check:size"]);
  },
};
