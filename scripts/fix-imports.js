// @ts-check
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function fixImports() {
  const distDir = join(process.cwd(), 'dist', 'esm');
  
  async function processDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await processDir(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const content = await readFile(fullPath, 'utf-8');
        
        // Add .js to all relative imports that don't already have it
        const newContent = content.replace(
          /from ['"](\.[^'"]+)['"]/g,
          (match, importPath) => {
            if (importPath.endsWith('.js')) return match;
            return `from '${importPath}.js'`;
          }
        );
        
        await writeFile(fullPath, newContent);
      }
    }
  }

  await processDir(distDir);
}

fixImports().catch(console.error); 