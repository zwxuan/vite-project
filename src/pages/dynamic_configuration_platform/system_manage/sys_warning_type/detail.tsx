
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker, Col, Row, Table, Radio, Checkbox } from 'antd';
import { SysWarningTypeItemProps, SysWarningTypeParamItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_type";
import { RedoOutlined, DownOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CodeBoxMeta from '@/components/code-box-meta';
import TextArea from 'antd/es/input/TextArea';
import DatePickerZH from '@/components/date-picker';
import CustomIcon from '@/components/custom-icon';
import { useNavigate } from 'react-router-dom';
import './tab_detail.less'
import { useTableOperations } from '@/hooks/useTableOperations';
import { getSysWarningTypeParamColumns } from './columns';
const WarningTypeDetail: React.FC = () => {
    const navigate = useNavigate();
    const [sysWarningTypeParamList, setSysWarningTypeParamList] = useState([] as SysWarningTypeParamItemProps[]);
    const handleBack = () => {
        navigate('/warning_task/sys_warning_type');
    };
    const newPartnerRowId = Date.now().toString();
    const primaryJobOperations = useTableOperations({
        dataList: sysWarningTypeParamList,
        setDataList: setSysWarningTypeParamList,
        createNewRow: () => ({
            SeqNo: newPartnerRowId,
            ParamName: '',
            ParamCode: '',
            DataType: '',
            ValueRange: '',
            Required: 'false',
            ParamDesc: '',
        } as SysWarningTypeParamItemProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsPrimaryJobType = getSysWarningTypeParamColumns(
        primaryJobOperations.handleEdit,
        primaryJobOperations.handleDelete,
        primaryJobOperations.handleSave,
        primaryJobOperations.handleCancel,
        primaryJobOperations.editingKey
    );
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 预警类型明细
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}></div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >新增</Button>
                                <Button type="primary" danger >保存</Button>
                                <Button type="primary" danger >停用</Button>

                                <Button onClick={handleBack}>返回</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area' style={{ height: 'calc(100vh - 100px)', background: '#f9fbff' }}>
                <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>
                    <Col span={22} className='ant-tranfer-col'>
                        <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>员工编号</label>
                                    <Input style={{ flex: 1 }} defaultValue={30} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>员工姓名</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>身份证号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>性别</label>
                                    <Select
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: '男', label: '男' },
                                            { value: '女', label: '女' },
                                            { value: '未知', label: '未知' },
                                        ]}
                                    />
                                    <Checkbox.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: 1, label: '销售员' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>出生日期</label>
                                    <DatePickerZH style={{ flex: 1 }}></DatePickerZH>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>电子邮箱</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>手机号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>状态</label>
                                    <Radio.Group
                                        style={{ flex: 1, textAlign: 'left' }}
                                        defaultValue={2}
                                        options={[
                                            { value: 1, label: '未启用' },
                                            { value: 2, label: '已启用' },
                                            { value: 3, label: '已停用' },
                                        ]}
                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>备注</label>
                                    <TextArea style={{ flex: 1 }} rows={4} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2} className='ant-tranfer-col' >
                        
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24} className='ant-tranfer-col-left'>
                        <CodeBoxMeta title="条件">

                            <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                <div className="u-button-group">
                                    <Button type='primary' size='small' onClick={primaryJobOperations.handleAdd}>新增</Button>
                                </div>
                            </div>
                            <Table<SysWarningTypeParamItemProps>
                                columns={columnsPrimaryJobType}
                                rowKey={(record) => `${record.SeqNo}`}
                                showSorterTooltip={false}
                                dataSource={sysWarningTypeParamList}
                                pagination={false}
                                scroll={{ x: 'max-content', y: '130px' }}
                                footer={() => ''}
                                bordered={true}
                            />

                        </CodeBoxMeta>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default WarningTypeDetail;
