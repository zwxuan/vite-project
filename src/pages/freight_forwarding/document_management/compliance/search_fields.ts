import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'docNo',
        label: i18n.t(LocaleHelper.getDocumentComplianceDocumentNo()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'result',
        label: i18n.t(LocaleHelper.getDocumentComplianceResult()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentCompliancePass()), value: 'pass' },
            { label: i18n.t(LocaleHelper.getDocumentComplianceFail()), value: 'fail' }
        ]
    },
    {
        key: 'risk',
        label: i18n.t(LocaleHelper.getDocumentComplianceRiskLevel()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentComplianceHighRisk()), value: 'high' },
            { label: i18n.t(LocaleHelper.getDocumentComplianceMediumRisk()), value: 'medium' },
            { label: i18n.t(LocaleHelper.getDocumentComplianceLowRisk()), value: 'low' }
        ]
    }
];
