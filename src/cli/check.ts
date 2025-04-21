import type { CommandModule } from "yargs";
import { run } from "./core/run";

export const CheckCommand: CommandModule = {
  command: "check",
  describe: "Run all checks: dependencies, licenses, and size-limit",
  builder: {},
  async handler() {
    const checks = [
      { name: "Dependency check", command: ["check:dependencies"] },
      { name: "License check", command: ["check:licenses"] },
      { name: "Size limit check", command: ["check:size"] },
    ];

    let failed = false;

    for (const check of checks) {
      console.log(`🔎 Running ${check.name}...`);
      try {
        await run("undercroft-tools", check.command);
      } catch (err) {
        console.error(`❌ ${check.name} failed`);
        failed = true;
      }
    }

    if (failed) {
      process.exit(1);
    } else {
      console.log("✅ All checks passed!");
    }
  },
};

export default CheckCommand;
