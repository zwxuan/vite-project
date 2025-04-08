
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Radio,Modal,Form,Input,InputNumber,Select,Progress,notification, Checkbox } from 'antd';
import type { MenuProps,RadioChangeEvent,TableColumnsType,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getPaymentApplicationBusinessList, getPaymentApplicationFeeList } from "@/api/fee_manage/payment_application_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import { getPaymentAppFeeColumns,getPaymentAppBusinessColumns } from './columns';
import { fieldsFee,fieldsBusiness } from './search_fields';
import { PaymentApplicationFeeItemProps } from '@/types/payment_application_fee/payment_application_fee';
import { PaymentApplicationBusinessItemProps } from '@/types/payment_application_business/payment_application_business';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const PaymentApplicationStep1 : React.FC = () => {

    // 未核销数据
    const [paymentApplicationFeeData, setPaymentApplicationFeeData] = useState([] as PaymentApplicationFeeItemProps[]);
    const [paymentApplicationBusinessData, setPaymentApplicationBusinessData] = useState([] as PaymentApplicationBusinessItemProps[]);
    const [fieldsFeeData, setFieldsFeeData] = useState(fieldsFee);
    const [radioValue, setRadioValue] = useState(1);
    const navigate = useNavigate();
    // 获取未核销数据
    useEffect(() => {
        const getData = async () => {
            if(radioValue === 1){
                const paymentApplicationFeeData = await getPaymentApplicationFeeList();
                // 设置未核销台账数据
                setPaymentApplicationFeeData([...paymentApplicationFeeData]);    
            }else{
                const paymentApplicationBusinessData = await getPaymentApplicationBusinessList();
                // 设置未核销台账数据
                setPaymentApplicationBusinessData([...paymentApplicationBusinessData]);    
            }
            
        };
        getData();
    }, [radioValue]);
    
    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getPaymentAppFeeColumns(()=>{}, ()=>{}));
    
    
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

    const rowBusinessSelection: TableRowSelection<PaymentApplicationBusinessItemProps> = {
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

    const handleSearch = (values:any) => {
        console.log('handleSearch',values);
    };
    const onChange = (e: RadioChangeEvent) => {
        if(e.target.value === 1){
            setRadioValue(1);
            setFieldsFeeData(fieldsFee);
            setColumns(getPaymentAppFeeColumns(() => {}, () => {}));
        }else if(e.target.value === 2){
            setRadioValue(2);
            setFieldsFeeData(fieldsBusiness);
            setColumns(getPaymentAppBusinessColumns(() => {}, () => {}));
        }
    };
    
    return (
        <div>
            <div className="nc-bill-search-area">
                <div className="search-area-contant">
                    <div className="item-contant" style={{ display: "block",textAlign: "left" }}>
                        <Space>
                            <label style={{fontWeight:'bolder'}}>查询方式：</label>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                onChange={onChange}
                                options={[
                                    { value: 1, label: '按费用' },
                                    { value: 2, label: '按业务' },
                                ]}
                            />
                            <Checkbox value="1">包含应收</Checkbox> 
                            <span style={{color:'red'}}>注：此界面已过滤掉完全核销的费用/业务</span>  
                        </Space>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fieldsFeeData} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                {radioValue===1 && (
                        <Table<PaymentApplicationFeeItemProps>
                        columns={columnsType}
                        rowSelection={{ ...rowSelection}}
                        rowKey={(record) => `${record.PaymentApplicationNumber}`}
                        showSorterTooltip={false}
                        dataSource={paymentApplicationFeeData}
                        pagination={
                            {
                                size:'small',
                                pageSize:50,showTotal: (total) => `总共 ${total} 条`,
                                showQuickJumper:true,
                                locale:
                                {
                                    items_per_page: '/页',
                                    jump_to: '跳至',
                                    page: '页',
                                }
                            }
                        }
                        scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                        footer={() => '底部汇总信息'}
                        bordered={true}
                    />
                )}
                {radioValue === 2 && (
                        <Table<PaymentApplicationBusinessItemProps>
                        columns={columnsType}
                        rowSelection={{ ...rowBusinessSelection}}
                        rowKey={(record) => `${record.BusinessNumber}`}
                        showSorterTooltip={false}
                        dataSource={paymentApplicationBusinessData}
                        pagination={
                            {
                                size:'small',
                                pageSize:50,showTotal: (total) => `总共 ${total} 条`,
                                showQuickJumper:true,
                                locale:
                                {
                                    items_per_page: '/页',
                                    jump_to: '跳至',
                                    page: '页',
                                }
                            }
                        }
                        scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                        footer={() => '底部汇总信息'}
                        bordered={true}
                    />
                )}
            </div>
        </div>
        
        
    )
}
export default PaymentApplicationStep1;
