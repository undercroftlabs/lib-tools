import fs from 'fs';
import { PackageJson } from '../types';

/**
 * Reads the package.json file and returns its contents.
 * @returns The parsed package.json object or null if there was an error.
 */
export const readPackageJson = (path: string): PackageJson | null => {
  const fileContent = fs.readFileSync(path, 'utf8');
  const packageJson = JSON.parse(fileContent);
  return packageJson as PackageJson;
};
