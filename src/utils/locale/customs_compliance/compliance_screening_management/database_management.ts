
const prefix = 'customs_compliance.compliance_screening_management.database_management';

export const DatabaseManagementLocale = {
  getDatabaseManagementPageTitle() { return `${prefix}.pageTitle`; },
  getDatabaseManagementPageHelpLabel() { return `${prefix}.pageHelpLabel`; },
  getDatabaseManagementPageHelpRole() { return `${prefix}.pageHelpRole`; },
  getDatabaseManagementPageHelpRoleDesc() { return `${prefix}.pageHelpRoleDesc`; },
  getDatabaseManagementPageHelpOrigin() { return `${prefix}.pageHelpOrigin`; },
  getDatabaseManagementPageHelpOriginDesc() { return `${prefix}.pageHelpOriginDesc`; },
  getDatabaseManagementPageHelpFunc() { return `${prefix}.pageHelpFunc`; },
  getDatabaseManagementPageHelpFuncDesc() { return `${prefix}.pageHelpFuncDesc`; },

  // Columns
  getDatabaseManagementColName() { return `${prefix}.col.name`; },
  getDatabaseManagementColIssuingAuthority() { return `${prefix}.col.issuingAuthority`; },
  getDatabaseManagementColType() { return `${prefix}.col.type`; },
  getDatabaseManagementColVersion() { return `${prefix}.col.version`; },
  getDatabaseManagementColCount() { return `${prefix}.col.count`; },
  getDatabaseManagementColLastUpdate() { return `${prefix}.col.lastUpdate`; },
  getDatabaseManagementColStatus() { return `${prefix}.col.status`; },
  getDatabaseManagementColDescription() { return `${prefix}.col.description`; },
  getDatabaseManagementColAction() { return `${prefix}.col.action`; },

  // Search
  getDatabaseManagementSearchName() { return `${prefix}.search.name`; },
  getDatabaseManagementSearchIssuingAuthority() { return `${prefix}.search.issuingAuthority`; },
  getDatabaseManagementSearchType() { return `${prefix}.search.type`; },
  getDatabaseManagementSearchStatus() { return `${prefix}.search.status`; },

  // Buttons
  getDatabaseManagementBtnManualUpdate() { return `${prefix}.btn.manualUpdate`; },
  getDatabaseManagementBtnUpdate() { return `${prefix}.btn.update`; },
  getDatabaseManagementBtnDetails() { return `${prefix}.btn.details`; },
  getDatabaseManagementBtnRefresh() { return `${prefix}.btn.refresh`; },
  
  // Status
  getDatabaseManagementStatusNormal() { return `${prefix}.status.normal`; },
  getDatabaseManagementStatusUpdating() { return `${prefix}.status.updating`; },
  getDatabaseManagementStatusError() { return `${prefix}.status.error`; },
};
