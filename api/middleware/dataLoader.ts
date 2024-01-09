import { readFile } from 'fs/promises';
import { Platforms } from '../parsing/platforms';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default async function () {
  const rawData = await readFile(
    path.join(__dirname, '..', 'data', 'perimetre-des-donnees-tr-disponibles-plateforme-idfm.json'),
    'utf-8'
  );
  return new Platforms(JSON.parse(rawData));
}
