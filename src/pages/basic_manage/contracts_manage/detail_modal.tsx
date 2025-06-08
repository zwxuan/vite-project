
import React, { useRef, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Col, Row, Radio, Checkbox, Table, Tooltip } from 'antd';
import { ContractsManageItemProps } from "@/types/basic_manage/contracts_manage";
import dayjs from 'dayjs';
import DatePickerZH from '@/components/date-picker';
import TextArea from 'antd/es/input/TextArea';
import CodeBoxMeta from '@/components/code-box-meta';
import HotTable, { HotColumn, HotRendererProps } from '@handsontable/react-wrapper';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';

// Register all Handsontable modules including dropdown
registerAllModules();
import './contracts_detail.less'
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<ContractsManageItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
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
    formData,
    onCancel,
    onOk,
    onChange,
    onDateChange,
    onNumberChange,
}) => {
    const [allowMultipleAgreements, setAllowMultipleAgreements] = useState(false); // Default to true as per defaultValue={[1]}
    const hotTableRef = useRef<any>(null);
    const handleAllowMultipleAgreementsChange = (checkedValues: any) => {
        setAllowMultipleAgreements(checkedValues.includes(1));
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
    return (
        <Modal
            open={open}
            title={modalFlag === 'add' ? "新增合同管理" : "编辑合同管理"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            width='850px'
            footer={null}
        >
            <Form {...formItemLayout} initialValues={formData} style={{ width: '800px',margin:'0 auto' }} disabled={saving} onFinish={onOk}>
                <div className="item-charging-container-modal">
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合作伙伴</label>
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '客户1' },
                                    { value: 2, label: '客户2' },
                                    { value: 3, label: '客户3' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同编号</label>
                                <Input style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>伙伴级别</label>
                                <Input disabled style={{ flex: 1 }} defaultValue={'普通伙伴'} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同状态</label>
                                <Select style={{ flex: 1 }} defaultValue={'未到期'} options={[
                                    { value: 1, label: '未到期' },
                                    { value: 2, label: '临期' },
                                    { value: 3, label: '终止合同' },
                                ]} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>生效日期</label>
                                <DatePickerZH style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>失效日期</label>
                                <DatePickerZH style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同类型</label>
                                <Select disabled style={{ flex: 1 }} defaultValue={'普通伙伴'} options={[
                                    { value: 1, label: '首签' },
                                    { value: 2, label: '续签' },
                                    { value: 3, label: '延期' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'></label>
                                <Checkbox.Group
                                    name="radiogroup"
                                    defaultValue={[]}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '到期后清空信控' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>应用规则</label>
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '全部订单' },
                                    { value: 2, label: '全部海运订单' },
                                    { value: 3, label: '全部空运订单' },
                                ]} />
                                <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        数据来源合同配置
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'></label>
                                <Checkbox.Group
                                    name="allowMultipleAgreementsCheckbox"
                                    defaultValue={allowMultipleAgreements ? [1] : []}
                                    style={{ flex: 1 }}
                                    onChange={handleAllowMultipleAgreementsChange}
                                    options={[
                                        { value: 1, label: '一个合同包含多种合同协议' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同协议</label>
                                {allowMultipleAgreements ? (
                                    <Checkbox.Group
                                        name="contractAgreementCheckbox"
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: 1, label: '客户合同' },
                                            { value: 2, label: '供应商合同' },
                                            { value: 3, label: '海外代理合同' },
                                            { value: 4, label: '其他合同' },
                                        ]}
                                    />
                                ) : (
                                    <Radio.Group
                                        name="contractAgreementRadio"
                                        defaultValue={1} // You might want to manage this default value or clear it
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: 1, label: '客户合同' },
                                            { value: 2, label: '供应商合同' },
                                            { value: 3, label: '海外代理合同' },
                                            { value: 4, label: '其他合同' },
                                        ]}
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>备注</label>
                                <TextArea
                                    name="radiogroup"
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>日期类型</label>
                                <DatePickerZH style={{ flex: 1 }} />
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
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>额度</label>
                                <InputNumber style={{ flex: 1 }} onChange={(value) => onNumberChange("CreditLimit", value as number)} />
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '人民币' },
                                    { value: 2, label: '美元' },
                                    { value: 3, label: '欧元' },
                                    { value: 4, label: '英镑' },
                                ]} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>账期</label>
                                <InputNumber style={{ flex: 1 }} onChange={(value) => onNumberChange("CreditLimit", value as number)} />
                                <Select style={{ flex: 1 }} options={[
                                    { value: 1, label: '天' },
                                    { value: 2, label: '月' },
                                    { value: 3, label: '季' },
                                    { value: 4, label: '年' },
                                ]} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{  }}>
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
                    <Row gutter={24} style={{  }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* 根据结算方式和账期自动选择，结算方式选择了或者账期大于0，非票结 */}
                                <label className='item-lable-title'>到期顺延周期</label>
                                <Radio.Group
                                    name="radiogroup"
                                    defaultValue={1}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '无' },
                                        { value: 2, label: '1年' },
                                        { value: 2, label: '2年' },
                                        { value: 2, label: '3年' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="nc-bill-search-area" style={{backgroundColor:'#EE0F39',color:'#fff'}}>临时信控  注：临时信控的额度/账期 单位同合同的单位（次日生效）</div>
                    <div className='nc-bill-table-area'>
                    <HotTable
                            ref={hotTableRef}
                            data={[{},{}]}
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
                            <HotColumn data="CreditDebit" title='生效日期' width={180} className="htLeft"  />
                            <HotColumn data="CreditDebit" title='失效日期' width={180} className="htLeft"  />
                            <HotColumn data="DomesticForeign" title='额度' width={100} className="htLeft"  />
                            <HotColumn data="DomesticForeign2" title='额度单位' width={100} className="htLeft"  />
                            <HotColumn data="DomesticForeign3" title='账期' width={100} className="htLeft"  />
                            <HotColumn data="Quantity" title='账期单位' type='dropdown' source={['10%','6%','0%','9%','13%']} 
                                className="htRight" width={150}  />
                        </HotTable>
                            </div>
                    <div style={{ textAlign: 'right',marginTop: 8 }}>
                        <Space>
                            <Button onClick={onCancel} disabled={saving}>取消</Button>
                            {modalFlag === 'add' && <Button disabled={saving}>保存并新增</Button>}
                            <Button type="primary" htmlType='submit' danger disabled={saving}>保存</Button>
                        </Space>
                    </div>
                </div>

            </Form>
        </Modal>
    );
};

export default DetailModal;
