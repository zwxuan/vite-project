
export const KpiDefinitionLocale = {
    // KPI唯一标识符（UUID格式）
    getKpiDefinitionKpiId() {
      return "kpi_definition.kpiid";
    },
    // KPI代码（业务唯一标识，如OTD_DELIVERY）
    getKpiDefinitionKpiCode() {
      return "kpi_definition.kpicode";
    },
    // KPI中文名称（如"准时交货率"）
    getKpiDefinitionKpiName() {
      return "kpi_definition.kpiname";
    },
    // KPI详细描述
    getKpiDefinitionDescription() {
      return "kpi_definition.description";
    },
    // 数据类型：数值/百分比/布尔值/文本
    getKpiDefinitionDataType() {
      return "kpi_definition.datatype";
    },
    // 是否为否决型指标（1=是，触发即终止合作）
    getKpiDefinitionIsCritical() {
      return "kpi_definition.iscritical";
    },
    // 关联的数据源ID
    getKpiDefinitionSourceId() {
      return "kpi_definition.sourceid";
    },
    // 适用伙伴类型列表（JSON数组，如["CO_LOADER","OVERSEAS_AGENT"]）
    getKpiDefinitionPartnerTypes() {
      return "kpi_definition.partnertypes";
    },

};
