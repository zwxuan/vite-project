import React from 'react';
import { Form, Input, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const Remarks: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailRemarks())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailSpecialRequirements())}>
                    <Input.TextArea placeholder="e.g. Urgent handling required" rows={2} />
                </Form.Item>
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailInternalRemarks())}>
                    <Input.TextArea placeholder="e.g. VIP Customer" rows={2} />
                </Form.Item>
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailRiskWarning())}>
                    <Input.TextArea placeholder="e.g. 3C Certification required" style={{ borderColor: 'orange' }} rows={2} />
                </Form.Item>
            </Form>
        </Card>
    );
};
