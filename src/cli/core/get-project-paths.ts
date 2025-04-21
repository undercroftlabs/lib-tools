import path from "node:path";
import process from "node:process";

export const getProjectPaths = () => {
  const root = process.cwd();
  return {
    rootPath: root,
    packageJsonPath: path.join(root, "package.json"),
    nodeModulesPath: path.join(root, "node_modules"),
  };
};
