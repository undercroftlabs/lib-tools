#!/usr/bin/env node

import yargs, { command } from "yargs";
import { hideBin } from "yargs/helpers";
import BuildCommand from "./build";
import { CoverageCommand, TestCommand } from "./test";
import { TestCICommand } from "./test-ci";
import { DependenciesCheckCommand } from "./dependencies-check";
import LicensesCheckCommand from "./licenses-check";
import { SizeCheckCommand } from "./size-check";
import { PrettierCheckCommand } from "./prettier-check";
import CheckCommand from "./check";
import PrepareCommand from "./prepare";
import { PostPublishCommand } from "./postpublish";
import { PreflightCommand } from "./preflight";
import { PackageCommand } from "./package";

yargs(hideBin(process.argv))
  .scriptName("undercroft-tools")
  .command(BuildCommand)
  .command(TestCommand)
  .command(CoverageCommand)
  .command(TestCICommand)
  .command(CheckCommand)
  .command(DependenciesCheckCommand)
  .command(LicensesCheckCommand)
  .command(SizeCheckCommand)
  .command(PrettierCheckCommand)
  .command(PrepareCommand)
  .command(PostPublishCommand)
  .command(PreflightCommand)
  .command(PackageCommand)
  .demandCommand()
  .strict()
  .help()
  .parse();
