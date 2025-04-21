import type { Options as PrettierOptions } from "prettier";

export interface PrettierConfigOptions extends Partial<PrettierOptions> {}

export function withUndercroftPrettierConfig(
  config: PrettierConfigOptions = {}
): PrettierOptions {
  return {
    semi: true,
    singleQuote: true,
    trailingComma: "all",
    arrowParens: "always",
    printWidth: 80,
    endOfLine: "auto",
    ...config,
  };
}
