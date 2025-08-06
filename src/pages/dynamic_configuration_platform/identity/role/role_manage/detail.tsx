import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Splitter, Tooltip, Row, Col, Tree, Checkbox, Radio, TreeSelect, Tabs, AutoComplete, Cascader } from 'antd';
import { AdminOrgItemProps } from "@/types/dynamic_configuration_platform/org_manage/admin_org";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { start } from 'repl';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import './tab_detail.less'
import DatePickerZH from '@/components/date-picker';
import FunctionManagement from './tabs/function_permission';
import DataPermission from './tabs/data_permission';
import FieldsPermission from './tabs/field_permission';
const { Search, TextArea } = Input;

interface TreeNode extends DataNode {
    title: string;
    key: string;
    value?: string;
    children?: TreeNode[];
    checked?: boolean;
    // indeterminate?:boolean;
}

const initTreeData: TreeNode[] = [
    {

        title: '11 集团总部',
        key: 'admin_org_lev1_11',
        value: 'admin_org_lev1_11',
        checked: false,
        children: [
            {
                title: '1101 青岛分公司',
                key: 'admin_org_lev2_1101',
                value: 'admin_org_lev2_1101',
                checked: false,
            },
            {
                title: '1102 海运事业部',
                key: 'admin_org_lev2_1102',
                value: 'admin_org_lev2_1102',
                checked: false,
                children: [
                    {
                        title: '110201 宁波站',
                        key: 'admin_org_lev3_110201',
                        value: '110201 宁波站',
                        checked: false,
                    },
                    {
                        title: '110202 天津站',
                        key: 'admin_org_lev3_110202',
                        value: 'admin_org_lev3_110202',
                        checked: false,
                    },
                ],
            },
            {
                title: '1103 上海子公司',
                key: 'admin_org_lev2_1103',
                value: 'admin_org_lev2_1103',
                checked: false,
            },
            {
                title: '1104 西安子公司',
                key: 'admin_org_lev2_1104',
                value: 'admin_org_lev2_1104',
                checked: false,
            },
        ],
    },
];

const deptmentTreeData: TreeNode[] = [
    {
        title: '运营部',
        key: 'admin_org_lev1_11',
        checked: false,
        children: [
        ],
    },
    {
        title: '订舱部',
        key: 'admin_org_lev1_12',
        checked: false,
        children: [
            {
                title: '北美订舱',
                key: 'admin_org_lev2_1101',
                checked: false,
            },
            {
                title: '中东订舱',
                key: 'admin_org_lev2_1102',
                checked: false,
            },
        ],
    },
];

const items = [
    {
        label: `功能权限`,
        key: 'function_permission',
        children: <FunctionManagement />,
    },
    {
        label: `数据权限`,
        key: 'data_permission',
        children: <DataPermission />,
    },
    {
        label: `数据权限规则`,
        key: 'data_permission_rule',

        children: '数据权限规则定义，主要用于根据当前业务实体字段过滤相关数据',
    },
    {
        label: `字段权限`,
        key: 'field_permission',
        children: <FieldsPermission />,
    },
];
interface Option {
    value: string;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: '11',
        label: '集团总部',
        children: [
            {
                value: '1101',
                label: '青岛分公司',
                children: [
                    {
                        value: '110101',
                        label: '报关部',
                    },
                ],
            },
            {
                value: '1102',
                label: '海运事业部',
                children: [
                    {
                        value: '110201',
                        label: '宁波站',
                        children: [
                            {
                                value: '11020101',
                                label: '订舱部',
                            },
                        ],
                    },
                ],
            },
        ],
    },

];
const Detail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const orgCode = searchParams.get('orgCode');
    const [treeData, setTreeData] = useState<TreeNode[]>(initTreeData);
    const handleBack = () => {
        navigate('/role/role_manage');
    };
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 角色详情
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>功能权限</b></span>页面上相关功能按钮是否显示。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>数据权限</b></span>当前角色除了所属组织的数据权限外，还可以看到这里配置的其余公司和人的数据权限。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>字段权限</b></span>用于控制页面上字段是只读、读写、隐藏。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>角色类型</b></span>只有管理类、业务类两种类型，管理类默认开通角色管理权限，业务类默认不开通角色管理权限。
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
                                <Button type="primary" danger >保存</Button>
                                <Button>取消</Button>
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
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>管理组织</label>
                            <Cascader style={{ flex: 1, textAlign: 'left' }} options={options} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色编码</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色名称</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色组</label>
                            <Select
                                style={{ flex: 1 }}
                                options={[
                                    { value: '生产类', label: '生产类' },
                                    { value: '销售类', label: '销售类' },
                                    { value: '客服类', label: '客服类' },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色类型</label>
                            <Select
                                style={{ flex: 1 }}
                                options={[
                                    { value: '业务类', label: '业务类' },
                                    { value: '管理类', label: '管理类' },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色标签</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "角色标签1", "label": "角色标签1" },
                                { "value": "角色标签2", "label": "角色标签2" },
                                { "value": "角色标签3", "label": "角色标签3" },
                                { "value": "角色标签4", "label": "角色标签4" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>创建人</label>
                            <Input style={{ flex: 1 }} disabled />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>修改人</label>
                            <Input style={{ flex: 1 }} disabled />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色描述</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>创建时间</label>
                            <DatePickerZH style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>修改时间</label>
                            <DatePickerZH style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='nc-bill-table-area'>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>

    );
};

export default Detail;
