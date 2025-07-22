
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Col, Row, Checkbox, Tooltip } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BusinessPartnerItemProps } from "@/types/basic_manage/business_partner";
import { getBusinessPartnerList, saveBusinessPartner } from "@/api/basic_manage/business_partner_service";
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import DatePickerZH from '@/components/date-picker';
import './tab_detail.less'
import TextArea from 'antd/es/input/TextArea';
import { getColumns, getColumnsAngent } from './columns';
import CodeBoxMeta from '@/components/code-box-meta';
import { PortDestinationAgentItemProps } from '@/types/basic_manage/port_destination_agent';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ParterCustomer: React.FC = () => {

    // 计费标准数据
    const [chargingStandardList, setChargingStandardList] = useState([] as PortDestinationAgentItemProps[]);
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

    const handleDelete = (record: PortDestinationAgentItemProps) => {
        try {
            // TODO: 调用删除API
            const newData = chargingStandardList.filter(item => item.PortCode !== record.PortCode);
            setChargingStandardList(newData);
        } catch (error) {
            console.error('Delete failed:', error);
            notification.error({
                message: '删除失败',
                description: '请稍后重试'
            });
        }
    };
    const handleEdit = (record: PortDestinationAgentItemProps) => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        setEditingKey(record.PortCode?.toString() || '');
    };
    const handleSave = async (record: PortDestinationAgentItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...chargingStandardList];
            const index = newData.findIndex(item => record.PortCode === item.PortCode);
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
        const newRow: PortDestinationAgentItemProps = {
            // 联系人ID
            PortCode: newId,
            IsDefault:'否',
            DesignatedAgent:'',
            Remarks:''
        };
        setChargingStandardList([...chargingStandardList, newRow]);
        setEditingKey(newId);
    };

    const columnsType = getColumnsAngent(handleEdit, handleDelete, handleSave, handleCancel, editingKey);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<PortDestinationAgentItemProps> = {
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
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 120px)', paddingTop: '10px' }}>
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>客户级别</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "风险客户" },
                                { "value": "2", "label": "VIP客户" },
                                { "value": "3", "label": "普通客户" },
                                { "value": "4", "label": "付款买单客户" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>客户分类</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "潜在客户" },
                                { "value": "2", "label": "意向客户" },
                                { "value": "3", "label": "成交客户" },
                                { "value": "4", "label": "售后客户" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>客户行业</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "金融行业" },
                                { "value": "2", "label": "纺织行业" },
                                { "value": "3", "label": "零售行业" },
                                { "value": "4", "label": "医疗行业" },
                                { "value": "5", "label": "教育行业" },
                                { "value": "6", "label": "政府行业" },
                                { "value": "7", "label": "交通行业" },
                                { "value": "8", "label": "能源行业" },
                                { "value": "9", "label": "其他行业" },
                                { "value": "10", "label": "半导体行业" },
                                { "value": "11", "label": "信息技术" },
                                { "value": "12", "label": "电子行业" },
                                { "value": "13", "label": "通信行业" },
                                { "value": "14", "label": "仪器仪表" },
                                { "value": "15", "label": "化工行业" },
                                { "value": "16", "label": "机械行业" },
                                { "value": "17", "label": "食品行业" },
                                { "value": "18", "label": "医药行业" },
                                { "value": "19", "label": "食品加工行业" },
                                { "value": "20", "label": "建筑行业" },
                                { "value": "21", "label": "石油行业" },
                                { "value": "22", "label": "造纸行业" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>归属公司</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "公司一" },
                                { "value": "2", "label": "公司二" },
                                { "value": "3", "label": "公司三" },
                                { "value": "4", "label": "公司四" },
                            ]}></Select>
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[]}
                                options={[
                                    { value: 1, label: '同行' },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>
                                <Tooltip
                                    title={
                                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>自揽货</b></span>发货方是“客户”，货代需要通过销售去争取和服务好这个客户。发货方主导运输链条，包括选择目的港的合作伙伴。
                                                </li>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>指定货</b></span>收货方是“客户”（对于整个运输链条而言），收货方指定了运输方式和在目的港的代理。起运港的货代更像是一个执行环节，配合完成收货方的指令。
                                                </li>
                                            </ol>
                                        </div>
                                    }
                                    color='white'>
                                    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                                </Tooltip>
                                揽货类型
                            </label>
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[1, 2, 3, 4]}
                                options={[
                                    { value: 1, label: '自揽货' },
                                    { value: 2, label: '指定货' },
                                ]}
                            />

                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>销售</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "销售一" },
                                { "value": "2", "label": "销售二" },
                                { "value": "3", "label": "销售三" },
                                { "value": "4", "label": "销售四" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>客户来源</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "线上渠道" },
                                { "value": "2", "label": "线下渠道" },
                                { "value": "3", "label": "内部资源" },
                                { "value": "4", "label": "客户推荐" },
                                { "value": "4", "label": "行业展会" },
                            ]}></Select>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <CodeBoxMeta title="目的港指定货代理">
                            <div className="header-button-area">
                                <div style={{ textAlign: 'right', paddingRight: '8px', paddingTop: '3px' }}>
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
                                <Table<PortDestinationAgentItemProps>
                                    columns={columnsType}
                                    rowSelection={{ ...rowSelection }}
                                    rowKey={(record) => `${record.PortCode}`}
                                    showSorterTooltip={false}
                                    dataSource={chargingStandardList}
                                    pagination={false}
                                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                                    footer={() => ''}
                                    bordered={true}
                                />
                            </div>
                        </CodeBoxMeta>

                    </Col>
                </Row>

            </div>
        </div>




    )
}
export default ParterCustomer;
