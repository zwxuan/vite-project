
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Col, Row, Table, Radio, Checkbox, Tooltip } from 'antd';
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
    const [warningMode, setWarningMode] = useState(2); // 默认接口模式
    const handleBack = () => {
        navigate(-1);
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
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>报表订阅模式</b></span>
                                                ✅ 报表模式，有现成报表，逻辑简单，不想麻烦IT，自己就能配。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>接口模式</b></span>
                                                🌐 接口模式，要查多个系统、复杂计算、动态逻辑	有开发资源，追求极致灵活。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
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
                    <Col span={24} className='ant-tranfer-col'>
                        <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>所属应用</label>
                                    <Select
                                        style={{ flex: 1,textAlign:'left' }}
                                        options={[
                                            { value: '结算中心', label: '结算中心' },
                                            { value: '关务中心', label: '关务中心' },
                                            { value: '仓储中心', label: '仓储中心' },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>类型名称</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>类型编号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>预警模式</label>
                                    <Radio.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1,textAlign:'left' }}
                                        value={warningMode}
                                        onChange={(e) => setWarningMode(e.target.value)}
                                        options={[
                                            { value: 1, label: '报表订阅模式' },
                                            { value: 2, label: '接口模式' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* 报表订阅模式 */}
                        {warningMode === 1 && (
                            <Row gutter={24} style={{}} className='ant-tranfer-row'>
                                <Col span={6}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label className='item-lable-title'>报表中心</label>
                                        <Select
                                            style={{ flex: 1 }}
                                            options={[
                                                { value: '报表一', label: '报表一' },
                                                { value: '报表二', label: '报表二' },
                                                { value: '报表三', label: '报表三' },
                                            ]}
                                        />
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label className='item-lable-title'>是否启用</label>
                                        <Radio.Group
                                            name="noticeTypeCheckbox"
                                            style={{ flex: 1 }}
                                            options={[
                                                { value: 1, label: '是' },
                                                { value: 2, label: '否' },
                                            ]}
                                        />
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label className='item-lable-title'>描述信息</label>
                                        <TextArea style={{ flex: 1 }} />
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {/* 接口模式                 */}
                        {warningMode === 2 && (
                            <>
                                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>
                                                接口
                                                <Tooltip
                                                    title={
                                                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>
                                                                    内部接口指系统内部的服务接口，URL以变量形式的相对网址方式提供。系统内部环境的网址替换，推荐使用。
                                                                    <p>外部接口指系统外部的服务接口，URL以绝对网址方式提供。不支持接口权限校验等，不推荐使用。</p>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    }
                                                    color='white'>
                                                    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                                                </Tooltip>
                                            </label>
                                            
                                            <Select
                                                style={{ width:'85px',textAlign:'left' }}
                                                options={[
                                                    { value: '内部接口', label: '内部接口' },
                                                    { value: '外部接口', label: '外部接口' },
                                                ]} />
                                            <Input style={{ flex: 1 }} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>是否启用</label>
                                            <Radio.Group
                                                name="noticeTypeCheckbox"
                                                style={{ flex: 1,textAlign:'left' }}
                                                value={2}
                                                options={[
                                                    { value: 1, label: '是' },
                                                    { value: 2, label: '否' },
                                                ]} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>
                                                是否组织过滤
                                                <Tooltip
                                                    title={
                                                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>
                                                                    主组织权限过滤是指，预警结果按消息接收人配置的角色，按用户-角色的主组织权限发送相应的消息；
                                                                    <p>所属组织过滤是指，预警结果按消息接收人配置的用户、角色的所属组织发送相应的消息；</p>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    }
                                                    color='white'>
                                                    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                                                </Tooltip>
                                            </label>
                                            <Select
                                                style={{ flex: 1,textAlign:'left' }}
                                                options={[
                                                    { value: '无过滤', label: '无过滤' },
                                                    { value: '主组织权限过滤', label: '主组织权限过滤' },
                                                    { value: '所属组织过滤', label: '所属组织过滤' },
                                                ]} />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>时间间隔</label>
                                            <Input style={{ flex: 1 }} />
                                            <Select
                                                style={{ flex: 1,textAlign:'left' }}
                                                options={[
                                                    { value: '小时', label: '小时' },
                                                    { value: '分钟', label: '分钟' },
                                                ]} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                                    <Col span={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>描述信息</label>
                                            <TextArea style={{ flex: 1 }} />
                                        </div>
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
                                                bordered={true} />

                                        </CodeBoxMeta>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>

            </div>

        </div>
    );
};

export default WarningTypeDetail;
