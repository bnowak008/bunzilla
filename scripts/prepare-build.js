// @ts-check
/** @type {import("node:fs/promises")} */
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function ensureExports() {
  const utilsDir = join(process.cwd(), 'src', 'utils');
  const files = await readdir(utilsDir);
  
  // Create an index.ts file in utils that exports everything
  const exports = files
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && f !== 'index.ts')
    .map(f => `export * from './${f.replace('.ts', '.js')}';`)
    .join('\n');

  await writeFile(join(utilsDir, 'index.ts'), exports + '\n');
}

ensureExports().catch(console.error); 