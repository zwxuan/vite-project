const prefix = 'customs_compliance.compliance_screening_management.exemption_request_management';

export const ExemptionRequestManagementLocale = {
  getExemptionRequestPageTitle() { return `${prefix}.pageTitle`; },
  getExemptionRequestPageHelpLabel() { return `${prefix}.pageHelpLabel`; },
  getExemptionRequestPageHelpRole() { return `${prefix}.pageHelpRole`; },
  getExemptionRequestPageHelpRoleDesc() { return `${prefix}.pageHelpRoleDesc`; },
  getExemptionRequestPageHelpOrigin() { return `${prefix}.pageHelpOrigin`; },
  getExemptionRequestPageHelpOriginDesc() { return `${prefix}.pageHelpOriginDesc`; },
  getExemptionRequestPageHelpFunc() { return `${prefix}.pageHelpFunc`; },
  getExemptionRequestPageHelpFuncDesc() { return `${prefix}.pageHelpFuncDesc`; },

  // Search Fields
  getExemptionRequestSearchRequestId() { return `${prefix}.search.requestId`; },
  getExemptionRequestSearchScreeningId() { return `${prefix}.search.screeningId`; },
  getExemptionRequestSearchApplicant() { return `${prefix}.search.applicant`; },
  getExemptionRequestSearchStatus() { return `${prefix}.search.status`; },
  getExemptionRequestSearchDateRange() { return `${prefix}.search.dateRange`; },

  // Columns
  getExemptionRequestColRequestId() { return `${prefix}.col.requestId`; },
  getExemptionRequestColScreeningId() { return `${prefix}.col.screeningId`; },
  getExemptionRequestColEntity() { return `${prefix}.col.entity`; },
  getExemptionRequestColRiskLevel() { return `${prefix}.col.riskLevel`; },
  getExemptionRequestColApplicant() { return `${prefix}.col.applicant`; },
  getExemptionRequestColStatus() { return `${prefix}.col.status`; },
  getExemptionRequestColCreateTime() { return `${prefix}.col.createTime`; },
  getExemptionRequestColAction() { return `${prefix}.col.action`; },

  // Fields
  getExemptionRequestFieldReason() { return `${prefix}.field.reason`; },
  getExemptionRequestFieldComments() { return `${prefix}.field.comments`; },

  // Buttons
  getExemptionRequestBtnNew() { return `${prefix}.btn.new`; },
  getExemptionRequestBtnApprove() { return `${prefix}.btn.approve`; },
  getExemptionRequestBtnReject() { return `${prefix}.btn.reject`; },
  getExemptionRequestBtnDetail() { return `${prefix}.btn.detail`; },
  getExemptionRequestBtnBatchApprove() { return `${prefix}.btn.batchApprove`; },
  getExemptionRequestBtnBatchReject() { return `${prefix}.btn.batchReject`; },
};
