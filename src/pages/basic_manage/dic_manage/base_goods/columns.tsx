
import { TableColumnsType, Tag, Popconfirm, Tooltip } from 'antd';
import { BaseGoodsItemProps } from "@/types/basic_manage/base_goods/base_goods";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseGoodsItemProps) => void, handleDelete: (record: BaseGoodsItemProps) => void): TableColumnsType<BaseGoodsItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseGoodsGoodsCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GoodsCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsGoodsName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GoodsName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsMostFavoredNationRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MostFavoredNationRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsOrdinaryRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrdinaryRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsValueAddedTax()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ValueAddedTax',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsLegalUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LegalUnit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsEnglishGoodsName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'EnglishGoodsName',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
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
        title: i18n.t(LocaleHelper.getBaseGoodsSecondUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SecondUnit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseGoodsRegulatoryMode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RegulatoryMode',
        sorter: true,
        align: 'left',
    },
    // {
    //     title: '操作',
    //     key: 'operation',
    //     fixed: 'right',
    //     width: 100,
    //     render: (_, record) => (
    //     <>
            
    //     </>
    //     ),
    // },
]; 
