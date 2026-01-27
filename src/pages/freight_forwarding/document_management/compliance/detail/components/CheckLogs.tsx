import React, { useMemo } from 'react';
import { Timeline } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export type ComplianceLogItem = {
  time: string;
  message: string;
};

const CheckLogs: React.FC<{ logs: ComplianceLogItem[] }> = ({ logs }) => {
  const items = useMemo(
    () =>
      logs.map(log => ({
        label: (
          <div style={{ minWidth: 96, color: '#666' }}>
            {i18n.t(LocaleHelper.getDocumentComplianceTime())} {log.time}
          </div>
        ),
        children: (
          <div>
            {log.message}
          </div>
        ),
      })),
    [logs],
  );

  return (
    <div style={{ padding: '8px 4px' }}>
      <Timeline mode="left" items={items} />
    </div>
  );
};

export default CheckLogs;
