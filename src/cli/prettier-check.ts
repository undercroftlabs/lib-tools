import { CommandModule } from "yargs";
import path from "node:path";
import fs from "node:fs";
import { run } from "./core/run";

const configExists = (filename: string): boolean =>
  fs.existsSync(path.resolve(process.cwd(), filename));

export const PrettierCheckCommand: CommandModule = {
  command: "check:prettier",
  describe: "Check code formatting using Prettier",
  builder: {},
  async handler() {
    try {
      console.log("🧹 Checking formatting with Prettier...");

      const configFile = [
        ".prettierrc.cjs",
        ".prettierrc.js",
        ".prettierrc.json",
        "prettier.config.cjs",
        "prettier.config.js",
      ].find(configExists);

      const args = [
        "--check",
        '"**/*.{ts,tsx,js,json,md,yml,yaml,css,scss,html}"',
      ];

      if (configFile) {
        args.unshift("--config", configFile);
      }

      await run("npx", ["prettier", ...args]);
      console.log("✅ Prettier formatting check passed.");
    } catch (err) {
      console.error("❌ Prettier formatting issues found.");
      process.exit(1);
    }
  },
};
