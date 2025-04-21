import { CommandModule } from "yargs";
import path from "node:path";
import fs from "node:fs";
import { spawn } from "node:child_process";
import { run } from "./core/run";

const configExists = (filename: string): boolean =>
  fs.existsSync(path.resolve(process.cwd(), filename));

export const SizeCheckCommand: CommandModule = {
  command: "check:size",
  describe: "Check bundle size limits using size-limit",
  builder: {},
  async handler() {
    try {
      console.log("📦 Running size-limit...");

      const configFile = [
        ".size-limit.cjs",
        ".size-limit.js",
        ".size-limit.mjs",
        "size-limit.config.cjs",
        "size-limit.config.js",
      ].find(configExists);

      const args = configFile ? ["--config", configFile] : [];

      await run("npx", ["size-limit", ...args]);
      console.log("✅ Size limit check passed.");
    } catch (err) {
      console.error("❌ Size limit check failed.");
      process.exit(1);
    }
  },
};
