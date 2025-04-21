import type { CommandModule } from "yargs";
import lcc from "license-compatibility-checker";
import intersect from "intersect";
import { readPackageJson } from "./core/read-package-json.js";
import { buildHeader } from "./core/header-builder.js";
import { getProjectPaths } from "./core/get-project-paths.js";

const LicensesCheckCommand: CommandModule = {
  command: "check:licenses",
  describe: "Check project licenses",

  async handler() {
    try {
      const { rootPath, packageJsonPath, nodeModulesPath } = getProjectPaths();
      const originalLog = console.log;
      const incompatibleRegex = /incompatible/g;

      // Silence LCC's default logging
      console.log = () => {};

      const licenseLines = await new Promise<string[]>((resolve, reject) => {
        lcc.check(
          packageJsonPath,
          nodeModulesPath,
          (err: Error, _passe: boolean, output: string) => {
            if (err) return reject(err);
            resolve(output.split("\n"));
          }
        );
      });

      // Restore logging
      console.log = originalLog;

      const productionDeps = Object.keys(
        readPackageJson(packageJsonPath)?.dependencies || {}
      );

      const incompatible = intersect(
        productionDeps,
        licenseLines
          .filter((line) => line.match(incompatibleRegex))
          .map((line) => line.split("@")[0])
      );

      const getLicenseInfo = (name: string) =>
        licenseLines.find((line) => line.includes(name)) ?? "";

      const hasIssues = incompatible.length > 0;
      const header = buildHeader(
        hasIssues
          ? "License Issues Found In Production Packages."
          : "No License Issues Found In Production Packages.",
        hasIssues
      );

      console.log(header);
      productionDeps
        .map(getLicenseInfo)
        .filter((line) => line.trim())
        .forEach((line) => console.log(line));

        process.exit(hasIssues ? 1 : 0);
    } catch (err) {
      console.error(
        "❌ License check failed:",
        err instanceof Error ? err.message : err
      );
      process.exit(1);
    }
  },
};

export default LicensesCheckCommand;
