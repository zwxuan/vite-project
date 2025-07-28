
import { TableColumnsType, Tag, Popconfirm, Tooltip } from 'antd';
import { DeliveryAgentItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/delivery_agent";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: DeliveryAgentItemProps) => void, handleDelete: (record: DeliveryAgentItemProps) => void): TableColumnsType<DeliveryAgentItemProps> => [

    {
        title: i18n.t(LocaleHelper.getDeliveryAgentId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentAgentChineseName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AgentChineseName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentAgentEnglishName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AgentEnglishName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentAgentEnglishAbbreviation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AgentEnglishAbbreviation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentAffiliatedBranchCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AffiliatedBranchCompany',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentIsDefault()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsDefault',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getDeliveryAgentAgentInfo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AgentInfo',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c;；]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a>启用</a>
            <a onClick={()=>handleEdit(record)}>编辑</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 
