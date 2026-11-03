import { cp, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, process.env.REGINA_OUTPUT_DIR || '.build/atelier');
// Retain the existing registration page as the imported site's fallback.
execFileSync(process.execPath, [path.join(root, 'build-atelier.mjs')], {
  env: { ...process.env, REGINA_OUTPUT_DIR: path.join(output, 'registration') },
  stdio: 'inherit',
});
await mkdir(output, { recursive: true });
await cp(path.join(root, 'sales-mindset'), output, { recursive: true });
await cp(path.join(root,'regina-pixel.js'),path.join(output,'regina-pixel.js'));
const landing=path.join(output,'index.html');
await writeFile(landing,(await readFile(landing,'utf8')).replace('</head>','<script src="regina-pixel.js?v=1214228613893749-1" defer></script></head>'));
await writeFile(path.join(output, '_headers'), '/*\n  Cache-Control: no-cache\n');
console.log(output);
