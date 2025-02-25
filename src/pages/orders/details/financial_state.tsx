
import React from 'react';
import { Row, Col, Input, Select, Button, Card,DatePicker,Checkbox,Divider } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { RedoOutlined } from '@ant-design/icons';
const FinancialState: React.FC = () => {
    //获取路由参数
    return (
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger>保存</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <Card style={{padding: '5px'}}>
                    <div className="item-contant" style={{ display: "block" }}>
                    <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    完成状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已完成', value: 'hasPay' },
                                        { label: '未完成', value: 'noPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    付款状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已付款', value: 'hasPay' },
                                        { label: '未付款', value: 'noPay' },
                                        { label: '部分付款', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    核销状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已核销', value: 'hasPay' },
                                        { label: '未核销', value: 'noPay' },
                                        { label: '部分核销', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    复核状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已复核', value: 'hasPay' },
                                        { label: '未复核', value: 'noPay' },
                                        { label: '部分复核', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    结账状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已结账', value: 'hasPay' },
                                        { label: '未结账', value: 'noPay' },
                                        { label: '部分结账', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    对账状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已对账', value: 'hasPay' },
                                        { label: '未对账', value: 'noPay' },
                                        { label: '部分对账', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    开票状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已开票', value: 'hasPay' },
                                        { label: '未开票', value: 'noPay' },
                                        { label: '部分开票', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    收票状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已收票', value: 'hasPay' },
                                        { label: '未收票', value: 'noPay' },
                                        { label: '部分收票', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                        <Divider dashed />
                        <Row gutter={[2, 0]}>
                            <Col flex="20px" style={{ textAlign: "center" }}>
                                <Checkbox checked></Checkbox>
                            </Col>
                            <Col flex="40px" style={{ textAlign: "left" }}>
                                <span className='spanDraggable' style={{ whiteSpace: 'nowrap' }}>
                                    凭证状态
                                </span>
                            </Col>
                            <Col flex="120px" style={{ textAlign: "center" }}>
                                <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                                    options={[
                                        { label: '已生成', value: 'hasPay' },
                                        { label: '未生成', value: 'noPay' },
                                        { label: '部分生成', value: 'partPay' },
                                    ]} >
                                </Select>
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <DatePicker showTime
                                    onChange={(value, dateString) => {
                                        
                                    }}
                                />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                            </Col>
                            <Col flex="240px" style={{ textAlign: "center" }}>
                                <Button type="primary" danger>发送状态</Button>
                            </Col>
                        </Row>
                    </div>
                    
                </Card>
            </div>


        </div>

    );
};

export default FinancialState;
