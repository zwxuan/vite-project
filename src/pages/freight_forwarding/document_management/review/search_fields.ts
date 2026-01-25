import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getDocumentReviewSubmitTime()),
        name: 'submit_date_range',
        type: 'dateRange',
    },
    {
        label: i18n.t(LocaleHelper.getDocumentListType()),
        name: 'type',
        type: 'select',
        options: [
            { label: '提单(B/L)', value: '提单(B/L)' },
            { label: '发票(Invoice)', value: '发票(Invoice)' },
            { label: '装箱单(Packing List)', value: '装箱单(Packing List)' },
        ],
    },
    {
        label: i18n.t(LocaleHelper.getDocumentReviewPriority()),
        name: 'priority',
        type: 'select',
        options: [
            { label: i18n.t(LocaleHelper.getDocumentReviewUrgencyHigh()), value: 'high' },
            { label: i18n.t(LocaleHelper.getDocumentReviewUrgencyMedium()), value: 'medium' },
            { label: i18n.t(LocaleHelper.getDocumentReviewUrgencyLow()), value: 'low' },
        ],
    },
];
