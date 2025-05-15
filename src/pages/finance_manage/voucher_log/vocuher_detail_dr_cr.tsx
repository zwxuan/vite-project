
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Input, Space, Button, Radio, Table, Modal, Select, Divider } from 'antd';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import '@/pages/page_list.less';
import './voucher_detail.less';
const { Title, } = Typography;
const { TextArea } = Input;
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
import { getColumns,getVoucherDetailColumns } from './columns';
import DatePickerZH from '@/components/date-picker';
import { VoucherDetailItemProps } from '@/types/finance_manage/voucher_log/voucher_detail';
import { getVoucherDetailList } from '@/api/finance_manage/voucher_log_service';

interface DetailModalProps {
    open: boolean;
    onCancel: () => void;
    formData: Partial<VoucherLogItemProps>;
}

const VoucherDrCrModal: React.FC<DetailModalProps> = ({
    open,
    onCancel,
}) => {
    const [voucherDetail, setVoucherDetail] = useState([] as VoucherDetailItemProps[]);
    const columnsType = getVoucherDetailColumns();
    useEffect(() => {
        const getData = async () => {
            const voucherLogData = await getVoucherDetailList();
            // 设置凭证生成日志台账数据
            setVoucherDetail([...voucherLogData]);
        };
        getData();
    }, []);

    return (
        <Modal
            open={open}
            title={'凭证明细'}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            footer={null}
            centered={true}
        >
            <div className="voucher-review-container">
                <div className="voucher-header">
                    <Row gutter={24}>
                        <Col span={8} className='company-info-left-lable'>
                        </Col>
                        <Col span={8} style={{ verticalAlign: 'text-top' }}>
                            <Row gutter={24}>
                                <Col span={24} className='company-info-title-lable'>
                                    记账凭证
                                </Col>
                            </Row>
                            <Row gutter={24}>
                            </Row>
                        </Col>
                        <Col span={8} className='company-info-left-lable'>
                            <Row gutter={24}>
                                <Col span={8}></Col>
                                <Col span={8}>
                                    凭证号：
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}></Col>
                                <Col span={8}>
                                    凭证日期：
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Row gutter={24} className="company-info">
                    <Col span={24} style={{ padding: '0px 0px' }}>
                        <div className='nc-bill-table-area'>
                            <Table<VoucherDetailItemProps>
                                columns={columnsType}
                                rowKey={(record) => `${record.Id}`}
                                showSorterTooltip={false}
                                dataSource={voucherDetail}
                                pagination={false}
                                scroll={{ x: 'max-content', y: 'calc(100vh - 480px)' }}
                                bordered={true}
                                footer={() => (
                                    <div style={{textAlign:'right',paddingRight:'3px'}}>总计： 借2000.00 贷2000.00</div>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[24, 0]} className="company-info-bottom">
                    <Col span={24}>

                    </Col>
                </Row>
                <Row gutter={[24, 2]} style={{ paddingRight: '6px' }}>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>客户</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>供应商</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>职员</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                        </div>
                    </Col>
                </Row>
                <Row gutter={[24, 2]} style={{ paddingRight: '6px' }}>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>部门</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>业务员</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>项目编号</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>项目号2</label>
                            <Input style={{ flex: 1 }} disabled></Input>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[24, 2]} style={{ paddingRight: '6px' }}>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label>发生日期</label>
                            <DatePickerZH style={{ flex: 1 }} disabled></DatePickerZH>
                        </div>
                    </Col>

                    <Col span={18}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[24, 2]} style={{ marginTop: '20px', textAlign: 'left' }}>
                    <Col span={24}>

                    </Col>
                </Row>
                <Divider style={{ borderColor: '#7cb305' }}></Divider>
                <Row gutter={[24, 2]}>
                    <Col span={23}>
                        <Space size={20}>
                            <Space>1/2</Space>
                            <Space>
                                <Button type='primary'>上一张</Button>
                                <Button type='primary'>下一张</Button>
                            </Space>

                            <Space size={20}>
                                <Space>制单人: freesky</Space>
                                <Space>审核人: freesky</Space>
                            </Space>

                        </Space>
                    </Col>
                    <Col span={1}>

                        <Space>
                            <Button type='primary' onClick={onCancel}>关闭</Button>
                        </Space>

                    </Col>
                </Row>
            </div>
        </Modal>
    );
};
export default VoucherDrCrModal;
