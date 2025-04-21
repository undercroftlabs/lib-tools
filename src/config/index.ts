import { withUndercroftRollupConfig } from "./rollup-config";
import { withUndercroftTsupConfig } from "./tsup-config";
import { withUndercroftJestConfig } from "./jest-config";
import { withUndercroftSizeLimitConfig } from "./size-limit-config";
import { withUndercroftPrettierConfig } from "./prettier-config";

export { withUndercroftRollupConfig };
export { withUndercroftTsupConfig };
export { withUndercroftJestConfig };
export { withUndercroftSizeLimitConfig };
export { withUndercroftPrettierConfig };

export default {
  withUndercroftRollupConfig,
  withUndercroftTsupConfig,
  withUndercroftJestConfig,
  withUndercroftSizeLimitConfig,
  withUndercroftPrettierConfig,
};
