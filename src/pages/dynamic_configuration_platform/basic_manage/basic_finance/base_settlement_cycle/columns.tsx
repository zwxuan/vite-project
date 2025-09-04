
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseSettlementCycleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_settlement_cycle";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseSettlementCycleItemProps) => void, handleDelete: (record: BaseSettlementCycleItemProps) => void): TableColumnsType<BaseSettlementCycleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Code',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleEnName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'EnName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleCnName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CnName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleMeaning()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'Meaning',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleScenario()),
        
        dataIndex: 'Scenario',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleAdvantage()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'Advantage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSettlementCycleDisadvantage()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'Disadvantage',
        sorter: true,
        align: 'left',
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
