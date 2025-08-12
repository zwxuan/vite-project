import React, { useState } from 'react';
import '@/pages/page_list.less';
import { Radio, RadioChangeEvent, Space, Tooltip } from 'antd';
import CustomIcon from '@/components/custom-icon';
import RolePermission from './role_permission';
import JobPositionPermission from './job_position_permission';
const PermissionManagement: React.FC = () => {
    const [selectedType, setSelectedType] = useState('role');
    
    const onChange = (e: RadioChangeEvent) => {
        setSelectedType(e.target.value);
    };

    return (
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 60px)', background: '#f9fbff'}}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area" style={{width: '30%'}}>
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px",width: "160px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 授权分配岗位

                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>用来授予岗位功能权限和组织权限，支持角色、岗位双视角，为岗位关联角色以及为角色关联岗位。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>角色-复制</b></span>用来复制当前角色下已经分配的岗位。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>角色-粘贴</b></span>将复制的岗位，粘贴到当前角色下。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>岗位-复制</b></span>用来复制当前岗位下已经分配的角色。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>岗位-粘贴</b></span>将复制的角色，粘贴到当前岗位下。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px",width: "360px"}}>
                        <Space>
                            <Radio.Group
                                name="radiogroup"
                                value={selectedType}
                                onChange={onChange}
                                options={[
                                    { value: 'position', label: '按岗位' },
                                    { value: 'role', label: '按角色' },
                                ]}
                            />   
                        </Space>
                    </span>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                {selectedType === 'role' && <RolePermission />}
                {selectedType === 'position' && <JobPositionPermission />}
            </div>
        </div>
    );
};

export default PermissionManagement;