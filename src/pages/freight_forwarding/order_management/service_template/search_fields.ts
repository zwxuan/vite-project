import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getServiceTemplateTemplateName()),
        key: 'templateName',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getServiceTemplateApplicableScenario()),
        key: 'scenario',
        selectOptions: [
            { value: 'Import', label: 'Import Trade' },
            { value: 'Export', label: 'Export Trade' },
            { value: 'Ecommerce', label: 'E-commerce' },
        ]
    },
];
