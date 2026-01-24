import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'docNo',
        label: 'Document No.',
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'result',
        label: i18n.t(LocaleHelper.getDocumentComplianceResult()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'Pass', value: 'Pass' },
            { label: 'Fail', value: 'Fail' }
        ]
    },
    {
        key: 'risk',
        label: i18n.t(LocaleHelper.getDocumentComplianceRiskLevel()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'High Risk', value: 'High Risk' },
            { label: 'Medium Risk', value: 'Medium Risk' },
            { label: 'Low Risk', value: 'Low Risk' }
        ]
    }
];
