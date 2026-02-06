import { cn } from "@/locales/zh-cn";

const prefix = 'customs_compliance.compliance_screening_management.screening_rule_config';

const ScreeningRuleConfigLocale = {
  // Page Info
  getScreeningRuleConfigPageTitle() { return `${prefix}.pageTitle`; },
  getScreeningRuleConfigPageHelpLabel() { return `${prefix}.pageHelpLabel`; },
  getScreeningRuleConfigPageHelpRole() { return `${prefix}.pageHelpRole`; },
  getScreeningRuleConfigPageHelpRoleDesc() { return `${prefix}.pageHelpRoleDesc`; },
  getScreeningRuleConfigPageHelpOrigin() { return `${prefix}.pageHelpOrigin`; },
  getScreeningRuleConfigPageHelpOriginDesc() { return `${prefix}.pageHelpOriginDesc`; },
  getScreeningRuleConfigPageHelpFunc() { return `${prefix}.pageHelpFunc`; },
  getScreeningRuleConfigPageHelpFuncDesc() { return `${prefix}.pageHelpFuncDesc`; },

  // Columns
  getScreeningRuleConfigColName() { return `${prefix}.col.name`; },
  getScreeningRuleConfigColScope() { return `${prefix}.col.scope`; },
  getScreeningRuleConfigColAccuracy() { return `${prefix}.col.accuracy`; },
  getScreeningRuleConfigColStatus() { return `${prefix}.col.status`; },
  getScreeningRuleConfigColLastModified() { return `${prefix}.col.lastModified`; },
  getScreeningRuleConfigColAction() { return `${prefix}.col.action`; },
  getScreeningRuleConfigColAlgorithm() { return `${prefix}.col.algorithm`; },
  getScreeningRuleConfigColLists() { return `${prefix}.col.lists`; },

  // Buttons
  getScreeningRuleConfigBtnNew() { return `${prefix}.btn.new`; },
  getScreeningRuleConfigBtnEdit() { return `${prefix}.btn.edit`; },
  getScreeningRuleConfigBtnCopy() { return `${prefix}.btn.copy`; },
  getScreeningRuleConfigBtnDelete() { return `${prefix}.btn.delete`; },

  // Status
  getScreeningRuleConfigStatusActive() { return `${prefix}.status.active`; },
  getScreeningRuleConfigStatusInactive() { return `${prefix}.status.inactive`; },

  // Form Sections & Fields
  getScreeningRuleConfigTabBasic() { return `${prefix}.tab.basic`; },
  getScreeningRuleConfigTabScope() { return `${prefix}.tab.scope`; },
  getScreeningRuleConfigTabMatching() { return `${prefix}.tab.matching`; },
  getScreeningRuleConfigTabLists() { return `${prefix}.tab.lists`; },
  
  getScreeningRuleConfigFieldDesc() { return `${prefix}.field.desc`; },
  getScreeningRuleConfigFieldPriority() { return `${prefix}.field.priority`; },
  getScreeningRuleConfigFieldBizTypes() { return `${prefix}.field.bizTypes`; },
  getScreeningRuleConfigFieldEntities() { return `${prefix}.field.entities`; },
  getScreeningRuleConfigFieldCountries() { return `${prefix}.field.countries`; },
  getScreeningRuleConfigFieldAlgorithm() { return `${prefix}.field.algorithm`; },
  getScreeningRuleConfigFieldMinScore() { return `${prefix}.field.minScore`; },
  getScreeningRuleConfigFieldListType() { return `${prefix}.field.listType`; },
  getScreeningRuleConfigFieldIncludeLists() { return `${prefix}.field.includeLists`; },

  // Enums
  getScreeningRuleConfigEnumFuzzy() { return `${prefix}.enum.fuzzy`; },
  getScreeningRuleConfigEnumExact() { return `${prefix}.enum.exact`; },
  getScreeningRuleConfigEnumImport() { return `${prefix}.enum.import`; },
  getScreeningRuleConfigEnumExport() { return `${prefix}.enum.export`; },
  getScreeningRuleConfigEnumShipper() { return `${prefix}.enum.shipper`; },
  getScreeningRuleConfigEnumConsignee() { return `${prefix}.enum.consignee`; },
};

export default ScreeningRuleConfigLocale;
