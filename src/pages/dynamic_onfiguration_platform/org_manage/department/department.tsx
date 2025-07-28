import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Splitter, Tooltip, Row, Col, Tree, Checkbox, Radio, TreeSelect } from 'antd';
import { AdminOrgItemProps } from "@/types/dynamic_onfiguration_platform/org_manage/admin_org";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { start } from 'repl';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import '../tab_detail.less'
import DatePickerZH from '@/components/date-picker';
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
        value:'admin_org_lev1_11',
        checked: false,
        children: [
            {
                title: '1101 青岛分公司',
                key: 'admin_org_lev2_1101',
                value:'admin_org_lev2_1101',
                checked: false,
            },
            {
                title: '1102 海运事业部',
                key: 'admin_org_lev2_1102',
                value:'admin_org_lev2_1102',
                checked: false,
                children: [
                    {
                        title: '110201 宁波站',
                        key: 'admin_org_lev3_110201',
                        value:'110201 宁波站',
                        checked: false,
                    },
                    {
                        title: '110202 天津站',
                        key: 'admin_org_lev3_110202',
                        value:'admin_org_lev3_110202',
                        checked: false,
                    },
                ],
            },
            {
                title: '1103 上海子公司',
                key: 'admin_org_lev2_1103',
                value:'admin_org_lev2_1103',
                checked: false,
            },
            {
                title: '1104 西安子公司',
                key: 'admin_org_lev2_1104',
                value:'admin_org_lev2_1104',
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
const Department: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orgCode = searchParams.get('orgCode');
    const [treeData, setTreeData] = useState<TreeNode[]>(initTreeData);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 部门详情
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>行政组织归属</b></span> 用于报税和凭证。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>管理组织归属</b></span> 用于业务部门。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span> 用于统计时，财务口径和业务口径根据不同的维度来出数据。
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
                                <Button type="primary" danger >新增下级</Button>
                                <Button type="primary" danger >新增平级</Button>
                                <Button type="primary" danger >保存</Button>
                                <Button>冻结</Button>
                                <Button>停用</Button>
                                <Button>全部启用</Button>
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
                <Splitter>
                    <Splitter.Panel collapsible={{ end: true }} defaultSize='18%' min='10%' max='40%' >
                        <Row gutter={24} style={{ paddingTop: '8px', width: '100%', marginBottom: '8px' }}>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>行政组织</label>
                                    <TreeSelect
                                        showSearch
                                        style={{ flex: 1,textAlign: 'left',fontSize: '12px'}}
                                        treeLine={true}
                                        defaultValue={'110201 宁波站'}
                                        placeholder="行政组织"
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={treeData}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingTop: '8px', width: '100%', marginBottom: '8px' }}>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>部门状态</label>
                                    <Select style={{ flex: 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        mode="multiple"
                                        maxTagCount={1}
                                        options={[
                                            { "value": "未启用", "label": "未启用" },
                                            { "value": "已启用", "label": "已启用" },
                                            { "value": "已停用", "label": "已停用" },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingTop: '8px', width: '100%', marginBottom: '8px' }}>
                            <Col span={15}>
                                <Search placeholder="编码/名称" style={{ width: '100%' }} size="small" allowClear />
                            </Col>
                            <Col span={9}>
                                <Select
                                    defaultValue="全部展开"
                                    style={{ width: '100%', textAlign: 'left' }}
                                    options={[
                                        { value: '全部展开', label: '全部展开' },
                                        { value: '全部收起', label: '全部收起' },
                                        { value: '展开1级', label: '展开1级' },
                                        { value: '展开2级', label: '展开2级' },
                                        { value: '展开3级', label: '展开3级' },
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row style={{ width: '100%' }}>
                            <Col span={24}>
                                <Tree
                                    showLine
                                    defaultExpandAll={true}
                                    treeData={deptmentTreeData}
                                    showIcon
                                    style={{
                                        background: '#fff',
                                        borderRadius: '2px',
                                        height: 'calc(100vh - 220px)',
                                        overflowY: 'auto'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>部门编号</label>
                                    <Input style={{ flex: 1 }} defaultValue={30} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>部门名称</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>简称</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>所属行政上级</label>
                                    <Select
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: '集团总部', label: '集团总部' },
                                            { value: '海运事业部', label: '海运事业部' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>部门性质</label>
                                    <Select
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: '销售部门', label: '销售部门' },
                                            { value: '研发部门', label: '研发部门' },
                                            { value: '订舱部门', label: '订舱部门' },
                                            { value: '职能部门', label: '职能部门' },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>负责人</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "李伟" },
                                        { "value": "2", "label": "张译林" },
                                        { "value": "3", "label": "王晓伟" },
                                        { "value": "4", "label": "赵新杰" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>分管领导</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "李伟" },
                                        { "value": "2", "label": "张译林" },
                                        { "value": "3", "label": "王晓伟" },
                                        { "value": "4", "label": "赵新杰" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>工作地点</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>管理组织归属</label>
                                    <Select
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: '集团总部', label: '集团总部' },
                                            { value: '海运事业部', label: '海运事业部' },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'></label>
                                    <Checkbox.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1 }}
                                        defaultValue={[1]}
                                        options={[
                                            { value: 1, label: '可用于任职' },
                                        ]}
                                    />
                                </div>
                            </Col>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>状态</label>
                                    <Radio.Group
                                        style={{ flex: 1 }}
                                        defaultValue={2}
                                        name='statusRadioBox'
                                        options={[
                                            { value: 1, label: '未启用' },
                                            { value: 2, label: '已启用' },
                                            { value: 3, label: '已停用' },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>冻结状态</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "未冻结", "label": "未冻结" },
                                        { "value": "已冻结", "label": "已冻结" },
                                    ]}></Select>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>冻结日期</label>
                                    <DatePickerZH style={{ flex: 1 }} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>描述</label>
                                    <TextArea style={{ flex: 1 }} rows={4} />
                                </div>
                            </Col>
                        </Row>
                    </Splitter.Panel>
                </Splitter>
            </div>

        </div>

    );
};

export default Department;
