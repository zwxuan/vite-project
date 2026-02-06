const prefix = 'customs_compliance.compliance_screening_management.screening_result_query';

export const ScreeningResultQueryLocale = {
  getScreeningResultQueryPageTitle() { return `${prefix}.pageTitle`; },

  // Help Tooltip
  getScreeningResultQueryPageHelpLabel() { return `${prefix}.help.label`; },
  getScreeningResultQueryPageHelpRole() { return `${prefix}.help.role`; },
  getScreeningResultQueryPageHelpRoleDesc() { return `${prefix}.help.roleDesc`; },
  getScreeningResultQueryPageHelpOrigin() { return `${prefix}.help.origin`; },
  getScreeningResultQueryPageHelpOriginDesc() { return `${prefix}.help.originDesc`; },
  getScreeningResultQueryPageHelpFunc() { return `${prefix}.help.func`; },
  getScreeningResultQueryPageHelpFuncDesc() { return `${prefix}.help.funcDesc`; },

  // Sections
  getScreeningResultQuerySectionResult() { return `${prefix}.section.result`; },
  getScreeningResultQuerySectionHits() { return `${prefix}.section.hits`; },

  // Fields
  getScreeningResultQueryFieldScreeningId() { return `${prefix}.field.screeningId`; },
  getScreeningResultQueryFieldTime() { return `${prefix}.field.time`; },
  getScreeningResultQueryFieldJobId() { return `${prefix}.field.jobId`; },
  getScreeningResultQueryFieldRiskLevel() { return `${prefix}.field.riskLevel`; },
  getScreeningResultQueryFieldTotalHits() { return `${prefix}.field.totalHits`; },
  getScreeningResultQueryFieldStatus() { return `${prefix}.field.status`; },

  // Table Columns
  getScreeningResultQueryColType() { return `${prefix}.col.type`; },
  getScreeningResultQueryColEntity() { return `${prefix}.col.entity`; },
  getScreeningResultQueryColDb() { return `${prefix}.col.db`; },
  getScreeningResultQueryColMatch() { return `${prefix}.col.match`; },
  getScreeningResultQueryColRisk() { return `${prefix}.col.risk`; },
  getScreeningResultQueryColStatus() { return `${prefix}.col.status`; },

  // Buttons
  getScreeningResultQueryBtnBack() { return `${prefix}.btn.back`; },
};
