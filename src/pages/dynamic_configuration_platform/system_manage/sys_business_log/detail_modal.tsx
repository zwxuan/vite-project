
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Timeline, Checkbox } from 'antd';
import { SysBusinessLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_business_log";
import dayjs from 'dayjs';
import LogItem from './log_item';
import DetailDataModal from './detail_data_modal';
import DataCompareModal from './data_compare_modal';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<SysBusinessLogItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
    onChangeTetxtArea: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const jsonData = {
    ytenant: "idm74nu5",
    extendData: {
        masterOrgKeyField: "orgid"
    },
    fullName: "bd.enterprise.OrgFinCashacctVO",
    pubts: "2025-09-16 14:20:33",
    _status: 2,
    dr: 0,
    tenant: "idm74nu5",
    orgid: "2315263290310656001",
    metaFullName: "bd.enterprise.OrgFinCashacctVO"
};
const DetailModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    formData,
    onCancel,
    onOk,
    onChange,
    onDateChange,
    onNumberChange,
    onChangeTetxtArea,
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [compareOpen, setCompareOpen] = useState(false);
    const handleCompareChange = (itemId: string, checked: boolean) => {
        if (checked) {
            setSelectedItems(prev => {
                const newSelected = [...prev, itemId];
                // 如果超过2个，移除最早选中的
                if (newSelected.length > 2) {
                    return newSelected.slice(1);
                }
                return newSelected;
            });
        } else {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        }
    };

    const handleOpenDetailData = (record: any) => {
        setDetailOpen(true);
    };
    const handleCancelDetailData = () => {
        setDetailOpen(false);
    }

    const handleOpenCompareData = (record: any) => {
        setCompareOpen(true);
    };
    const handleCancelCompareData = () => {
        setCompareOpen(false);
    };
    return (



        <Modal
            open={open}
            title={"业务历史变更"}
            onCancel={onCancel}
            style={{ top: 20 }}
            width={'55%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={[
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>,
            ]}
        >
            <div className="nc-bill-search-area" style={{ height: '650px' }}>
                <div className="nc-bill-header-area">
                    <div className="header-title-search-area">
                        <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                                数据来源列表台账里的名称
                            </span>
                        </div>
                        <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        </span>
                    </div>
                    <div className="header-button-area">
                        <Button
                            onClick={handleOpenCompareData}
                            disabled={selectedItems.length !== 2}
                        >
                            对比操作
                        </Button>
                    </div>
                </div>
                <div className="search-area-contant" style={{ padding: '10px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <Timeline
                        mode="left"
                        items={[
                            {
                                label: '2025-09-15 14:42:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-1"
                                        userName="张晓小"
                                        description='张晓小在2025-07-29 09:50:06在测试说明设置功能权限["用户管理:[导入]","用户管理:[导出]","用户管理:[设置管理员]","用户管理:[移除]","数据权限:[编辑]","数据权限:[删除]","数据权限:[新增]","用户管理:[新增]","授权:[授权角色复制]","授权:[授权角色粘贴]","授权:[复制]","授权:[粘贴]","授权:[分配组织]","授权:[分配IT组织]","授权:[分配用户]","授权:[分配角色]","授权:[删除]","授权:[导出]","授权:[查看]","角色管理:[新增]","角色管理:[标签设置]","角色管理:[删除]","角色管理:[编辑]","角色管理:[Excel导出]","角色管理:[导入]","角色管理:[查看]","角色管理:[模板下载]","授权:[导入]","角色管理:[复制]","授权:[批量操作]"]'
                                        isChecked={selectedItems.includes('item-1')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-1', checked)}
                                    />
                                ),
                            },
                            {
                                label: '2025-09-15 13:56:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-2"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-2')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-2', checked)}
                                    />
                                ),
                            },
                            {
                                label: '2025-09-15 13:56:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-3"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-3')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-3', checked)}
                                    />
                                )
                            },
                            {
                                label: '2025-09-15 13:56:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-4"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-4')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-4', checked)}
                                    />
                                )
                            },
                            {
                                label: '2025-09-15 13:56:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-5"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-5')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-5', checked)}
                                    />
                                )
                            },
                            {
                                label: '2025-09-15 13:56:28',
                                color: 'green',
                                children: (
                                    <LogItem
                                        itemId="item-6"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-6')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-6', checked)}
                                    />
                                )
                            },
                        ]}
                    />
                </div>
                <DetailDataModal
                    open={detailOpen}
                    jsonData={jsonData}
                    onCancel={handleCancelDetailData}
                />
                <DataCompareModal
                    open={compareOpen}
                    newJsonData={{
                        sysRole: false,
                        modifiedTime: "1753753825231",
                        versionNum: 0,
                        isactive: 1,
                        modifier: "cf04df33-50e5-4d23-96ba-043e49960679",
                        description: "测试角色",
                        roleType: 1,
                        orgId: "666666",
                        enable: 1,
                        roleCode: "test",
                        hideRole: false,
                        multilingualDesc: "测试角色",
                        creator: "cf04df33-50e5-4d23-96ba-043e49960679",
                        orgName: "",
                        threeMemberType: 0,
                        roleId: "d6d602b2-200e-482e-ab88-bb5df8beacdd",
                        yxyTenantId: "4149696075275056",
                        label: "common",
                        ytenantId: "idm74nu5",
                        subTenantId: "0",
                        systemCode: "diwork",
                        createTime: "1753752995000",
                        editMode: 1,
                        roleName: "测试说明",
                        name: "测试说明",
                        tenantId: "idm74nu5",
                        ts: "1753753805000",
                        snowflakeId: "2324032531219873797"
                    }}
                    oldJsonData={{
                        sysRole: false,
                        versionNum: 0,
                        isactive: 1,
                        modifier: "cf04df33-50e5-4d23-96ba-043e49960679",
                        description: "测试角色",
                        roleType: 1,
                        orgId: "666666",
                        enable: 1,
                        roleCode: "test",
                        hideRole: false,
                        multilingualDesc: "测试角色",
                        createDate: "2025-07-29 09:36:35",
                        creator: "cf04df33-50e5-4d23-96ba-043e49960679",
                        orgName: "",
                        threeMemberType: 0,
                        roleId: "d6d602b2-200e-482e-ab88-bb5df8beacdd",
                        yxyTenantId: "4149696075275056",
                        label: "common",
                        ytenantId: "idm74nu5",
                        subTenantId: "0",
                        systemCode: "diwork",
                        createTime: "1753752995000",
                        editMode: 1,
                        roleName: "测试说明",
                        name: "测试说明",
                        tenantId: "idm74nu5",
                        ts: "1753753805000",
                        snowflakeId: "2324032531219873797"
                    }}
                    onCancel={handleCancelCompareData}
                />
            </div>
        </Modal>
    );
};

export default DetailModal;
