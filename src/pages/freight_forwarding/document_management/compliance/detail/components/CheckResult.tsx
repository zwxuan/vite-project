import React from 'react';
import { Card, List, Tag } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export type ComplianceCheckItem = {
  type: 'warning' | 'error' | 'pass';
  title: string;
  suggestion?: string;
};

const CheckResult: React.FC<{ items: ComplianceCheckItem[] }> = ({ items }) => (
  <Card title={i18n.t(LocaleHelper.getDocumentComplianceCheckItems())} bordered={false}>
    <List
      dataSource={items}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={
              <div>
                {item.type === 'warning' && <Tag color="orange">{i18n.t(LocaleHelper.getDocumentComplianceWarning())}</Tag>}
                {item.type === 'error' && <Tag color="red">{i18n.t(LocaleHelper.getDocumentComplianceError())}</Tag>}
                {item.type === 'pass' && <Tag color="green">{i18n.t(LocaleHelper.getDocumentCompliancePass())}</Tag>}
                <span style={{ marginLeft: 8 }}>{item.title}</span>
              </div>
            }
            description={item.suggestion ? `${i18n.t(LocaleHelper.getDocumentComplianceSuggestionDetail())}: ${item.suggestion}` : ''}
          />
        </List.Item>
      )}
    />
  </Card>
);

export default CheckResult;
