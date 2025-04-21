import { spawn } from "node:child_process";

export function run(
  cmd: string,
  args: string[] = [],
  env: Record<string, string> = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...env },
    });

    proc.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}
