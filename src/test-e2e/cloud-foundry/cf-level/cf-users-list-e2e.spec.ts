import { protractor } from 'protractor';

import { e2e } from '../../e2e';
import { E2EHelpers } from '../../helpers/e2e-helpers';
import { CFUsersListComponent } from '../../po/cf-users-list.po';
import { setUpTestOrgSpaceE2eTest } from '../users-list-e2e.helper';
import { CfTopLevelPage } from './cf-top-level-page.po';

const customOrgSpacesLabel = E2EHelpers.e2eItemPrefix + (process.env.CUSTOM_APP_LABEL || process.env.USER) + '-cf-users';

describe('Cf Users List -', () => {

  const orgName = E2EHelpers.createCustomName(customOrgSpacesLabel);
  const spaceName = E2EHelpers.createCustomName(customOrgSpacesLabel);
  const userName = e2e.secrets.getDefaultCFEndpoint().creds.nonAdmin.username;

  let cfPage, cfGuid, cfHelper;

  beforeAll(() => {
    setUpTestOrgSpaceE2eTest(orgName, spaceName, userName).then(res => {
      cfHelper = res.cfHelper;
      cfGuid = res.cfGuid;
    });
    protractor.promise.controlFlow().execute(() => {
      cfPage = CfTopLevelPage.forEndpoint(cfGuid);
      cfPage.navigateTo();
      cfPage.waitForPageOrChildPage();
      cfPage.loadingIndicator.waitUntilNotShown();
      return cfPage.goToUsersTab();
    });
  });

  it('Correct role pills shown, pills removed successfully', () => {
    expect(cfPage.isActivePageOrChildPage()).toBeTruthy();
    const usersTable = new CFUsersListComponent();
    usersTable.header.setSearchText(userName);
    expect(usersTable.getTotalResults()).toBe(1);

    const userRowIndex = 0;
    usersTable.expandOrgsChips(userRowIndex);
    usersTable.expandSpaceChips(userRowIndex);

    // Check user pill is present and cannot remove
    const orgUserChip = usersTable.getPermissionChip(userRowIndex, orgName, null, true, 'User');
    orgUserChip.check(false);

    // Check other pills are present, can be removed and remove
    const spaceDeveloperChip = usersTable.getPermissionChip(userRowIndex, orgName, spaceName, false, 'Developer');
    spaceDeveloperChip.check(true);
    spaceDeveloperChip.remove();
    const spaceAuditorChip = usersTable.getPermissionChip(userRowIndex, orgName, spaceName, false, 'Auditor');
    spaceAuditorChip.check(true);
    spaceAuditorChip.remove();
    const spaceManagerChip = usersTable.getPermissionChip(userRowIndex, orgName, spaceName, false, 'Manager');
    spaceManagerChip.check(true);
    spaceManagerChip.remove();
    const orgBillingManagerChip = usersTable.getPermissionChip(userRowIndex, orgName, null, true, 'Billing Manager');
    orgBillingManagerChip.check(true);
    orgBillingManagerChip.remove();
    const orgAuditorChip = usersTable.getPermissionChip(userRowIndex, orgName, null, true, 'Auditor');
    orgAuditorChip.check(true);
    orgAuditorChip.remove();
    const orgManagerChip = usersTable.getPermissionChip(userRowIndex, orgName, null, true, 'Manager');
    orgManagerChip.check(true);
    orgManagerChip.remove();

    // Check user pill can now be removed and remove it
    orgUserChip.check(true);
    orgUserChip.remove();

  });


  afterAll(() => {
    return cfHelper.deleteOrgIfExisting(cfGuid, orgName);
  });
});
