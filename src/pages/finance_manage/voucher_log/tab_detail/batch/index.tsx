
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Checkbox, Col, Radio, Row, Table, Tooltip } from 'antd';
import type { CheckboxOptionType, GetProp, TableProps } from 'antd';
import { OrdersItemProps } from "@/types/business_manage/orders";
import { getOrdersList } from "@/api/business_manage/orders_service";
import SumTableFooter from '@/components/table-footer/SumTableFooter';
import Ribbon from 'antd/es/badge/Ribbon';
import DatePickerZH from '@/components/date-picker';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface OrdersProps {
    isCurrentTabActive?: boolean;
}

const BatchCreateVoucher: React.FC = () => {

    useEffect(() => {

    }, []);
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const plainOptions : CheckboxOptionType<string>[] = [
        { label: '业务', value: 'business', },
    ];;

    const options: CheckboxOptionType<string>[] = [
        { label: '应收发票', value: 'invoice', },
        { label: '应付发票', value: 'pay_invoice', },
    ];

    const optionsWithDisabled: CheckboxOptionType<string>[] = [
        { label: '应收账单', value: 'bill_dr', },
        { label: '应付账单', value: 'bill_cr', },
    ];

    const optionsForeigen: CheckboxOptionType<string>[] = [
        { label: '国外账单', value: 'bill_foreign', },
    ];

    const optionsLocalDr: CheckboxOptionType<string>[] = [
        { label: '国内收款', value: 'local_dr', },
        { label: '国内付款', value: 'local_cr', },
    ];
    
    const optionsForeignDr: CheckboxOptionType<string>[] = [
        { label: '国外收款', value: 'foreign_dr', },
        { label: '国外付款', value: 'foreign_cr', },
    ];
    return (
        <div>
            <div className='nc-bill-table-area'>
                <Row gutter={24}>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>数据类型</b></span>数据来源凭证分组规则，设置了分组规则，这里默认就勾上。
                                        </li>
                                    </ol>
                                </div>
                            }
                            color='white'>
                            <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                        </Tooltip>
                        数据类型
                    </Col>
                    <Col span={22}>
                        <Checkbox.Group options={plainOptions} defaultValue={['business']} onChange={onChange} />
                        <br />
                        <br />
                        <Checkbox.Group options={options} defaultValue={['invoice','pay_invoice']} onChange={onChange} />
                        <br />
                        <br />
                        <Checkbox.Group options={optionsWithDisabled} onChange={onChange}/>
                        <br />
                        <br />
                        <Checkbox.Group options={optionsForeigen} onChange={onChange}/>
                        <br />
                        <br />
                        <Checkbox.Group options={optionsLocalDr} onChange={onChange}/>
                        <br />
                        <br />
                        <Checkbox.Group options={optionsForeignDr} onChange={onChange}/>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        业务日期
                    </Col>
                    <Col span={22}>
                        <DatePickerZH.RangePicker style={{ flex: 1 }} placeholder={['开始日期', '结束日期']} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default BatchCreateVoucher;

