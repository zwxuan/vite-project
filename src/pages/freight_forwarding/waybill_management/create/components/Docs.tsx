import React from 'react';
import { Table, Button, List, Upload } from 'antd';
import { FileOutlined, CloudUploadOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";

const Docs: React.FC = () => {
    const docsData = [
        { key: '1', type: 'BL Draft', name: 'BL_DRAFT.pdf', version: 'v2', time: '2024-03-19', source: 'System', status: 'Pending' },
        { key: '2', type: 'Packing List', name: 'PACKING_LIST.xlsx', version: 'v1', time: '2024-03-18', source: 'Upload', status: 'Active' },
    ];

    const columns = [
        { title: 'Type', dataIndex: 'type' },
        { title: 'Name', dataIndex: 'name', render: (text: string) => <a><FileOutlined /> {text}</a> },
        { title: 'Version', dataIndex: 'version' },
        { title: 'Time', dataIndex: 'time' },
        { title: i18n.t(LocaleHelper.getWaybillCreateSource()), dataIndex: 'source' },
        { title: i18n.t(LocaleHelper.getWaybillCreateStatus()), dataIndex: 'status' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateAction()), key: 'action', render: () => <Button type="link" size="small">Download</Button> },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            <Table dataSource={docsData} columns={columns} pagination={false} size="small" style={{ marginBottom: 16 }} scroll={{ x: 'max-content' }} />
            
            <div style={{ padding: '24px', textAlign: 'center', border: '1px dashed #d9d9d9', background: '#fafafa', borderRadius: 4 }}>
                <p>{i18n.t(LocaleHelper.getWaybillCreateDragDrop())}</p>
                <Button icon={<CustomIcon type="icon-CloudUpload" />}>{i18n.t(LocaleHelper.getWaybillCreateUploadFile())}</Button>
            </div>
        </div>
    );
};

export default Docs;
