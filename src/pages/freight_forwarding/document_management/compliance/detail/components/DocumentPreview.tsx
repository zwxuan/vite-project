import React from 'react';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const DocumentPreview: React.FC = () => (
  <div style={{ height: 350, border: '1px dashed #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {i18n.t(LocaleHelper.getDocumentCompliancePreviewArea())}
  </div>
);

export default DocumentPreview;
