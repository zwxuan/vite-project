import React from 'react';
import { Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const ReminderSettings: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReminderSettingsPageTitle())}>
            Reminder Settings Page (Placeholder)
        </Card>
    );
};
export default ReminderSettings;
