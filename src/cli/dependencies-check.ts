import type { CommandModule } from "yargs";
import depcheck from "depcheck";
import semver from "semver";
import { buildHeader } from "./core/header-builder";
import { readPackageJson } from "./core/read-package-json";
import type { DependencyMap } from "./types";
import { getProjectPaths } from "./core/get-project-paths.js";

export const DependenciesCheckCommand: CommandModule = {
  command: "check:dependencies",
  describe: "Check for unused production dependencies in package.json",

  async handler() {
    try {
      const code = await runDepcheck();
      process.exit(code);
    } catch (e) {
      console.error(
        "❌ Dependency check failed:",
        e instanceof Error ? e.message : e
      );
      process.exit(1);
    }
  },
};

const depcheckOptions: depcheck.Options = {
  ignoreBinPackage: false,
  skipMissing: false,
  ignorePatterns: [],
  parsers: {
    "**/*.js": depcheck.parser.es6,
    "**/*.ts": depcheck.parser.typescript,
  },
  specials: [depcheck.special.eslint] as depcheck.Parser[],
};

async function runDepcheck(): Promise<number> {
  const { packageJsonPath } = getProjectPaths();
  const packageJson = readPackageJson(packageJsonPath);
  if (!packageJson) throw new Error("Cannot open package.json");

  const cwd = process.cwd();
  const unused = await depcheck(cwd, depcheckOptions);

  const productionDeps = packageJson.dependencies || {};
  const unusedDependencies: DependencyMap = Object.entries(
    productionDeps
  ).reduce((deps, [name, version]) => {
    const normalizedVersion = semver.coerce(version)?.version ?? "";
    deps[name] = {
      name,
      version: normalizedVersion,
      packageString: `${name}@${normalizedVersion}`,
    };
    return deps;
  }, {} as DependencyMap);

  const isFailing = unused.dependencies.length > 0;
  const header = buildHeader(
    isFailing ? "Found Unused Dependencies." : "No Unused Dependencies.",
    isFailing
  );

  console.log(header);
  unused.dependencies
    .filter((dep) => dep.trim().length > 0)
    .forEach((dep) => {
      console.log(unusedDependencies[dep]?.packageString ?? dep);
    });

  return isFailing ? 1 : 0;
}
