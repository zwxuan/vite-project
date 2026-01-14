import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Table, Row, Col, Tree, Checkbox, Radio, Upload, UploadProps, GetProp, UploadFile, TableProps } from 'antd';
import { AdminOrgItemProps } from "@/types/dynamic_configuration_platform/org_manage/admin_org";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { start } from 'repl';
import CustomIcon from '@/components/custom-icon';
import { RedoOutlined, DownOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import '../tab_detail.less'
import CodeBoxMeta from '@/components/code-box-meta';
import DatePickerZH from '@/components/date-picker';
import { useTableOperations } from '@/hooks/useTableOperations';
import { PrimaryJobItemProps, PartTimeJobItemProps, EmployeeBankAccountItemProps, EmployeeManageItemProps } from '@/types/dynamic_configuration_platform/org_manage/employee_manage';
import { getBankAccountColumns, getPartTimeJobColumns, getPrimaryJobColumns } from './columns';
const { Search, TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const Detail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const orgCode = searchParams.get('orgCode');
    const [primaryJobList, setPrimaryJobList] = useState([] as PrimaryJobItemProps[]);
    const [partTimeJobList, setPartTimeJobList] = useState([] as PartTimeJobItemProps[]);
    const [bankAccountList, setBankAccountList] = useState([] as EmployeeBankAccountItemProps[]);
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传头像</div>
        </button>
    );
    const handleBack = () => {
        navigate(-1);
    };

    const newPartnerRowId = Date.now().toString();
    const primaryJobOperations = useTableOperations({
        dataList: primaryJobList,
        setDataList: setPrimaryJobList,
        createNewRow: () => ({
            SeqNo: newPartnerRowId,
            Organization: '',
            Department: '',
            Position: '',
            JobDuty: '',
            StartDate: '',
            EndDate: '',
            Supervisor: ''
        } as PrimaryJobItemProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsPrimaryJobType = getPrimaryJobColumns(
        primaryJobOperations.handleEdit,
        primaryJobOperations.handleDelete,
        primaryJobOperations.handleSave,
        primaryJobOperations.handleCancel,
        primaryJobOperations.editingKey
    );

    const newPartTimeRowId = Date.now().toString();
    const partTimeJobOperations = useTableOperations({
        dataList: partTimeJobList,
        setDataList: setPartTimeJobList,
        createNewRow: () => ({
            SeqNo: newPartTimeRowId,
            Organization: '',
            Department: '',
            Position: '',
            JobDuty: '',
            StartDate: '',
            EndDate: '',
            Supervisor: ''
        } as PartTimeJobItemProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsPartTimeJobType = getPartTimeJobColumns(
        partTimeJobOperations.handleEdit,
        partTimeJobOperations.handleDelete,
        partTimeJobOperations.handleSave,
        partTimeJobOperations.handleCancel,
        partTimeJobOperations.editingKey
    );


    const newBankAccountRowId = Date.now().toString();
    const bankAccountOperations = useTableOperations({
        dataList: bankAccountList,
        setDataList: setBankAccountList,
        createNewRow: () => ({
            SeqNo: newBankAccountRowId,
            BankAccount: '',
            BankBranch: '',
            BankType: '',
            Currency: '',
            IsDefault: '1',
            Remarks: '',
            AccountType: '',
            AccountName: '',
        } as EmployeeBankAccountItemProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsbankAccountType = getBankAccountColumns(
        bankAccountOperations.handleEdit,
        bankAccountOperations.handleDelete,
        bankAccountOperations.handleSave,
        bankAccountOperations.handleCancel,
        bankAccountOperations.editingKey
    );
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 员工管理明细
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}></div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >新增</Button>
                                <Button type="primary" danger >保存</Button>
                                <Button type="primary" danger >停用</Button>

                                <Button onClick={handleBack}>返回</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area' style={{ height: 'calc(100vh - 100px)', background: '#f9fbff' }}>
                <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>
                    <Col span={22} className='ant-tranfer-col'>
                        <Row gutter={24} style={{ marginTop: '8px' }} className='ant-tranfer-row'>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>员工编号</label>
                                    <Input style={{ flex: 1 }} defaultValue={30} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>员工姓名</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>身份证号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>性别</label>
                                    <Select
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: '男', label: '男' },
                                            { value: '女', label: '女' },
                                            { value: '未知', label: '未知' },
                                        ]}
                                    />
                                    <Checkbox.Group
                                        name="noticeTypeCheckbox"
                                        style={{ flex: 1 }}
                                        options={[
                                            { value: 1, label: '销售员' },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>出生日期</label>
                                    <DatePickerZH style={{ flex: 1 }}></DatePickerZH>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>电子邮箱</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>手机号</label>
                                    <Input style={{ flex: 1 }} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>状态</label>
                                    <Radio.Group
                                        style={{ flex: 1, textAlign: 'left' }}
                                        defaultValue={2}
                                        options={[
                                            { value: 1, label: '未启用' },
                                            { value: 2, label: '已启用' },
                                            { value: 3, label: '已停用' },
                                        ]}
                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{}} className='ant-tranfer-row'>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label className='item-lable-title'>备注</label>
                                    <TextArea style={{ flex: 1 }} rows={4} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2} className='ant-tranfer-col' >
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            showUploadList={false}
                        >
                            {fileList.length >= 1 ? <img src={fileList[0].url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24} className='ant-tranfer-col-left'>
                        <CodeBoxMeta title="员工主职">

                            <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                <div className="u-button-group">
                                    <Button type='primary' size='small' onClick={primaryJobOperations.handleAdd}>新增</Button>
                                </div>
                            </div>
                            <Table<PrimaryJobItemProps>
                                columns={columnsPrimaryJobType}
                                rowKey={(record) => `${record.SeqNo}`}
                                showSorterTooltip={false}
                                dataSource={primaryJobList}
                                pagination={false}
                                scroll={{ x: 'max-content', y: '130px' }}
                                footer={() => ''}
                                bordered={true}
                            />

                        </CodeBoxMeta>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24} className='ant-tranfer-col-left'>
                        <CodeBoxMeta title="员工兼职">
                            <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                <div className="u-button-group">
                                    <Button type='primary' size='small' onClick={partTimeJobOperations.handleAdd}>新增</Button>
                                </div>
                            </div>
                            <Table<PartTimeJobItemProps>
                                columns={columnsPartTimeJobType}
                                rowKey={(record) => `${record.SeqNo}`}
                                showSorterTooltip={false}
                                dataSource={partTimeJobList}
                                pagination={false}
                                scroll={{ x: 'max-content', y: '180px' }}
                                footer={() => ''}
                                bordered={true}
                            />
                        </CodeBoxMeta>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24}>
                        <CodeBoxMeta title="员工银行账号">
                            <div style={{ textAlign: 'left', margin: '0px 4px' }}>
                                <div className="u-button-group">
                                    <Button type='primary' size='small' onClick={bankAccountOperations.handleAdd}>新增</Button>
                                </div>
                            </div>
                            <Table<EmployeeBankAccountItemProps>
                                columns={columnsbankAccountType}
                                rowKey={(record) => `${record.SeqNo}`}
                                showSorterTooltip={false}
                                dataSource={bankAccountList}
                                pagination={false}
                                scroll={{ x: 'max-content', y: '180px' }}
                                footer={() => ''}
                                bordered={true}
                            />
                        </CodeBoxMeta>
                    </Col>
                </Row>
            </div>

        </div>

    );
};

export default Detail;
