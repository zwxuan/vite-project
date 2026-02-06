const prefix = 'customs_compliance.compliance_screening_management.hit_processing';

export const HitProcessingLocale = {
  getHitProcessingPageTitle() { return `${prefix}.pageTitle`; },
  
  // Sections
  getHitProcessingSectionBasicInfo() { return `${prefix}.section.basicInfo`; },
  getHitProcessingSectionComparison() { return `${prefix}.section.comparison`; },
  getHitProcessingSectionDecision() { return `${prefix}.section.decision`; },
  getHitProcessingSectionAuditLog() { return `${prefix}.section.auditLog`; },

  // Comparison Table
  getHitProcessingColField() { return `${prefix}.col.field`; },
  getHitProcessingColInputValue() { return `${prefix}.col.inputValue`; },
  getHitProcessingColListValue() { return `${prefix}.col.listValue`; },
  getHitProcessingColMatchScore() { return `${prefix}.col.matchScore`; },

  // Fields
  getHitProcessingFieldName() { return `${prefix}.field.name`; },
  getHitProcessingFieldAddress() { return `${prefix}.field.address`; },
  getHitProcessingFieldCountry() { return `${prefix}.field.country`; },
  getHitProcessingFieldType() { return `${prefix}.field.type`; },
  getHitProcessingFieldListSource() { return `${prefix}.field.listSource`; },

  // Decision
  getHitProcessingDecisionFalsePositive() { return `${prefix}.decision.falsePositive`; },
  getHitProcessingDecisionTrueMatch() { return `${prefix}.decision.trueMatch`; },
  getHitProcessingDecisionEscalate() { return `${prefix}.decision.escalate`; },
  getHitProcessingLabelReason() { return `${prefix}.label.reason`; },
  getHitProcessingLabelComments() { return `${prefix}.label.comments`; },
  getHitProcessingBtnSubmit() { return `${prefix}.btn.submit`; },
  getHitProcessingBtnCancel() { return `${prefix}.btn.cancel`; },
  
  // Status
  getHitProcessingStatusPending() { return `${prefix}.status.pending`; },
  getHitProcessingStatusCompleted() { return `${prefix}.status.completed`; },
};
