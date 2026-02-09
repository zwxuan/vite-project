import React from 'react';
import { Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const StatisticsReport: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementStatisticsReportPageTitle())}>
            Statistics Report Page (Placeholder)
        </Card>
    );
};
export default StatisticsReport;
