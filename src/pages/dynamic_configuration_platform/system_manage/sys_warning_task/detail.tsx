
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Col, Row, Table, Tooltip, Radio, Checkbox } from 'antd';
import { SysWarningTaskCronProps, SysWarningTaskItemProps, SysWarningTaskReviceMessageProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_task";
import dayjs from 'dayjs';
import CodeBoxMeta from '@/components/code-box-meta';
import TextArea from 'antd/es/input/TextArea';
import { SysWarningTypeParamItemProps } from '@/types/dynamic_configuration_platform/system_manage/sys_warning_type';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { useTableOperations } from '@/hooks/useTableOperations';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMessageReviceColumns, getSysWarningTaskCronColumns, getSysWarningTypeParamColumns } from './columns';
const WarningTaskDetail: React.FC = () => {
    const navigate = useNavigate();
    const [sysWarningTypeParamList, setSysWarningTypeParamList] = useState([] as SysWarningTypeParamItemProps[]);
    const [sysWarningTaskCronList, setSysWarningTaskCronList] = useState([] as SysWarningTaskCronProps[]);
    const [sysWarningTaskReviceMessageList, setSysWarningTaskReviceMessageList] = useState([] as SysWarningTaskReviceMessageProps[]);
    // 获取预警类型数据
    useEffect(() => {
        const getData = async () => {

            // 初始化数据，添加一条模拟数据
            setSysWarningTypeParamList([{
                SeqNo: "1",
                ParamName: '模拟参数名',
                ParamCode: '模拟参数编码',
                DataType: '模拟数据类型',
                ValueRange: '模拟值范围',
                DefaultValue: '20',
                Required: 'true',
                ParamDesc: '模拟参数描述',
            }, {
                SeqNo: "2",
                ParamName: '模拟参数名',
                ParamCode: '模拟参数编码',
                DataType: '模拟数据类型',
                ValueRange: '模拟值范围',
                DefaultValue: '30',
                Required: 'false',
                ParamDesc: '模拟参数描述',
            }]);
            // 初始化数据，添加一条模拟数据
            setSysWarningTaskCronList([{
                SeqNo: "1",
                Cron: '0 0 0 * * ?',
                TestCron: '2025-09-01 00:00:00,2025-09-02 00:00:00,2025-09-03 00:00:00',
            }]);
            // 初始化数据，添加一条模拟数据
            setSysWarningTaskReviceMessageList([{
                SeqNo: "1",
                ReceiveType: '用户',
                ReceiveObject: '张晓晓',
            }, {
                SeqNo: "2",
                ReceiveType: '角色',
                ReceiveObject: '基础数据管理员',
            },
            {
                SeqNo: "3",
                ReceiveType: '组织',
                ReceiveObject: '青岛分公司',
            },
            {
                SeqNo: "4",
                ReceiveType: '岗位',
                ReceiveObject: '销售主管',
            }
            ]);
        };
        getData();
    }, []);
    const handleBack = () => {
        // 返回到上一页
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

    const cronRowId = Date.now().toString();
    const cronOperations = useTableOperations({
        dataList: sysWarningTaskCronList,
        setDataList: setSysWarningTaskCronList,
        createNewRow: () => ({
            SeqNo: cronRowId,
            Cron: '',
            TestCron: '',
        } as SysWarningTaskCronProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsCron = getSysWarningTaskCronColumns(
        cronOperations.handleEdit,
        cronOperations.handleDelete,
        cronOperations.handleSave,
        cronOperations.handleCancel,
        cronOperations.editingKey
    );

    const messageReviceColumns = getMessageReviceColumns();
    const handleSave = () => {
        //将条件数据保存到数据集中
        primaryJobOperations.handleSave;
        console.log(sysWarningTypeParamList);
    };
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 预警任务明细
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>
                                                配置预警任务什么时间运行，运行周期是每天、每周、每月、每年中的哪一个时间点？，填写调用接口时参数的值。填写预警消息发送给谁？
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
                                <Button type="primary" danger onClick={handleSave} >保存</Button>
                                <Button type="primary" danger >停用</Button>

                                <Button onClick={handleBack}>返回</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
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
                                        style={{ flex: 1, textAlign: 'left' }}
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
                                    <label className='item-lable-title'>预警类型</label>
                                    <Select
                                        style={{ flex: 1, textAlign: 'left' }}
                                        options={[
                                            { value: '预警类型1', label: '预警类型1' },
                                            { value: '预警类型2', label: '预警类型2' },
                                            { value: '预警类型3', label: '预警类型3' },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>任务名称</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>任务编号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>是否启用</label>
                                    <Radio.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1, textAlign: 'left' }}
                                        value={2}
                                        options={[
                                            { value: 1, label: '是' },
                                            { value: 2, label: '否' },
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
                                <CodeBoxMeta title="参数设置">

                                    <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                        {/* <div className="u-button-group">
                                            <Button type='primary' size='small' onClick={primaryJobOperations.handleAdd}>新增</Button>
                                        </div> */}
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

                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24} className='ant-tranfer-col-left'>
                                <CodeBoxMeta title="定时规则">

                                    <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' size='small' onClick={cronOperations.handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <Table<SysWarningTaskCronProps>
                                        columns={columnsCron}
                                        rowKey={(record) => `${record.SeqNo}`}
                                        showSorterTooltip={false}
                                        dataSource={sysWarningTaskCronList}
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: '130px' }}
                                        footer={() => ''}
                                        bordered={true} />

                                </CodeBoxMeta>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24} className='ant-tranfer-col-left'>
                                <CodeBoxMeta title="消息配置">
                                    <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>
                                        <Col span={6}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <label className='item-lable-title'>消息通道</label>
                                                <Checkbox.Group
                                                    name="noticeTypeCheckbox"
                                                    style={{ flex: 1, textAlign: 'left' }}
                                                    value={[2]}
                                                    options={[
                                                        { value: 1, label: '邮箱' },
                                                        { value: 2, label: '短信' },
                                                        { value: 3, label: '微信' },
                                                        { value: 4, label: '消息中心' },
                                                    ]} />
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <label className='item-lable-title'>消息模版</label>
                                                <Select
                                                    style={{ textAlign: 'left', width: '180px' }}
                                                    options={[
                                                        { value: '消息模版一', label: '消息模版一' },
                                                        { value: '消息模版二', label: '消息模版二' },
                                                        { value: '消息模版三', label: '消息模版三' },
                                                    ]}
                                                />
                                                <Button style={{ flex: 1 }} size='small'>新建消息模版</Button>
                                                <Button style={{ flex: 1 }} size='small'>编辑消息模版</Button>
                                            </div>
                                        </Col>

                                        <Col span={10}>

                                        </Col>
                                    </Row>
                                    <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>
                                        <Col span={6}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <label className='item-lable-title'>消息接收人</label>
                                                <Button style={{ width: '80px' }} size='small'>设置</Button>
                                            </div>
                                        </Col>
                                        <Col span={18}>

                                        </Col>
                                    </Row>
                                    <Table<SysWarningTaskReviceMessageProps>
                                        columns={messageReviceColumns}
                                        rowKey={(record) => `${record.SeqNo}`}
                                        showSorterTooltip={false}
                                        dataSource={sysWarningTaskReviceMessageList}
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: '130px' }}
                                        footer={() => ''}
                                        bordered={true} />
                                </CodeBoxMeta>

                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>

        </div>
    );
};

export default WarningTaskDetail;
