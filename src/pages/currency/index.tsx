import '../page_list.less'
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal } from 'antd';
import type { TableColumnsType,MenuProps } from 'antd';
import { CurrencyItemProps } from "@/types/currency/currency";
import { getCurrencyList } from "@/api/financial_basic_data/currency_service";
import {
    Form,
    Input,
    InputNumber,
    Select,
  } from 'antd';
import {
    RedoOutlined,
    DownOutlined
  } from '@ant-design/icons';

const Currency = ()=>{

    // 币制数据
    const [currentyList, setCurrencyList] = useState([] as CurrencyItemProps[]);
    // 获取币制数据
    useEffect(() => {
        // 获取币制数据
        const getData = async () => {
            const res = await getCurrencyList();
            const currencyData = res?.data as CurrencyItemProps[];
            // 设置币制台账数据
            setCurrencyList([...currencyData]);
        };
        getData();
    }, []);
      
      const columns: TableColumnsType<CurrencyItemProps> = [
        {
          title: '编号',
          width: 100,
          dataIndex: 'Code',
          sorter: true,
          fixed: 'left',
          align: 'center',
          
        },
        {
          title: '币制名称',
          width: 100,
          dataIndex: 'CurrencyFullName',
          sorter: true,
          fixed: 'left',
          align: 'left',
        },
        {
          title: '币制简称',
          dataIndex: 'CurrencyShortName',
          sorter: true,
          width: 150,
        },
        {
          title: '币制符号',
          dataIndex: 'CurrencyMark',
          sorter: true,
          width: 150,
        },
        {
          title: '价格精度',
          dataIndex: 'PricePrecision',
          sorter: true,
          align: 'right',
          width: 150,
        },
        {
          title: '价格舍入规则',
          dataIndex: 'PriceRoundingRule',
          sorter: true,
          width: 150,
        },
        {
          title: '金额精度',
          dataIndex: 'AmountPrecision',
          sorter: true,
          align: 'right',
          width: 150,
        },
        {
          title: '金额舍入规则',
          dataIndex: 'AmountRoundingRule',
          sorter: true,
          width: 150,
        },
        {
          title: '备注',
          dataIndex: 'Remark',
          sorter: true,
          width: 150,
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => (
            <>
                <a href='1'>启用</a>
                <a href='2'>编辑</a>
                <a href='3'>删除</a>
            </>
          ),
        },
      ];
      
      
      const items: MenuProps['items'] = [
        {
          label: '启用',
          key: '1',
        },
        {
          label: '停用',
          key: '2',
        },
      ];
      const itemsInput: MenuProps['items'] = [
        {
          label: '新增导入',
          key: '1',
        },
        {
          label: '下载新增模板',
          key: '2',
        },
        {
            label: '更新导入',
            key: '3',
        },
        {
            label: '下载更新模板',
            key: '4',
        },
        {
            label: '查看导入日志',
            key: '5',
        },
      ];
      const itemsOutput: MenuProps['items'] = [
        {
          label: 'Excel导出',
          key: '1',
        },
        {
          label: '查看导出日志',
          key: '2',
        },
      ];
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };
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
    return (
        <div>
            <Modal open={open} title="币种"
                onOk={handleOk}
                onCancel={handleCancel}
                width={680}
                footer={(_) => (
                <>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button>保存并新增</Button>
                    <Button type="primary" danger>保存</Button>
                </>
                )}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={{ variant: 'filled' }}>
                    <Form.Item label="币种" name="CurrencyFullName" rules={[{ required: true,message: '' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="币种简称" name="CurrencyShortName" rules={[{ required: true,message:''}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="币种符号" name="CurrencyMark">
                        <Input />
                    </Form.Item>

                    <Form.Item label="单价精度" name="PricePrecision" rules={[{ required: true,message: '' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="单价舍入规则" name="PriceRoundingRule" rules={[{ required: true,message: '' }]}>
                        <Select />
                    </Form.Item>
                    <Form.Item label="金额精度" name="AmountPrecision" rules={[{ required: true,message: '' }]}>
                        <InputNumber />
                        <div style={{color:'red'}}>警告:金额精度会影响财务报表。多数国家/地区财务报表金额和发票金额一般最多2位，如要超过2位，请确保财务部门认可。</div>
                    </Form.Item>
                    <Form.Item label="金额舍入规则" name="AmountRoundingRule" rules={[{ required: true,message: '' }]}>
                        <Select />
                    </Form.Item>
                </Form>
            </Modal>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title">
                        <i className="iconfont icon-ncc-pt-jssj page-title-Icon" style={{color:'red'}}></i>币制
                        </span>
                        <span className="bill-info-code">
                            
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "20px"}}>
                        <div style={{display: "inline"}}>
                            <label className="u-checkbox nc-checkbox">
                                <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                {/* <button type="button" className="u-button button-primary nc-button-wrapper button-weishabushezhiyigemoren">新增</button> */}
                                <Button type="primary" danger onClick={showModal}>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:items}}>
                                <Button>
                                    <Space>
                                        启用
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:itemsInput}}>
                                <Button>
                                    <Space>
                                        导入
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:itemsOutput}}>
                                <Button>
                                    <Space>
                                        导出
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <div className="nc-bill-search-area">
                <div className="search-area-contant">
                    <div className="search-top">
                        <div className="search-edit">
                            <div className="search-name-wrapper">
                                <span className="search-plan-name">快速查询</span>
                                <i className="iconfont icon-bottom"></i>
                            </div>
                            <span className="search-super">高级</span>
                        </div>
                        <div className="search-open">
                            <span className="search-open-icon">
                                <i className="label">收起</i>
                                <i className="down iconfont icon-chaxunmoren"></i>
                            </span>
                        </div>
                    </div>
                    <div className="item-contant" style={{display:"block"}}>
                        <div className="item-rows">
                            <div className="condition-contant">
                                <span className="search-dom">
                                    <div className="u-form-control-wrapper">
                                        <input placeholder="编码" type="text" className="nc-input u-form-control" defaultValue={''}/>
                                    </div>
                                </span>
                            </div>
                            <div className="condition-contant">
                                <span className="search-dom">
                                    <div className="u-form-control-wrapper">
                                        <input placeholder="负责人" maxLength={20} type="text" className="nc-input u-form-control"defaultValue={''} />
                                    </div>
                                </span>
                            </div>
                            <div className="condition-contant">
                                <span className="search-dom">
                                    <div className="u-form-control-wrapper">
                                        <input placeholder="名称" type="text" className="nc-input u-form-control"defaultValue={''} />
                                        <span className="multi-lang-suffix">ZH</span>
                                    </div>
                                </span>
                            </div>
                            <div className="condition-contant">
                                <span className="search-dom">
                                    <div className="u-form-control-wrapper">
                                        <input placeholder="所属公司" maxLength={20} type="text" className="nc-input u-form-control"defaultValue={''} />
                                    </div>
                                </span>
                            </div>
                            <div className="search-button">
                                <div className="search-component-rowArea">
                                    <span className="search-component-searchBtn">
                                        <i className="iconfont icon-sousuo"></i>
                                    </span>
                                    <span className="clearBtn">
                                        <i className="iconfont icon-qingkong1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<CurrencyItemProps>
                    rowSelection={{type: 'checkbox'}}
                    columns={columns}
                    dataSource={currentyList}
                    pagination={
                        {
                            size:'small',
                            pageSize:50,showTotal: (total) => `总共 ${total} 条`,
                            showQuickJumper:true,
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
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default Currency;