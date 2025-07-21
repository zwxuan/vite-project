
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Splitter, Tooltip, Row, Col, Tree } from 'antd';
import { AdminOrgItemProps } from "@/types/org_manage/admin_org";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { start } from 'repl';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import { max } from 'three/examples/jsm/nodes/Nodes.js';
const { Search } = Input;

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
                selectable: false,
                checked: false,
            },
            {
                title: '1102 海运事业部',
                key: 'admin_org_lev2_1102',
                selectable: false,
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
                selectable: false,
                checked: false,
            },
            {
                title: '1104 西安子公司',
                key: 'admin_org_lev2_1104',
                selectable: false,
                checked: false,
            },
        ],
    },


];
const Detail: React.FC = () => {
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
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 行政组织明细
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span> 反映企业的法定实体结构和行政管理汇报关系。它定义了员工在法律意义上属于哪个公司、部门、科室等。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>本质</b></span>具有独立法人资格的公司,公司内部具体的部门、科室、班组等，体现汇报层级（如：总裁办、财务部、研发中心、华东销售部、北京分公司销售一部）。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>关键特征</b></span>稳定性高，法律属性强，汇报关系明确。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>应用场景</b></span>劳动合同管理，薪酬核算与发放，法定福利缴纳，个税申报，人员编制管理。
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
                        <div style={{ display: "inline" }}>
                            <label className="u-checkbox nc-checkbox">
                                <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >保存</Button>
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
            <div className='nc-bill-table-area' style={{ height: 'calc(100vh - 100px)' }}>
                <Splitter>
                    <Splitter.Panel collapsible={{ end: true }} defaultSize='20%' min='10%' max='60%' >
                        <Row gutter={24} style={{ paddingTop: '8px', width: '100%', marginBottom: '8px' }}>
                            <Col span={14}>
                                <Search placeholder="编码/名称" allowClear />
                            </Col>
                            <Col span={8}>
                                <Select
                                    defaultValue="全部展开"
                                    style={{ width: '100%' }}
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
                        <Row style={{width: '100%'}}>
                            <Col span={24}>
                                <Tree
                                    showLine
                                    defaultExpandAll={true}
                                    treeData={treeData}
                                    showIcon
                                    style={{
                                        background: '#fff',
                                        borderRadius: '2px',
                                        height: 'calc(100vh - 280px)',
                                        overflowY: 'auto'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <div>456</div>
                    </Splitter.Panel>
                </Splitter>
            </div>

        </div>

    );
};

export default Detail;
