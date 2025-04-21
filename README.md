# Undercroft Lib Tools

A CLI toolkit and shared configuration layer for building, testing, and maintaining Undercroft libraries.  
It provides unified tooling across projects—including build scripts, test commands, license checks, and more.

This project powers libraries like `@undercroft/timespan` and `@undercroft/syndication`, and can be used in any TypeScript library following the Undercroft standards.

---

## Features

- 🧱 Standardized build process with `tsup` and `rollup`
- ✅ Preconfigured testing via `jest` and `ts-jest`
- 📦 Automatic size limit enforcement
- 🔐 License and dependency audits
- 🧪 Built-in CLI with commands like `build`, `test`, `check`, `package`, and more
- 💬 Minimal configuration needed—just use `withUndercroftTsupConfig()` and friends

---

## Usage

Install it as a dev dependency in your Undercroft-style library:

```bash
npm install --save-dev @undercroft/lib-tools
Then replace your scripts with:
```

```json
"scripts": {
  "build": "npx undercroft-tools build",
  "test": "npx undercroft-tools test",
  "check": "npx undercroft-tools check",
  "package": "npx undercroft-tools package",
  "preflight": "npx undercroft-tools preflight"
}
```

Import shared config into your local config files:

```ts
// tsup.config.ts
import { withUndercroftTsupConfig } from '@undercroft/lib-tools';
export default withUndercroftTsupConfig();
```

## CLI
You can use either of the following commands:

```bash
npx undercroft-tools <command>
npx uct <command>              # shortcut alias
```

Available commands include:

build
test
check
package
preflight
postpublish
prepare
...and more.

## Contributing
Contributions to Undercroft Lib Tools are welcome!

If you find a bug, want to add a feature, or think something could be clearer—please open an issue or submit a pull request.
This project follows the same standards of clarity, structure, and test coverage expected from all Undercroft libraries.

License
Undercroft Lib Tools is licensed under the MIT License. See the LICENSE file for more information.
