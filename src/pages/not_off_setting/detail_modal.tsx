
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Modal, Row, Col, Select, Input, DatePicker, Button, Splitter } from 'antd';
import { NotOffSettingItemProps } from "@/types/not_off_setting/not_off_setting";
import { HotTable, HotColumn, HotRendererProps } from '@handsontable/react-wrapper';
import Handsontable from "handsontable";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getOrderFeeList, getFeeNameList } from "@/api/business_order/order_fee_service";
import { OrderFeeItemProps, FeeNameItemProps } from "@/types/order_fee/order_fee";
import zh from 'antd/es/date-picker/locale/zh_CN';
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

const zh_CNLocale: typeof zh = {
    ...zh,
    lang: {
        ...zh.lang,
        locale: 'zh_CN',
        fieldDateFormat: 'YYYY-MM-DD',
        fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        yearFormat: 'YYYY 年',
        monthFormat: 'MM 月',
        cellYearFormat: 'YYYY',
        "shortWeekDays": ["日", "一", "二", "三", "四", "五", "六"],
    },
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
}) => {
    const [value, setValue] = useState([]);
    const hotTableRef = useRef<any>(null);
    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    useEffect(() => {
        const getData = async () => {
          const res = await getOrderFeeList();
          const orderFeeData = res?.data as OrderFeeItemProps[];
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
            title={modalFlag === 'add' ? "新增未核销" : "编辑未核销"}
            onCancel={onCancel}
            width={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
                <div className="search-area-contant">
                    <div className="item-charging-container">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: 200 }}>
                                    <Splitter.Panel collapsible min="20%">
                                        11
                                    </Splitter.Panel>
                                    <Splitter.Panel style={{paddingLeft:'20px'}} collapsible>
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
                                            <HotColumn
                                                data="FeeName"
                                                title="费用名称"
                                                className="htLeft ellipsis-cell"
                                                type="dropdown"
                                                strict={true}
                                                language="zh-cn"
                                                width={220}
                                                // renderer={yellowRenderer}
                                                source={async (query: string, process: (data: string[]) => void) => {
                                                    // 解决单元格输入中文时，将输入法的英文拼音传入导致检索异常
                                                    setTimeout(async () => {
                                                        console.log('Delayed query:', query); // 打印延迟后的 query
                                                        const res = await getFeeNameList();
                                                        const orderFeeData = res?.data as FeeNameItemProps[];
                                                        // 过滤数据（根据 query）
                                                        const filteredData = orderFeeData.filter((item) =>
                                                            item.FeeDisplayName.toLowerCase().includes(query.toLowerCase())
                                                        );
                                                        // 处理数据并传递给 Handsontable
                                                        const uniqueFeeNames = [...new Set(filteredData.map((item) => item.FeeDisplayName))];
                                                        process(uniqueFeeNames);
                                                    }, 200); // 延迟 2 秒
                                                }}
                                            />
                                            <HotColumn data="CreditDebit" title='规格型号' width={180} className="htLeft" renderer={customerRenderer} />
                                            <HotColumn data="DomesticForeign" title='单位' type='dropdown' source={['[1]票', '[2]车']} width={100} className="htLeft" renderer={customerRenderer} />
                                            <HotColumn data="Quantity" title='数量' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.0000',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />
                                            <HotColumn data="UnitPrice" title='单价' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.0000',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />
                                            <HotColumn data="TaxExcludedPrice" title='不含税金额' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />
                                            <HotColumn data="TaxRate" title='税率' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.000000',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />
                                            <HotColumn data="TaxAmount" title='税额' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />

                                            <HotColumn data="TaxIncludedPrice" title='合计' type='numeric' renderer={customerRenderer}
                                                numericFormat={{
                                                    pattern: '0.00',
                                                    culture: 'zh-CN'
                                                }} className="htRight" width={150} />
                                        </HotTable>
                                    </Splitter.Panel>
                                </Splitter>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingRight: '6px' }}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>业务类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "海运出口" },
                                        { "value": "2", "label": "海运进口" },
                                        { "value": "3", "label": "空运出口" },
                                        { "value": "4", "label": "空运进口" },
                                        { "value": "5", "label": "铁路出口" },
                                        { "value": "6", "label": "铁路进口" },
                                        { "value": "7", "label": "FBA海运" },
                                        { "value": "8", "label": "FBA空运" },
                                        { "value": "9", "label": "FBA铁路" },
                                        { "value": "10", "label": "综合物流" }
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>拼箱类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>货物类型</label>
                                    <Select style={{ flex: 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>有效日期</label>
                                    <RangePicker locale={zh_CNLocale} style={{ flex: 1 }} placeholder={['开始日期', '结束日期']} />
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
