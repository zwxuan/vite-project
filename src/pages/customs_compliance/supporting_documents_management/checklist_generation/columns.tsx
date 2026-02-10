import React from 'react';
import { Tag } from 'antd';

export interface DocOption {
    key: string;
    category: string;
    categoryKey: string;
    name: string;
    required: boolean;
    desc?: string;
}

export const getColumns = () => [
    {
        title: '单证类别',
        dataIndex: 'category',
        key: 'category',
        width: 150,
        onCell: (record: DocOption, index: number) => {
             // Logic to merge cells can be added here if the data is sorted by category
            return {};
        }
    },
    {
        title: '单证名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (text: string, record: DocOption) => (
            <span style={{ fontWeight: record.required ? 'bold' : 'normal' }}>
                {text} {record.required && <span style={{ color: 'red' }}>*</span>}
            </span>
        )
    },
    {
        title: '必填',
        dataIndex: 'required',
        key: 'required',
        width: 80,
        render: (req: boolean) => req ? <Tag color="red">是</Tag> : <Tag>否</Tag>
    },
    {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
        render: (text: string) => <span style={{ color: '#888' }}>{text}</span>
    }
];
