import React from 'react';
import { Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const DocumentSearch: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getCcsdmDocumentSearchPageTitle())}>
            Document Search Page (Placeholder)
        </Card>
    );
};
export default DocumentSearch;
