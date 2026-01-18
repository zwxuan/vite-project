import React from 'react';
import { Form, Radio, Select, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface ServiceSelectionProps {
    serviceCategory: 'comprehensive' | 'standalone';
    setServiceCategory: (value: 'comprehensive' | 'standalone') => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ serviceCategory, setServiceCategory }) => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailServiceSelection())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailServiceCategory())} required>
                    <Radio.Group value={serviceCategory} onChange={e => setServiceCategory(e.target.value)}>
                        <Radio value="comprehensive">{i18n.t(LocaleHelper.getOrderDetailComprehensiveService())}</Radio>
                        <Radio value="standalone">{i18n.t(LocaleHelper.getOrderDetailStandaloneService())}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailOrderType())}>
                    <Select placeholder="Select Order Type">
                        {serviceCategory === 'comprehensive' ? (
                            <>
                                <Select.Option value="Sea Export">Sea Export</Select.Option>
                                <Select.Option value="Sea Import">Sea Import</Select.Option>
                                <Select.Option value="Air Export">Air Export</Select.Option>
                                <Select.Option value="Air Import">Air Import</Select.Option>
                            </>
                        ) : (
                            <>
                                <Select.Option value="Customs">Customs Clearance</Select.Option>
                                <Select.Option value="Warehouse">Warehousing</Select.Option>
                                <Select.Option value="Document">Documentation</Select.Option>
                            </>
                        )}
                    </Select>
                </Form.Item>
            </Form>
        </Card>
    );
};
