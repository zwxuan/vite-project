
import { TableColumnsType, Tag, Popconfirm, Select, Input, InputNumber } from 'antd';
import { BaseCorporateFundAccountItemProps, BaseFundAccountCurrencyItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_corporate_fund_account";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseCorporateFundAccountItemProps) => void, handleDelete: (record: BaseCorporateFundAccountItemProps) => void): TableColumnsType<BaseCorporateFundAccountItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenAccountType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OpenAccountType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountSettlementCenter()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'SettlementCenter',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountOwningOrg()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OwningOrg',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenAccountOrg()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OpenAccountOrg',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountBankAccountNo()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'BankAccountNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountHolderName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountHolderName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpeningBank()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OpeningBank',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountEbillAgentBank()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'EbillAgentBank',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountPurpose()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountPurpose',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountLevel()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountLevel',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountNature()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountNature',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenDate()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OpenDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountTaxRegister()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxRegister',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountStatus()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCorporateFundAccountRemark()),
        dataIndex: 'Remark',
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


export const getCurrencyColumns = (handleEdit: (record: BaseFundAccountCurrencyItemProps) => void, handleDelete: (record: BaseFundAccountCurrencyItemProps) => void, handleSave: (record: BaseFundAccountCurrencyItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<BaseFundAccountCurrencyItemProps> => [
    {
        title: i18n.t(LocaleHelper.getBaseFundAccountCurrencyCurrencyCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CurrencyCode',
        sorter: true,
        align: 'left',
        render: (text: string, record: BaseFundAccountCurrencyItemProps) => {
            const editable = record.Id === editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.PaymentMethod}
                    defaultValue={record.CurrencyCode}
                    style={{ width: '160px',textAlign:'left' }}
                    onChange={value => record.CurrencyCode = value }
                    options={[
                        { value: 'CNY', label: '人民币' },
                        { value: 'USD', label: '美金' },
                        { value: 'JPY', label: '日元' },
                        { value: 'GBP', label: '英镑' },
                        { value: 'EUR', label: '欧元' },
                        { value: 'AUD', label: '澳大利亚元' },
                        { value: 'CAD', label: '加拿大元' },
                        { value: 'CHF', label: '瑞士法郎' },
                        { value: 'HKD', label: '港币' },
                        { value: 'SGD', label: '新加坡元' },
                        { value: 'NZD', label: '新西兰元' },
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getBaseFundAccountCurrencyIbanCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'IbanCode',
        
        sorter: true,
        align: 'left',
        render: (text: string, record: BaseFundAccountCurrencyItemProps) => {
            const editable = record.Id === editingKey;
            return editable ? (
                <Input style={{ width: '200px',textAlign:'left' }}
                    // value={editingRow?.FeeName}
                    defaultValue={record.IbanCode}
                    onChange={e => record.IbanCode = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getBaseFundAccountCurrencyStatus()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'center',
        render: (text: boolean, record: BaseFundAccountCurrencyItemProps) => {
            const editable = record.Id === editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Status}
                    style={{ width: '160px',textAlign:'left' }}
                    onChange={value => record.Status = value }
                    options={[
                        { value: true, label: '是' },
                        { value: false, label: '否' }
                    ]}
                />
            ) : (
                text ? '是' : '否'
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getBaseFundAccountCurrencyRemark()),
        width: 300,
        onHeaderCell: () => ({ style: { width: '300px' } }),
        dataIndex: 'Remark',
        sorter: true,
        align: 'left',
        render: (text: string, record: BaseFundAccountCurrencyItemProps) => {
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.SettlementUnitType}
                    defaultValue={record.Remark}
                    onChange={e => record.Remark = e.target.value }
                />
            ) : (
                text
            );
        }
    },
    {
        title: '',
        dataIndex: '',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 80,
        render: (_: any, record: BaseFundAccountCurrencyItemProps) => {
            const editable = record.Id === editingKey;
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