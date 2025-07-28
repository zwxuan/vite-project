
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Col, Row, Checkbox, Tooltip } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BusinessPartnerItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/business_partner";
import { getBusinessPartnerList, saveBusinessPartner } from "@/api/dynamic_onfiguration_platform/basic_manage/business_partner_service";
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import DatePickerZH from '@/components/date-picker';
import './tab_detail.less'
import TextArea from 'antd/es/input/TextArea';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ParterBaseInfo: React.FC = () => {

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 120px)',background: '#f9fbff', paddingTop: '10px' }}>
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>编号</label>
                            <Input style={{ flex: 1 }} defaultValue={30} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>中文名称</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>简称</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>英文名称</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>代码</label>
                            <Input style={{ flex: 1 }} />
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[1, 2, 3, 4]}
                                options={[
                                    { value: 1, label: '活跃' },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>所属公司</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "公司一" },
                                { "value": "2", "label": "公司二" },
                                { "value": "3", "label": "公司三" },
                                { "value": "4", "label": "公司四" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>应用公司</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "公司一" },
                                { "value": "2", "label": "公司二" },
                                { "value": "3", "label": "公司三" },
                                { "value": "4", "label": "公司四" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'></label>
                            <Checkbox.Group
                                name="noticeTypeCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[2]}
                                options={[
                                    { value: 1, label: '是否母公司' },
                                    { value: 2, label: '是否FBA' },
                                    { value: 2, label: '是否能内部往来公司' },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>角色</label>
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[1, 2, 3, 4]}
                                options={[
                                    { value: 1, label: '客户' },
                                    { value: 2, label: '订舱代理|换单代理' },
                                    { value: 3, label: '船代' },
                                    { value: 4, label: '目的港代理' },
                                    { value: 5, label: '指定货代理' },
                                    { value: 6, label: '本地代理' },
                                    { value: 7, label: '结算代理' },
                                    { value: 8, label: '船公司' },
                                    { value: 9, label: '航空公司' },
                                    { value: 10, label: '报关行' },
                                    { value: 11, label: '仓库' },
                                    { value: 12, label: '卡车公司' },
                                    { value: 13, label: '发货人' },
                                    { value: 14, label: '收货人' },
                                    { value: 15, label: '口岸代理' },
                                    { value: 16, label: '发运代理' },
                                    { value: 17, label: '装货地公司' },
                                    { value: 18, label: '签单地公司' },
                                    { value: 19, label: '卸货港公司' },
                                    { value: 20, label: '目的港公司' },
                                    { value: 21, label: '贸易商' },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>客户编码</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>供应商编码</label>
                            <Input style={{ flex: 1 }} />
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>SCAC</label>
                            <Input style={{ flex: 1 }} />
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', fontSize: '12px', color: '#000' }}>
                                        SCAC 是一个由美国国家汽车货运协会 (NMFTA) 管理和分配的四位字母代码，用于唯一标识运输公司（主要是卡车、铁路、海运承运人、无船承运人）。它是北美物流行业（尤其是美国海关AMS/ISF申报、铁路运输、EDI交互）广泛使用的标准代码
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>业务类型</label>
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[1, 2, 3, 4]}
                                options={[
                                    { value: 1, label: '海运出口' },
                                    { value: 2, label: '海运进口' },
                                    { value: 3, label: '空运出口' },
                                    { value: 4, label: '空运进口' },
                                    { value: 4, label: '铁路业务' },
                                    { value: 4, label: '综合物流' },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>付款类型</label>

                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                style={{ flex: 1 }}
                                defaultValue={[]}
                                options={[
                                    { value: 1, label: '是否托收' },
                                    { value: 2, label: '使用结算代理' },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>母公司</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "公司一" },
                                { "value": "2", "label": "公司二" },
                                { "value": "3", "label": "公司三" },
                                { "value": "4", "label": "公司四" },
                            ]}></Select>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'></label>
                            <Select disabled style={{ width: '200px' }} options={[
                                { "value": "1", "label": "代理一" },
                                { "value": "2", "label": "代理二" },
                                { "value": "3", "label": "代理三" },
                                { "value": "4", "label": "代理四" },
                            ]}></Select>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>国家</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "中国" },
                                { "value": "2", "label": "美国" },
                                { "value": "3", "label": "日本" },
                                { "value": "4", "label": "韩国" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>省</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "山东省" },
                                { "value": "2", "label": "江苏省" },
                                { "value": "3", "label": "福建省" },
                                { "value": "4", "label": "上海市" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>市</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "青岛市" },
                                { "value": "2", "label": "济南市" },
                                { "value": "3", "label": "潍坊市" },
                                { "value": "4", "label": "东营市" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>区</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "市南区" },
                                { "value": "2", "label": "市北区" },
                                { "value": "3", "label": "李沧区" },
                                { "value": "4", "label": "高新区" },
                            ]}></Select>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>地址</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>座机</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>手机</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>网址</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>传值</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>供应商负责人</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "张三" },
                                { "value": "2", "label": "李四" },
                                { "value": "3", "label": "王五" },
                                { "value": "4", "label": "赵六" },
                            ]} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>税率</label>
                            <Select style={{ flex: 1 }} options={[
                                { "value": "1", "label": "0%" },
                                { "value": "2", "label": "3%" },
                                { "value": "3", "label": "13%" },
                                { "value": "4", "label": "9%" },
                            ]} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>人民币账号</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>美金账号</label>
                            <Input style={{ flex: 1 }} ></Input>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>结算单位地址</label>
                            <TextArea style={{ flex: 1 }} rows={4} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>附加说明</label>
                            <TextArea style={{ flex: 1 }} rows={4} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>




    )
}
export default ParterBaseInfo;
