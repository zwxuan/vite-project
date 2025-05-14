
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal,Form,Input,InputNumber,Select,Progress,notification,Popconfirm } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { ChargingStandardItemProps } from "@/types/system_manage/charging_standard/charging_standard";
import { getChargingStandardList,saveChargingStandard } from "@/api/basic_manage/charging_standard_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getColumns } from './columns';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const FeeTab : React.FC = () => {

    // 计费标准数据
    const [chargingStandardList, setChargingStandardList] = useState([] as ChargingStandardItemProps[]);
    const [editingKey, setEditingKey] = useState('');
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const chargingStandardData = await getChargingStandardList();
            // 设置计费标准台账数据
            setChargingStandardList([...chargingStandardData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:ChargingStandardItemProps) => {
        try {
            // TODO: 调用删除API
            const newData = chargingStandardList.filter(item => item.Id !== record.Id);
            setChargingStandardList(newData);
        } catch (error) {
            console.error('Delete failed:', error);
            notification.error({
                message: '删除失败',
                description: '请稍后重试'
            });
        }
    };
    const handleEdit = (record:ChargingStandardItemProps) => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        setEditingKey(record.Id?.toString() || '');
    };
    const handleSave = async (record:ChargingStandardItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...chargingStandardList];
            const index = newData.findIndex(item => record.Id === item.Id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...record,
                });
                setChargingStandardList(newData);
                setEditingKey('');
                notification.success({
                    message: '保存成功'
                });
            }
        } catch (error) {
            console.error('Save failed:', error);
            notification.error({
                message: '保存失败',
                description: '请稍后重试'
            });
        }
    };
    const handleCancel = () => {
        setEditingKey('');
        // setEditingRow(null);
    };
    const handleAdd = () => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        const newId = Date.now().toString();
        const newRow: ChargingStandardItemProps = {
            Id: newId,
            PaymentMethod: "应收",
            FeeName: "空运费",
            IsControlled: "否",
            SettlementUnitType: "客户",
            FixedSettlementUnit: "",
            Currency: "USD",
            City: "",
            BillingUnit: "计费重量价",
            ValueLowerLimit: 0,
            ValueUpperLimit: 0,
            ContainerType: "",
            ContainerCategory: "",
            Quantity: 0,
            BillingUnitPrice: "0",
            UnitPrice: 1000,
            MinimumCharge: 0,
            TaxRate: 0,
            Remarks: "",
            RequiresInvoice: "是",
        };
        setChargingStandardList([...chargingStandardList, newRow]);
        setEditingKey(newId);
    };
    
    const columnsType = getColumns(handleEdit, handleDelete, handleSave, handleCancel, editingKey);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ChargingStandardItemProps> = {
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

    return (
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
            
            <div className="header-button-area">
                <div style={{textAlign:'right',paddingRight:'8px',paddingTop:'3px'}}>
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button onClick={handleAdd}>新增</Button>
                            <Button>修改</Button>
                            <Button>删除</Button>
                            <Button>复制</Button>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<ChargingStandardItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.Id}`}
                    showSorterTooltip={false}
                    dataSource={chargingStandardList}
                    loading={chargingStandardList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default FeeTab;
