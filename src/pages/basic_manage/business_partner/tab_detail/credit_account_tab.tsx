
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Col, Row, Checkbox, Tooltip, Radio } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import DatePickerZH from '@/components/date-picker';
import './tab_detail.less'
import TextArea from 'antd/es/input/TextArea';
import CodeBoxMeta from '@/components/code-box-meta';
import HotTable, { HotColumn } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();
const CreditAccount: React.FC = () => {
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden',width:'60%', height: 'calc(100vh - 180px)', paddingTop: '10px' }}>
            <div className="nc-bill-table-area">
                <CodeBoxMeta title="当前信控">
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>日期类型</label>
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: 'ETD' },
                                    { value: 2, label: 'ETA' },
                                    { value: 3, label: 'ATD' },
                                    { value: 4, label: 'ATA' },
                                    { value: 5, label: '业务日期' },
                                    { value: 6, label: '发票日期' },
                                    { value: 7, label: '账单日期' },
                                    { value: 8, label: '实际送货日期' },
                                    { value: 9, label: '国外发票开票日期' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>结算方式</label>
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '按月' },
                                    { value: 2, label: '按季' },
                                    { value: 3, label: '按年' },
                                    { value: 4, label: '按天' },
                                    { value: 5, label: '按半月' },
                                    { value: 6, label: '按每月指定日期' },
                                    { value: 7, label: '按周' },
                                ]} />
                                <Checkbox.Group
                                    name="contractAgreementCheckbox"
                                    style={{ flex: 1 }}
                                    defaultValue={[]}
                                    options={[
                                        { value: 1, label: '黑名单' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>账期</label>
                                <InputNumber style={{ flex: 1 }} />
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '天' },
                                    { value: 2, label: '月' },
                                    { value: 3, label: '季' },
                                    { value: 4, label: '年' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>额度</label>
                                <InputNumber style={{ flex: 1 }} />
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '人民币' },
                                    { value: 2, label: '美元' },
                                    { value: 3, label: '欧元' },
                                    { value: 4, label: '英镑' },
                                ]} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* 根据结算方式和账期自动选择，结算方式选择了或者账期大于0，非票结 */}
                                <label className='item-lable-title'>结算类型</label>
                                <Radio.Group
                                    name="radiogroup"
                                    defaultValue={1}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '票结' },
                                        { value: 2, label: '非票结（结算方式：每月指定日期或账期大于0天）' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                </CodeBoxMeta>
                <CodeBoxMeta title="合同信控">
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>应用规则</label>
                                <Select disabled style={{ flex: 1 }} options={[
                                    { value: 1, label: '全部订单' },
                                    { value: 2, label: '全部海运订单' },
                                    { value: 3, label: '全部空运订单' },
                                ]} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>日期类型</label>
                                <Select disabled style={{ flex: 1 }} options={[
                                    { value: 1, label: 'ETD' },
                                    { value: 2, label: 'ETA' },
                                    { value: 3, label: 'ATD' },
                                    { value: 4, label: 'ATA' },
                                    { value: 5, label: '业务日期' },
                                    { value: 6, label: '发票日期' },
                                    { value: 7, label: '账单日期' },
                                    { value: 8, label: '实际送货日期' },
                                    { value: 9, label: '国外发票开票日期' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>结算方式</label>
                                <Select disabled style={{ flex: 1 }} options={[
                                    { value: 1, label: '按月' },
                                    { value: 2, label: '按季' },
                                    { value: 3, label: '按年' },
                                    { value: 4, label: '按天' },
                                    { value: 5, label: '按半月' },
                                    { value: 6, label: '按每月指定日期' },
                                    { value: 7, label: '按周' },
                                ]} />
                                <Checkbox.Group
                                    name="contractAgreementCheckbox"
                                    style={{ flex: 1 }}
                                    defaultValue={[]}
                                    options={[
                                        { value: 1, label: '黑名单' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>账期</label>
                                <InputNumber disabled style={{ flex: 1 }} />
                                <Select disabled style={{ flex: 1 }} options={[
                                    { value: 1, label: '天' },
                                    { value: 2, label: '月' },
                                    { value: 3, label: '季' },
                                    { value: 4, label: '年' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>额度</label>
                                <InputNumber disabled style={{ flex: 1 }} />
                                <Select disabled style={{ flex: 1 }} options={[
                                    { value: 1, label: '人民币' },
                                    { value: 2, label: '美元' },
                                    { value: 3, label: '欧元' },
                                    { value: 4, label: '英镑' },
                                ]} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{}} className='ant-tranfer-row'>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* 根据结算方式和账期自动选择，结算方式选择了或者账期大于0，非票结 */}
                                <label className='item-lable-title'>结算类型</label>
                                <Radio.Group
                                    disabled
                                    name="radiogroup"
                                    defaultValue={1}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '票结' },
                                        { value: 2, label: '非票结（结算方式：每月指定日期或账期大于0天）' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                </CodeBoxMeta>

                <CodeBoxMeta title="临时信控">
                    <div className='nc-bill-table-area'>
                        <HotTable
                            data={[{}, {}]}
                            height={'300px'}
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
                            licenseKey="non-commercial-and-evaluation"
                        >
                            <HotColumn data="CreditDebit" title='生效日期' width={180} className="htLeft" />
                            <HotColumn data="CreditDebit" title='失效日期' width={180} className="htLeft" />
                            <HotColumn data="DomesticForeign" title='额度' width={100} className="htLeft" />
                            <HotColumn data="DomesticForeign2" title='额度单位' width={100} className="htLeft" />
                            <HotColumn data="DomesticForeign3" title='账期' width={100} className="htLeft" />
                            <HotColumn data="Quantity" title='账期单位' type='dropdown' source={['10%', '6%', '0%', '9%', '13%']}
                                className="htRight" width={150} />
                        </HotTable>
                    </div>
                </CodeBoxMeta>        
            </div>
        </div>
    )
}
export default CreditAccount;
