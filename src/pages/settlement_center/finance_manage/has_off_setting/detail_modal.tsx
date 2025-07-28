
import React, { useState, useEffect } from 'react';
import { Modal, Table, Input, InputNumber, Select, Button, Space, Row, Col,Divider } from 'antd';
import { DatePickerZH } from '@/components/date-picker/index';
import { HasOffSettingItemProps, OffSettingDetailItemProps } from "@/types/settlement_center/finance_manage/has_off_setting";
import { getHasOffDetailList } from "@/api/settlement_center/finance_manage/has_off_setting_service";
import { getDetailColumns } from './columns';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
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

const DetailModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    onCancel,
}) => {
    const [hasOffSettingList, setHasOffSettingList] = useState([] as OffSettingDetailItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    // 获取已核销数据
    useEffect(() => {
        const getData = async () => {
            const hasOffSettingData = await getHasOffDetailList();
            // 设置已核销台账数据
            setHasOffSettingList([...hasOffSettingData]);
        };
        getData();
    }, []);
    const columnsType = getDetailColumns(() => { }, () => { });
    return (
        <Modal
            open={open}
            title={'销账明细-上海大洋行有限公司'}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <div className='nc-bill-table-area'>
                <Table<OffSettingDetailItemProps>
                    columns={columnsType}
                    rowKey={(record) => `${record.BusinessNumber}`}
                    showSorterTooltip={false}
                    dataSource={hasOffSettingList}
                    loading={hasOffSettingList.length === 0}
                    pagination={
                        {
                            size: 'small',
                            pageSize: 50, showTotal: (total) => `总共 ${total} 条`,
                            showQuickJumper: true,
                            locale:
                            {
                                items_per_page: '/页',
                                jump_to: '跳至',
                                page: '页',
                            }
                        }
                    }
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                />
            </div>
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{ paddingRight: '6px',marginBottom:'2px' }}>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>付款方式</label>
                            <Input defaultValue={'银行转账'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>水单状态</label>
                            <Input defaultValue={'未使用'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>我方银行</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>我方账号</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>凭证号</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px',marginBottom:'2px' }}>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>币种</label>
                            <Input defaultValue={'RMB'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>付款金额</label>
                            <InputNumber defaultValue={1000} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>对方单位</label>
                            <Input defaultValue={'上海大洋行'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>对方银行</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>对方账号</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px',marginBottom:'2px' }}>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>汇兑损益</label>
                            <Input defaultValue={'0.00'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>财务费用</label>
                            <InputNumber defaultValue={0.00} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>零头短账</label>
                            <Input defaultValue={'0.00'} style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={9}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>备注</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px',marginBottom:'2px' }}>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>预收付备注</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
                <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed></Divider>
                <Row gutter={24} style={{ paddingRight: '6px'}}>
                    <Col span={14}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>核销总计 RMB:800.00 折算总计 RMB:800.00</label>
                        </div>
                    </Col>
                    <Col span={10} style={{ textAlign: 'right',paddingRight:'3px' }}>
                            <Button type="primary">复核</Button>
                            <Button type="primary">打印</Button>
                            <Button onClick={onCancel} disabled={saving}>取消</Button>
                    </Col>
                </Row>
            </div>

        </Modal>
    );
};

export default DetailModal;

