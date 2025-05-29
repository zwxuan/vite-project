
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Radio, Modal, Row, Col, Input, InputNumber, Select, Progress, notification, Checkbox } from 'antd';
import type { MenuProps, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getPaymentApplicationBusinessList, getPaymentApplicationFeeList } from "@/api/cost_manage/payment_application_service";
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import { getPaymentAppFeeColumns, getPaymentAppBusinessColumns } from './columns';
import { fieldsFee, fieldsBusiness } from './search_fields';
import { PaymentApplicationFeeItemProps } from '@/types/cost_manage/payment_application_fee';
import { PaymentApplicationBusinessItemProps } from '@/types/cost_manage/payment_application_business';
import DatePickerZH from '@/components/date-picker';
import TextArea from 'antd/es/input/TextArea';
import './payment_application.less'
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const PaymentApplicationStep2: React.FC = () => {
    // 未核销数据
    const [paymentApplicationFeeData, setPaymentApplicationFeeData] = useState([] as PaymentApplicationFeeItemProps[]);
    const [fieldsFeeData, setFieldsFeeData] = useState(fieldsFee);
    // 获取未核销数据
    useEffect(() => {
        const getData = async () => {
            const paymentApplicationFeeData = await getPaymentApplicationFeeList();
            // 设置未核销台账数据
            setPaymentApplicationFeeData([...paymentApplicationFeeData]);
        };
        getData();
    }, []);

    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getPaymentAppFeeColumns(() => { }, () => { }));


    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<PaymentApplicationFeeItemProps> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'checkbox',
        columnWidth: '20px',
    };
    const options = [
        { label: '海运出口', value: '海运出口' },
        { label: '海运进口', value: '海运进口' },
        { label: '空运出口', value: '空运出口' },
        { label: '空运进口', value: '空运进口' },
        { label: '铁路出口', value: '铁路出口' },
        { label: '铁路进口', value: '铁路进口' },
        { label: '综合物流', value: '综合物流' },
        { label: 'FBA', value: 'FBA' },
    ];
    return (
        <div>
            <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
                <div className="search-area-contant">
                    <div className="item-charging-container-modal">
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={20}>
                                <Row gutter={24} style={{ paddingRight: '6px',marginTop:'2px' }}>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>申请单号</label>
                                            <Input style={{ flex: 1 }} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>状态</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '未提交', value: '未提交' },
                                                    { label: '未审批', value: '未审批' },
                                                    { label: '已提交', value: '已提交' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>结算对象</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '结算对象1', value: '结算对象1' },
                                                    { label: '结算对象2', value: '结算对象2' },
                                                    { label: '结算对象3', value: '结算对象3' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>通过结算代理</label>
                                            <Checkbox></Checkbox>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '结算代理对象1', value: '结算代理对象1' },
                                                    { label: '结算代理对象2', value: '结算代理对象2' },
                                                    { label: '结算代理对象3', value: '结算代理对象3' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{ paddingRight: '6px',marginTop:'2px' }}>
                                    <Col span={18}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>业务类型</label>
                                            <Checkbox.Group options={options} defaultValue={[]} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>申请人</label>
                                            <Input style={{ flex: 1 }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{ paddingRight: '6px',marginTop:'2px' }}>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>付款币种</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '人民币', value: 'RMB' },
                                                    { label: '美元', value: 'USD' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>金额</label>
                                            <InputNumber style={{ flex: 1 }} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>付款期限</label>
                                            <DatePickerZH style={{ flex: 1 }}></DatePickerZH>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>付款方式</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '现金', value: '现金' },
                                                    { label: '支票', value: '支票' },
                                                    { label: '银行转账', value: '银行转账' },
                                                    { label: '本票', value: '本票' },
                                                    { label: '代收代付', value: '代收代付' },
                                                    { label: '水单', value: '水单' },
                                                    { label: '冲账', value: '冲账' },
                                                    { label: '第三方支付平台', value: '第三方支付平台' },
                                                    { label: '银行承兑汇票', value: '银行承兑汇票' },
                                                    { label: '商业承兑汇票', value: '商业承兑汇票' },
                                                    { label: '水单退款', value: '水单退款' }
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{ paddingRight: '6px',marginTop:'2px' }}>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>开票抬头</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '结算对象1', value: '结算对象1' },
                                                    { label: '结算对象2', value: '结算对象2' },
                                                    { label: '结算对象3', value: '结算对象3' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>银行账号</label>
                                            <Input style={{ flex: 1 }} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>开户银行</label>
                                            <Select labelInValue style={{ textAlign: 'left', width: '240px', flex: 1 }}
                                                defaultValue=''
                                                options={[
                                                    { label: '中国银行某某支行', value: '中国银行某某支行' },
                                                    { label: '中国建设银行某某支行', value: '中国建设银行某某支行' },
                                                    { label: '中国农业银行某某支行', value: '中国农业银行某某支行' },
                                                ]} >
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item_label_title'>申请日期</label>
                                            <DatePickerZH style={{ flex: 1 }}></DatePickerZH>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <div style={{color:'red'}}>注：此界面已过滤掉完全核销的费用/业务</div>                
                                <div style={{ paddingBottom: '6px' }}>
                                    <label className='item_label_title'>备注</label>
                                    <TextArea></TextArea>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col span={24} style={{ padding: '3px 12px' }}>
                                <Space>
                                    <Button type='primary'>移除费用</Button>
                                </Space>
                            </Col>
                        </Row>
                        <div className='nc-bill-table-area' style={{ margin: '0 0' }}>
                            <Table<PaymentApplicationFeeItemProps>
                                columns={columnsType}
                                rowSelection={rowSelection}
                                rowKey={(record) => `${record.BillNumber}`}
                                showSorterTooltip={false}
                                dataSource={[]}
                                pagination={
                                    {
                                        size: 'small',
                                        pageSize: 50, showTotal: (total) => `总共 ${total} 条`,
                                        showQuickJumper: true,
                                        locale:
                                        {
                                            items_per_page: '/页',
                                            jump_to: '跳至',
                                            page: '页',
                                        }
                                    }
                                }
                                scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                                footer={() => (<div style={{ marginLeft: '10px' }}>
                                    <span className="modal-body-left-commons-title-text">
                                        分币种合计USD:20.00;合计 USD:20.00;
                                    </span>
                                </div>)}
                                title={() => (<div style={{ marginLeft: '10px' }}>
                                    <span className="modal-body-left-commons-title-text">
                                        费用记录
                                    </span>
                                </div>)}
                                bordered={true}
                            />
                        </div>
                        <div className='nc-bill-table-area' style={{ margin: '0 0' }}>
                            <Checkbox>按账单汇率付款</Checkbox>
                            <Space>
                                <label>USD转USD:1.0000</label>
                                <label>USD转CNY:7.0000</label>
                                <label>CNY转USD:0.1800</label>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentApplicationStep2;

