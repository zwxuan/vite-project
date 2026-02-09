import React from 'react';
import { Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const ArchiveManagement: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementArchiveManagementPageTitle())}>
            Archive Management Page (Placeholder)
        </Card>
    );
};
export default ArchiveManagement;
