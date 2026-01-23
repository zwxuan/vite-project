import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getWaybillNumber()),
        name: 'waybillNumber',
        type: 'input',
    },
];
