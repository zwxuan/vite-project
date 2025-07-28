import { AdvancedSearchFormProps } from "@/components/search-form";

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: '币种',
        key: 'CurrencyFullName',
    },
    {
        type: 'input',
        label: '币种简称',
        key: 'CurrencyShortName',
        suffix: 'ZH',
    },
    {
        type: 'input',
        label: '币种符号',
        key: 'CurrencyMark',
    },
    { 
        type: 'select', 
        key: 'PriceRoundingRule',
        label: '舍入规则', 
        selectOptions: [{ value: '1', label: '四舍五入' }, { value: '2', label: '向上舍入' }, { value: '3', label: '向下舍入' }] 
    },
    {
        type: 'date',
        label: '日期',
        key: 'CreateDate',
    },
    {
        type: 'rangedata',
        label: '日期范围',
        key: 'RangeDate',
    },
    {
        type: 'input',
        label: '自定义测试1',
        key: 'CurrencyShortName1',
        suffix: 'ZH',
    },
    {
        type: 'input',
        label: '自定义测试2',
        key: 'CurrencyMark1',
    },
    { 
        type: 'select', 
        key: 'PriceRoundingRule1',
        label: '自定义测试3', 
        selectOptions: [{ value: '1', label: '四舍五入' }, { value: '2', label: '向上舍入' }, { value: '3', label: '向下舍入' }] 
    },
    {
        type: 'date',
        label: '自定义测试4',
        key: 'CreateDate1',
    },
    {
        type: 'rangedata',
        label: '自定义测试5',
        key: 'RangeDate1',
    },
]; 