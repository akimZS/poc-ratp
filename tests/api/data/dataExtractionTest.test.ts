import { assert, describe, it } from 'vitest';
import { TypeCatalogue, data } from '../fixtures/dataFixtures';
import { Platform, Platforms, PlatformFields } from '../../../api/parsing/platforms.ts';

describe('data', async () => {
  data('should extract all data', async ({ catalogueData }: TypeCatalogue) => {
    assert.equal(catalogueData.length, 66114);
  });

  data('should extract specific fields', async ({ catalogueData }: TypeCatalogue) => {
    assert.equal(catalogueData[0].recordId, '975741fb8cbf057c8c788decdf900cfd16bbd951');
    assert.equal(
      catalogueData[catalogueData.length - 1].recordId,
      'c0034560377e7d2a2a511625f344a96dd05cdb16'
    );
  });
});

describe('processed data', async () => {
  data(
    'should extract specific data using class methods',
    async ({ catalogueData }: TypeCatalogue) => {
      assert.isNull(catalogueData.getFromDatasetId('Not dataSetId'));
      assert.isNotNull(
        catalogueData.getFromDatasetId('perimetre-des-donnees-tr-disponibles-plateforme-idfm')
      );
      assert.isNull(catalogueData.getFromRecordId('Not recordId'));
      assert.isNotNull(catalogueData.getFromRecordId('975741fb8cbf057c8c788decdf900cfd16bbd951'));
      assert.isNull(catalogueData.getFromLine('Not fromLine'));
      assert.isNotNull(catalogueData.getFromLine('STIF:Line::C01048:'));
      assert.isNull(catalogueData.getFromNS3StopPointRef('Not fromNS3StopPointRef'));
      assert.isNotNull(catalogueData.getFromNS3StopPointRef('STIF:StopPoint:Q:6054:'));
      assert.isNull(catalogueData.getFromNS3StopName('Not fromNS3StopName'));
      assert.isNotNull(catalogueData.getFromNS3StopName('Lotissement'));
    }
  );
});
