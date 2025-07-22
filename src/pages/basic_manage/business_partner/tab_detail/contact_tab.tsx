
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Popconfirm, Tooltip } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getColumns } from './columns';
import { ContactItemProps } from '@/types/basic_manage/contact';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const Contact: React.FC = () => {

    // 计费标准数据
    const [chargingStandardList, setChargingStandardList] = useState([] as ContactItemProps[]);
    const [editingKey, setEditingKey] = useState('');
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            // const chargingStandardData = await getChargingStandardList();
            // // 设置计费标准台账数据
            // setChargingStandardList([...chargingStandardData]);
        };
        getData();
    }, []);

    const handleDelete = (record: ContactItemProps) => {
        try {
            // TODO: 调用删除API
            const newData = chargingStandardList.filter(item => item.ContactId !== record.ContactId);
            setChargingStandardList(newData);
        } catch (error) {
            console.error('Delete failed:', error);
            notification.error({
                message: '删除失败',
                description: '请稍后重试'
            });
        }
    };
    const handleEdit = (record: ContactItemProps) => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        setEditingKey(record.ContactId?.toString() || '');
    };
    const handleSave = async (record: ContactItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...chargingStandardList];
            const index = newData.findIndex(item => record.ContactId === item.ContactId);
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
        const newRow: ContactItemProps = {
            // 联系人ID
            ContactId: newId,
            // 联系人
            ContactName: '',
            // 职能
            JobFunction: '',
            // 航线
            Route: '',
            // 电话
            Phone: '',
            // 地址
            Address: '',
            // 邮件地址
            Email: '',
            // 抄送地址
            CcEmail: '',
            // 手机
            Mobile: '',
            // 推送节点
            PushNode: '',
            // 推送方式
            PushMethod: '',
            // 备注
            Remarks: '',
            // QQ
            QqNumber: '',
            // 微信号
            WechatId: '',
            // Skype
            SkypeId: '',
        };
        setChargingStandardList([...chargingStandardList, newRow]);
        setEditingKey(newId);
    };

    const columnsType = getColumns(handleEdit, handleDelete, handleSave, handleCancel, editingKey);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ContactItemProps> = {
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

    const handleSearch = (values: any) => {
        console.log('handleSearch', values);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 120px)' }}>

            <div className="header-button-area">
                <div style={{ textAlign: 'right', paddingRight: '8px', paddingTop: '3px' }}>
                    <div className="buttonGroup-component">
                        <div className="u-button-group">

                            <Button onClick={handleAdd}>新增</Button>
                            <Button>修改</Button>
                            <Button>删除</Button>
                            <Button>复制</Button>
                        </div>
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>推送节点</b></span>主要用于指定向该合作伙伴自动推送运单状态更新或相关数据的目标地址或标识,API地址，FTP地址。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>推送方式</b></span>只是针对该联系人个人的消息通知设置。
                                        </li>
                                    </ol>
                                </div>
                            }
                            color='white'>
                            <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<ContactItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.ContactId}`}
                    showSorterTooltip={false}
                    dataSource={chargingStandardList}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                />
            </div>
        </div>


    )
}
export default Contact;

