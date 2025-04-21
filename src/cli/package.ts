import { CommandModule } from "yargs";
import { run } from "./core/run";

export const PackageCommand: CommandModule = {
  command: "package",
  describe: "Build and pack the library into a .tgz",
  builder: {},
  async handler() {
    await run("npm", ["run", "build"]);
    await run("npm", ["pack"]);
  },
};
