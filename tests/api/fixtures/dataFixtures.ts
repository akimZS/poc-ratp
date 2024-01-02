import { test } from 'vitest';
import fs from 'fs/promises';
import { Platforms } from '../../../api/parsing/platforms';

export const data = test.extend({
  // eslint-disable-next-line no-empty-pattern
  catalogueData: async ({}, use) => {
    const catalogueData = await fs.readFile(
      'api/data/perimetre-des-donnees-tr-disponibles-plateforme-idfm.json',
      'utf8'
    );

    const platforms = new Platforms().init(JSON.parse(catalogueData))
    console.log(platforms[0])
    await use(platforms);
  }
});

export type TypeCatalogue = {
  catalogueData:Platforms
}