import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, Row, Col, Radio, Checkbox,Table, TableColumnsType } from 'antd';
import { HotTable, HotColumn, HotRendererProps } from '@handsontable/react-wrapper';
import Handsontable from "handsontable";
import { InvoiceIssuanceReceiptItemProps } from "@/types/invoice_issuance_receipt/invoice_issuance_receipt";
import { getInvoiceIssuanceReceiptList,saveInvoiceIssuanceReceipt } from "@/api/fee_manage/invoice_issuance_receipt_service";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import './invoice_issuance.less'
import { getColumns,getSmallColumns } from './columns';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
const radioStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};


const InvoiceIssuanceModal: React.FC<DetailModalProps> = ({
    open,
    saving,
    onCancel,
    onOk,
    onChange
}) => {
    const hotTableRef = useRef<any>(null);
    const [orderFeeList, setOrderFeeList] = useState([] as any[]);
    const [invoiceIssuanceReceiptList, setInvoiceIssuanceReceiptList] = useState([] as InvoiceIssuanceReceiptItemProps[]);
    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getSmallColumns(() => {}, () => {}));
    
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            // 设置order_fee台账数据
            setOrderFeeList([...Array(Math.max(0, 5)).fill({})]);
            const invoiceIssuanceReceiptData = await getInvoiceIssuanceReceiptList();
            // 设置开票收票台账数据
            setInvoiceIssuanceReceiptList([...invoiceIssuanceReceiptData]);
        };

        getData();
    }, []);

    const yellowRenderer: React.FC<HotRendererProps> = ({ instance, TD, row, col, prop, value, cellProperties }) => {
        Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, value, cellProperties);
        TD.style.backgroundColor = '#ffffbb';
        return null;
    };


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
    // 处理新增行
    const handleAfterCreateRow = (index: number, amount: number, source?: Handsontable.ChangeSource) => {
        if (source === 'ContextMenu.rowAbove' || source === 'ContextMenu.rowBelow') {
            const hotInstance = hotTableRef.current.hotInstance;
            hotInstance.getDataAtRow(index).forEach((_: any, col: number) => {
                const cellMeta = hotInstance.getCellMeta(index, col);
                cellMeta.isNew = true; // 标记为新增
            });
            hotInstance.render(); // 重新渲染表格
        }
    };
    return (
        <Modal
            open={open}
            title='开票'
            onCancel={onCancel}
            width={'calc(100vw - 280px)'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <div className='invoice-container'>
                <div className='invoice-left-item'>
                    <Row gutter={24}>
                        <Col span={4}>开票方式：</Col>
                        <Col span={20}>应收发票</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>开票类型：</Col>
                        <Col span={20}>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                style={radioStyle}
                                options={[
                                    { value: 1, label: '合并开票(按结算单位分组开票)' },
                                    { value: 2, label: '合并开票(按结算代理分组开票)' },
                                    { value: 3, label: '按业务开票(按结算单位分组开票)' },
                                    { value: 4, label: '按业务开票(按结算单位分组开票)' },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>发票种类：</Col>
                        <Col span={20}>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                options={[
                                    { value: 1, label: '纸质发票' },
                                    { value: 2, label: '电子发票' },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>发票类型：</Col>
                        <Col span={20}>
                            <Select labelInValue style={{ textAlign: 'left', width: '200px' }}
                                defaultValue='增值税普通发票'
                                options={[
                                    { label: '增值税普通发票', value: '1' },
                                    { label: '增值税专用发票', value: '2' },
                                    { label: '内部发票', value: '3' },
                                    { label: '普通发票', value: '4' },
                                    { label: '专用发票', value: '5' },
                                ]} >
                            </Select>
                            <InputNumber style={{width:"60px"}} min={1} max={10} defaultValue={9} controls={false}></InputNumber>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>分币种开票：</Col>
                        <Col span={20}>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                options={[
                                    { value: 1, label: '拆分币种开票' },
                                    { value: 2, label: '合并币种开票' },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>开票币种：</Col>
                        <Col span={20}>
                            <Select labelInValue style={{ textAlign: 'left', width: '240px' }}
                                defaultValue='人民币'
                                options={[
                                    { label: '人民币', value: 'CNY' },
                                    { label: '美元', value: 'USD' },
                                    { label: '港币', value: 'HKD' },
                                    { label: '欧元', value: 'EUR' },
                                ]} >
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>结算部门：</Col>
                        <Col span={20}>
                            <Select labelInValue style={{ textAlign: 'left', width: '240px' }}
                                defaultValue=''
                                options={[
                                    { label: '结算部', value: '结算部' },
                                    { label: '财务部', value: '财务部' },
                                    { label: '航线部', value: '航线部' },
                                    { label: '海外部', value: '海外部' },
                                ]} >
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>其他：</Col>
                        <Col span={20}>
                            <Checkbox.Group
                                name="checkboxgroup"
                                style={radioStyle}
                                options={[
                                    { value: 1, label: '发票内容显示费用明细' },
                                    { value: 2, label: '按财务汇率开票' },
                                    { value: 3, label: '按账单汇率开票' },
                                    { value: 4, label: '生成成本发票' },
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='invoice-right-item'>
                    <div className="nc-bill-search-area">发票项目名称设置</div>
                    <div className='nc-bill-table-area'>
                        <HotTable
                            ref={hotTableRef}
                            data={orderFeeList}
                            height={'300px'}
                            dropdownMenu={false}
                            hiddenColumns={{
                                indicators: true
                            }}
                            contextMenu={{
                                items: {
                                    row_above: {
                                        name: '在上方插入',
                                    },
                                    row_below: {
                                        name: '在下方插入',
                                    },
                                    remove_row: {
                                        name: '删除行',
                                    },
                                    copy: {
                                        name: '复制行',
                                    },
                                    cut: {
                                        name: '剪切行',
                                    },

                                    separator: ContextMenu.SEPARATOR,
                                    clear_custom: {
                                        name: '清空表格',
                                        callback() {
                                            this.clear();
                                        },
                                    },
                                },
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
                            afterCreateRow={handleAfterCreateRow}
                            licenseKey="non-commercial-and-evaluation"
                        >
                            <HotColumn
                                data="FeeName"
                                title="发票类型"
                                className="htLeft ellipsis-cell"
                                type="dropdown"
                                strict={true}
                                language="zh-cn"
                                width={220}
                                // renderer={yellowRenderer}
                                source={async (query: string, process: (data: string[]) => void) => {

                                }}
                            />
                            <HotColumn data="CreditDebit" title='CNY费用项名称' width={180} className="htLeft" renderer={customerRenderer} />
                            <HotColumn data="DomesticForeign" title='USD费用项名称' width={100} className="htLeft" renderer={customerRenderer} />
                            <HotColumn data="DomesticForeign2" title='JPY费用项名称' width={100} className="htLeft" renderer={customerRenderer} />
                            <HotColumn data="DomesticForeign3" title='EUR费用项名称' width={100} className="htLeft" renderer={customerRenderer} />
                            <HotColumn data="Quantity" title='税率' type='dropdown' source={['10%','6%','0%','9%','13%']} renderer={customerRenderer}
                                className="htRight" width={150} />
                            {/* checkbox有问题     */}
                            {/* <HotColumn data="IsDefault" title='是否默认' type='checkbox' /> */}
                        </HotTable>
                    </div>
                    {/*  */}
                </div>
            </div>
            <div className='nc-bill-table-area'>
                        <Table
                            columns={columnsType}
                            rowKey={(record) => `${record.BusinessId}`}
                            showSorterTooltip={false}
                            dataSource={invoiceIssuanceReceiptList}
                            loading={invoiceIssuanceReceiptList.length === 0}
                            pagination={false}
                            scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                            // style={{ width: '800px',height:'300px' } }
                            title={() => '费用详情'}
                            bordered={true}
                        />
                    </div>
            <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                <Space>
                    <Button onClick={onCancel} disabled={saving}>取消</Button>
                    <Button type="primary" htmlType='submit' danger disabled={saving}>保存</Button>
                </Space>
            </div>

        </Modal>
    );
};

export default InvoiceIssuanceModal; 