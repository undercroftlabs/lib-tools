import type { Check } from "size-limit";

export type SizeLimitConfigOptions = Check[];

export function withUndercroftSizeLimitConfig(
  overrides: SizeLimitConfigOptions = []
): Check[] {
  const base: Check[] = [
    { path: "dist/index.js", limit: "5 KB" },
    { path: "dist/index.mjs", limit: "5 KB" },
    { path: "dist/index.umd.js", limit: "5 KB" },
    { path: "dist/index.d.mts", limit: "15 B" },
    { path: "dist/index.d.ts", limit: "15 B" },
  ];

  const merged: Check[] = [...base];

  for (const override of overrides) {
    const index = merged.findIndex((entry) => entry.path === override.path);
    if (index >= 0) {
      merged[index] = { ...merged[index], ...override };
    } else {
      merged.push(override);
    }
  }

  return merged;
}
