import { PublicService } from '@makerdao/services-core';
import { ServiceRoles, Migrations } from './constants';
import SingleToMultiCdp from './migrations/SingleToMultiCdp';
import SDaiToMDai from './migrations/SDaiToMDai';
import MkrRedeemer from './migrations/MkrRedeemer';

const migrations = {
  [Migrations.SINGLE_TO_MULTI_CDP]: SingleToMultiCdp,
  [Migrations.SDAI_TO_MDAI]: SDaiToMDai,
  [Migrations.MKR_REDEEMER]: MkrRedeemer
};

export default class MigrationService extends PublicService {
  constructor(name = ServiceRoles.MIGRATION) {
    super(name, ['smartContract', 'accounts', 'cdp', 'proxy', 'token']);
  }

  getAllMigrationsIds() {
    return Object.values(Migrations);
  }

  getMigration(id) {
    const migration = migrations[id];
    return migration && new migration(this);
  }
}