import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal, Row, Col, Divider, Select, InputNumber, Radio, Input, DatePicker, Button, Splitter, Descriptions, Checkbox, Space } from 'antd';
import { DatePickerZH } from '@/components/date-picker/index';
import type { DescriptionsProps, TableColumnsType } from 'antd';
import { NotOffSettingItemProps } from "@/types/finance_manage/not_off_setting/not_off_setting";
import { CashBasisAccountingItemProps } from '@/types/finance_manage/cash_basis_accounting/cash_basis_accounting';
import { HotTable, HotColumn, HotRendererProps } from '@handsontable/react-wrapper';
import Handsontable from "handsontable";
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getNotOffFeesList } from '@/api/finance_manage/not_off_setting_service';
import { NotOffFeesItemProps } from '@/types/finance_manage/not_off_setting/not_off_fees';
import { getCashColumns } from './columns';
import zh from 'antd/es/date-picker/locale/zh_CN';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import './charge_off_detail.less'
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<NotOffSettingItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
}
const { RangePicker } = DatePicker;


const invoiceItems: DescriptionsProps['items'] = [
    {
        key: '1',
        label: '结算单位',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: '上海大洋行有限公司',
        span: 6,
    },
    {
        key: '3',
        label: '发票抬头',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: '上海大洋行有限公司',
        span: 4,
    },
    {
        key: '2',
        label: '发票号',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: '6666',
        span: 2,
    },
    {
        key: '4',
        label: '开票日期',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: '2025-03-04',
        span: 2,
    },
    {
        key: '5',
        label: '币种',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: 'RMB',
        span: 2,
    },
    {
        key: '6',
        label: '金额',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'right' },
        children: '200.00',
        span: 2,
    },
    {
        key: '7',
        label: '应付类型',
        labelStyle: { width: '120px', textAlign: 'center', fontWeight: 'bold' },
        contentStyle: { textAlign: 'left' },
        children: '应付',
        span: 2,
    },
];

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
}) => {
    const [value, setValue] = useState([]);
    const hotTableRef = useRef<any>(null);
    const [orderFeeList, setOrderFeeList] = useState([] as NotOffFeesItemProps[]);
    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getCashColumns(() => { }, () => { }));

    useEffect(() => {
        const getData = async () => {
            const orderFeeData = await getNotOffFeesList();
            // 设置order_fee台账数据
            setOrderFeeList([...orderFeeData.splice(0, 5)]);
        };

        getData();
    }, []);
    const customerRenderer: React.FC<HotRendererProps> = ({ instance, TD, row, col, prop, value, cellProperties }) => {
        Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, value, cellProperties);
        // 获取单元格元数据
        const cellMeta = instance.getCellMeta(row, col);
        // 如果单元格被修改过
        if (cellMeta.isModified) {
            TD.style.color = '#ff1648'; // 修改后的前景色
        }

        // 如果单元格是新增的
        if (cellMeta.isNew) {
            TD.style.color = '#007ace'; // 新增的前景色
        }
        if (cellProperties.type === 'dropdown') {
            // 手动添加自动完成箭头元素
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'htAutocompleteArrow';
            arrowDiv.setAttribute('aria-hidden', 'true');
            arrowDiv.textContent = '▼';
            TD.appendChild(arrowDiv);
        }
        return null;
    };
    const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => {
        if (source === 'edit') {
            const hotInstance = hotTableRef.current.hotInstance;
            if (!hotInstance) {
                return;
            }
            const cellProperties: Handsontable.CellProperties[] = hotInstance.getCellsMeta();

            changes?.forEach(([row, prop]) => {
                const colType = cellProperties.filter((item: Handsontable.CellProperties) => {
                    return item.prop === prop.toString();
                });
                const cellMeta = hotInstance.getCellMeta(row, colType[0].col);
                cellMeta.isModified = true; // 标记为已修改
            });
            hotInstance.render(); // 重新渲染表格
        }
    };
    return (
        <Modal
            open={open}
            title={'销账-上海大洋行有限公司'}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
                <div className="search-area-contant">
                    <div className="item-charging-container-modal">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: 350 }} layout='vertical'>
                                    <Splitter.Panel style={{ paddingBottom: '20px' }} defaultSize="20%" collapsible min="5%">
                                        <Descriptions column={12} size='small' bordered items={invoiceItems} />
                                    </Splitter.Panel>
                                    <Splitter.Panel style={{ paddingTop: '20px' }} collapsible>
                                        <HotTable
                                            ref={hotTableRef}
                                            data={orderFeeList}
                                            height={'200px'}
                                            dropdownMenu={false}
                                            hiddenColumns={{
                                                indicators: true
                                            }}
                                            rowHeaderWidth={35}
                                            multiColumnSorting={false}
                                            filters={false}
                                            rowHeaders={true}
                                            headerClassName="htCenter"
                                            commentedCellClassName='htLeft'
                                            manualRowMove={true}
                                            autoWrapRow={true}
                                            navigableHeaders={true}
                                            themeName="ht-theme-main"
                                            afterChange={handleAfterChange}
                                            licenseKey="non-commercial-and-evaluation"
                                        >
                                            <HotColumn data="IsCheck" title='<input type="checkbox" class="htCheckboxRendererInput" />' width={40} type='checkbox' className="htCenter" />
                                            <HotColumn data="BusinessNumber" title='业务编号' width={180} readOnly="true" className="htLeft" renderer={customerRenderer} />
                                            <HotColumn data="MBL" title='MBL' width={180} className="htLeft" readOnly="true" renderer={customerRenderer} />
                                            <HotColumn data="BusinessDate" title='业务日期' width={100} className="htLeft" readOnly="true" renderer={customerRenderer} />
                                            <HotColumn data="FeeName" title='费用名称' width={100} className="htLeft" readOnly="true" renderer={customerRenderer} />
                                            <HotColumn data="ReconciliationStatus" title='对账状态' width={100} className="htLeft" readOnly="true" renderer={customerRenderer} />
                                            <HotColumn data="ExchangeRate" title='汇率' type='numeric' readOnly="true"
                                                numericFormat={{
                                                    pattern: '0,0.0000',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={80} />
                                            <HotColumn data="BusinessStatus" title='业务状态' width={100} className="htLeft" readOnly="true" />
                                            <HotColumn data="CreditDebit" title='收|付' width={100} className="htLeft" readOnly="true" />
                                            <HotColumn data="Currency" title='币制' width={100} className="htLeft" readOnly="true" />
                                            <HotColumn data="WriteOffExchangeRate" title='核销汇率' type='numeric' readOnly="true"
                                                numericFormat={{
                                                    pattern: '0,0.0000',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={80} />
                                            <HotColumn data="Amount" title='金额' type='numeric' readOnly="true"
                                                numericFormat={{
                                                    pattern: '0,0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={120} />
                                            <HotColumn data="LastBalance" title='上次余额' type='numeric' readOnly="true"
                                                numericFormat={{
                                                    pattern: '0,0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={120} />
                                            <HotColumn data="CurrentWriteOff" title='本次核销' type='numeric'
                                                numericFormat={{
                                                    pattern: '0,0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight cell_write_background" width={120} />
                                            <HotColumn data="CurrentBalance" title='本次余额' type='numeric' readOnly="true"
                                                numericFormat={{
                                                    pattern: '0,0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={120} />
                                        </HotTable>
                                    </Splitter.Panel>
                                </Splitter>
                            </Col>

                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px',marginTop: '10px' }}>
                                <Space size={10} style={{ flex: 1 }}>
                                    <span className="modal-body-left-commons-title-text">
                                        总计 USD:1,000.00 RMB:24,540.00 折合RMB:31,640.00
                                    </span>
                                    <span className='rule_tilte_info'>
                                        <Checkbox value="1">已确认费用</Checkbox>
                                    </span>
                                </Space>
                            </div>
                        </Row>
                        <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed></Divider>
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>销账汇率</label>
                                    <Radio.Group
                                        name="radiogroup"
                                        defaultValue={1}
                                        // onChange={onChangeCD}
                                        options={[
                                            { value: 1, label: '按平均汇率' },
                                            { value: 2, label: '按费用汇率' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={3}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>上次余额</label>
                                    <InputNumber<number>
                                        defaultValue={1000}
                                        style={{ flex: 1 }}
                                        formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    />
                                </div>
                            </Col>
                            <Col span={3}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>本次核销</label>
                                    <InputNumber style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={3}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>本次余额</label>
                                    <InputNumber style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={3}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>预估汇差</label>
                                    <InputNumber style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Button type="primary">使用实收实付记录</Button>
                            </Col>
                        </Row>
                        <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed></Divider>
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={3}>
                                <div style={{ paddingBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label>收款金额</label>
                                        <InputNumber style={{ flex: 1 }} />
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label>汇兑损益</label>
                                        <InputNumber style={{ flex: 1 }} />
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label>财务费用</label>
                                        <InputNumber style={{ flex: 1 }} />
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label>零头短账</label>
                                        <InputNumber style={{ flex: 1 }} />
                                    </div>
                                </div>
                            </Col>
                            <Col span={20}>
                                <div className='nc-bill-table-area' style={{ margin: '0 0' }}>
                                    <Table<CashBasisAccountingItemProps>
                                        columns={columnsType}
                                        rowKey={(record) => `${record.CounterpartyAccountNumber, record.BankReceiptNumber, record.OurAccountNumber}`}
                                        showSorterTooltip={false}
                                        dataSource={[]}
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
                                        footer={() => '底部汇总信息'}
                                        title={() => (<div style={{ marginLeft: '10px' }}>
                                            <span className="modal-body-left-commons-title-text">
                                                实收实付记录
                                            </span>
                                        </div>)}
                                        bordered={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed></Divider>
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={4}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>销账备注</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={4}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>收款日期</label>
                                    <DatePickerZH />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label style={{ color: 'red', fontSize: '16px', fontWeight: 'bolder' }}>本次核销=收款金额+汇兑损益+财务费用+零头短账</label>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ textAlign: 'right' }}>
                                    <Space>
                                        <Button onClick={onCancel} disabled={saving}>取消</Button>
                                        <Button type="primary" htmlType='submit' danger disabled={saving}>确定销账</Button>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DetailModal;
