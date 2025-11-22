import fs from 'fs/promises';
import path from 'path';

const cache = new Map<string, any>();

export async function loadJson<T = any>(relativePath: string): Promise<T> {
  const abs = path.resolve(process.cwd(), relativePath);
  if (cache.has(abs)) return cache.get(abs);
  const raw = await fs.readFile(abs, 'utf-8');
  const parsed = JSON.parse(raw);
  cache.set(abs, parsed);
  return parsed as T;
}
