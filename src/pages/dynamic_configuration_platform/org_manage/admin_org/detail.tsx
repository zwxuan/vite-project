import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Splitter, Tooltip, Row, Col, Tree, Checkbox, Radio } from 'antd';
import { AdminOrgItemProps } from "@/types/dynamic_configuration_platform/org_manage/admin_org";
import dayjs from 'dayjs';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { start } from 'repl';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import '../tab_detail.less'
const { Search, TextArea } = Input;

interface TreeNode extends DataNode {
    title: string;
    key: string;
    children?: TreeNode[];
    checked?: boolean;
    // indeterminate?:boolean;
}

const initTreeData: TreeNode[] = [
    {

        title: '11 集团总部',
        key: 'admin_org_lev1_11',
        checked: false,
        children: [
            {
                title: '1101 青岛分公司',
                key: 'admin_org_lev2_1101',
                checked: false,
            },
            {
                title: '1102 海运事业部',
                key: 'admin_org_lev2_1102',
                checked: false,
                children: [
                    {
                        title: '110201 宁波站',
                        key: 'admin_org_lev3_110201',
                        checked: false,
                    },
                    {
                        title: '110202 天津站',
                        key: 'admin_org_lev3_110202',
                        checked: false,
                    },
                ],
            },
            {
                title: '1103 上海子公司',
                key: 'admin_org_lev2_1103',
                checked: false,
            },
            {
                title: '1104 西安子公司',
                key: 'admin_org_lev2_1104',
                checked: false,
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
        navigate('/org/admin_org');
    };
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 行政组织明细
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
            <div className='nc-bill-table-area' style={{ height: 'calc(100vh - 100px)',background: '#f9fbff' }}>
                <Splitter>
                    <Splitter.Panel collapsible={{ end: true }} defaultSize='18%' min='10%' max='40%' >

                        <Row gutter={24} style={{ paddingTop: '8px', width: '100%', marginBottom: '8px' }}>
                            <Col span={15}>
                                <Search placeholder="编码/名称" style={{ width: '100%' }} size="small" allowClear />
                            </Col>
                            <Col span={9}>
                                <Select
                                    defaultValue="全部展开"
                                    style={{ width: '100%',textAlign:'left' }}
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
                                    treeData={treeData}
                                    showIcon
                                    style={{
                                        background: '#fff',
                                        borderRadius: '2px',
                                        height: 'calc(100vh - 140px)',
                                        overflowY: 'auto'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <Row gutter={24} style={{marginTop:'8px'}} className='ant-tranfer-row'>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>编号</label>
                                    <Input style={{ flex: 1 }} defaultValue={30} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>名称</label>
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
                                    <label className='item-lable-title'>上级组织</label>
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
                                    <label className='item-lable-title'>统一社会信用代码</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>纳税人名称</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>公司地址</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>公司电话</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>联系人</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}> 
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>纳税人类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "一般纳税人" },
                                        { "value": "2", "label": "小规模纳税人" },
                                        { "value": "3", "label": "其他" },
                                    ]}></Select>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>汇率类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "基准汇率" },
                                        { "value": "2", "label": "自定义汇率" },
                                    ]}></Select>
                                </div>      
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>币制</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "人民币" },
                                        { "value": "2", "label": "美元" },
                                        { "value": "3", "label": "欧元" },
                                        { "value": "3", "label": "英镑" },
                                        { "value": "3", "label": "日元" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>组织形态</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "分公司" },
                                        { "value": "2", "label": "子公司" },
                                        { "value": "3", "label": "事业部" },
                                        { "value": "3", "label": "办事处" },
                                        { "value": "3", "label": "其他" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}> 
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>状态</label>
                                    <Radio.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1 }}
                                        defaultValue={[2]}
                                        options={[
                                            { value: 1, label: '未启用' },
                                            { value: 2, label: '已启用' },
                                            { value: 2, label: '已停用' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>核算类型</label>
                                    <Checkbox.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1 }}
                                        defaultValue={[2]}
                                        options={[
                                            { value: 1, label: '对外核算' },
                                            { value: 2, label: '对内核算' },
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
                                            { value: 1, label: '是否纳税主体' },
                                        ]}
                                    />
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

export default Detail;
