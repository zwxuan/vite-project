
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseTradeTermsItemProps } from "@/types/basic_manage/base_trade_terms";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseTradeTermsItemProps) => void, handleDelete: (record: BaseTradeTermsItemProps) => void): TableColumnsType<BaseTradeTermsItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Code',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsEnglishName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EnglishName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsChineseName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ChineseName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsMeaning()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Meaning',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsApplicableScenario()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ApplicableScenario',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsAdvantage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Advantage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTradeTermsDisadvantage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
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
