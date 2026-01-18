import React from 'react';
import { Table, Button, Form, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Cargo: React.FC = () => {
    const cargoData = [
        { key: '1', no: 1, desc: 'Electronics', hsCode: '8517', pcs: 100, pkg: 'CTN', weight: 5000, volume: 20, marks: 'N/M', dangerous: 'No' }
    ];

    const columns = [
        { title: 'No', dataIndex: 'no', width: 50 },
        { title: i18n.t(LocaleHelper.getWaybillCreateCommodity()), dataIndex: 'desc' },
        { title: i18n.t(LocaleHelper.getWaybillCreateHsCode()), dataIndex: 'hsCode' },
        { title: i18n.t(LocaleHelper.getWaybillCreatePackages()), dataIndex: 'pcs' },
        { title: i18n.t(LocaleHelper.getWaybillCreatePacking()), dataIndex: 'pkg' },
        { title: i18n.t(LocaleHelper.getWaybillCreateGrossWeight()) + ' (KG)', dataIndex: 'weight' },
        { title: i18n.t(LocaleHelper.getWaybillCreateVolume()) + ' (CBM)', dataIndex: 'volume' },
        { title: i18n.t(LocaleHelper.getWaybillCreateMarks()), dataIndex: 'marks' },
        { title: 'Dangerous', dataIndex: 'dangerous' },
        {
            title: i18n.t(LocaleHelper.getWaybillTemplateAction()),
            key: 'action',
            render: () => (
                <>
                    <Button type="link" icon={<EditOutlined />} size="small" />
                    <Button type="link" danger icon={<DeleteOutlined />} size="small" />
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            <Table
                dataSource={cargoData}
                columns={columns}
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                footer={() => (
                     <div style={{ textAlign: 'center' }}><Button type="dashed" icon={<PlusOutlined />} style={{ width: '60%' }}>Add Cargo</Button></div>
                )}
            />
            <div style={{ marginTop: 16, padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
                <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDeclarationElements())} style={{ marginBottom: 0 }}>
                    <Input.TextArea rows={2} placeholder="Brand/Model/Material/Usage/Origin..." />
                </Form.Item>
            </div>
        </div>
    );
};

export default Cargo;
