import { assert, describe, it } from 'vitest';
import { TypeCatalogue, data } from '../fixtures/dataFixtures';

describe('data', async () => {
  data('should extract all data', async ({ catalogueData }: TypeCatalogue) => {
    assert.equal(catalogueData.length, 66114);
  });

  data('should extract specific fields', async ({ catalogueData }: TypeCatalogue) => {
    assert.equal(catalogueData[0].recordId, '975741fb8cbf057c8c788decdf900cfd16bbd951');
    assert.equal(catalogueData[catalogueData.length-1].recordId, 'c0034560377e7d2a2a511625f344a96dd05cdb16');
  });
});
