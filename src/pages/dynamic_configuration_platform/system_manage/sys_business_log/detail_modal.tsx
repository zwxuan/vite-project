
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Timeline, Checkbox } from 'antd';
import { SysBusinessLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_business_log";
import dayjs from 'dayjs';
import LogItem from './log_item';
import DetailDataModal from './detail_data_modal';
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
                        <Button>对比操作</Button>
                    </div>
                </div>
                <div className="search-area-contant" style={{ padding: '10px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <Timeline
                        mode="left"
                        items={[
                            {
                                label: '2025-09-15 14:42:28',
                                children: (
                                    <LogItem
                                        itemId="item-1"
                                        userName="张晓小"
                                        description="张晓小在2025-09-15 14:42:28对查询资源列表:hrStaffModify(员工信息变更移动端子集模板)进行了查询"
                                        isChecked={selectedItems.includes('item-1')}
                                        onViewData={() => handleOpenDetailData(jsonData)}
                                        onCompare={(checked) => handleCompareChange('item-1', checked)}
                                    />
                                ),
                            },
                            {
                                label: '2025-09-15 13:56:28',
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
            </div>
        </Modal>
    );
};

export default DetailModal;
