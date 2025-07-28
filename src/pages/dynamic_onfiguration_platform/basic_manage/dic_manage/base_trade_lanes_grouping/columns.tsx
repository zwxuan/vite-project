
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseTradeLanesGroupingItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_trade_lanes_grouping";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseTradeLanesGroupingItemProps) => void, handleDelete: (record: BaseTradeLanesGroupingItemProps) => void): TableColumnsType<BaseTradeLanesGroupingItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LaneGroupingCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingNameCn()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LaneGroupingNameCn',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingNameEn()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LaneGroupingNameEn',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingManager()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LaneGroupingManager',
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
