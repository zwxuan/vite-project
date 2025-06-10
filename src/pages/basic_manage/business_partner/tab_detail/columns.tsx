
import { TableColumnsType, Tag, Popconfirm,Input,Select,Button,InputNumber } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { ContactItemProps } from '@/types/basic_manage/contact';
export const getColumns = (handleEdit: (record: ContactItemProps) => void, handleDelete: (record: ContactItemProps) => void, handleSave: (record: ContactItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<ContactItemProps> => [
    {
        title: i18n.t(LocaleHelper.getContactContactName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContactName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.ContactName}
                    onChange={e => record.ContactName = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactJobFunction()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobFunction',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.JobFunction}
                    onChange={e => record.JobFunction = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactRoute()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Route',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            const routeOptions = [
                { value: '1', label: '非洲' },
                { value: '2', label: '加拿大' },
                { value: '3', label: '加勒比' },
                { value: '4', label: '美西' },
                { value: '5', label: '美东' },
                { value: '6', label: '南美' },
                { value: '7', label: '欧洲' },
                { value: '8', label: '中东' },
                { value: '9', label: '东南亚' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Route}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Route = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Route)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactPhone()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Phone',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.Phone}
                    onChange={e => record.Phone = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactAddress()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Address',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.Address}
                    onChange={e => record.Address = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactEmail()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Email',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.Email}
                    onChange={e => record.Email = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactCcEmail()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CcEmail',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.CcEmail}
                    onChange={e => record.CcEmail = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactMobile()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Mobile',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.Mobile}
                    onChange={e => record.Mobile = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactPushNode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PushNode',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.PushNode}
                    onChange={e => record.PushNode = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactPushMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PushMethod',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            // 定义选项映射
            const pushMethodOptions = [
                { value: '1', label: '邮件' },
                { value: '2', label: '短信' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.PushMethod}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={value => record.PushMethod = value }
                    options={pushMethodOptions}
                />
            ) : (
                // 非编辑状态：根据value查找对应的label显示
                pushMethodOptions.find(option => option.value === record.PushMethod)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.Remarks}
                    onChange={e => record.Remarks = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactQqNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'QqNumber',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.QqNumber}
                    onChange={e => record.QqNumber = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactWechatId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WechatId',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.WechatId}
                    onChange={e => record.WechatId = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getContactSkypeId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SkypeId',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.SkypeId}
                    onChange={e => record.SkypeId = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 80,
        render: (_: any, record: ContactItemProps) => {
            const editable = record.ContactId === editingKey;
            return editable ? (
                <>
                    <a onClick={() => handleSave(record)}>保存</a>
                    <a onClick={handleCancel}>取消</a>
                </>
            ) : (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            );
        },
    },
];

