import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message, Descriptions, Tooltip } from 'antd';
import { ExportOutlined, InboxOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';
import dayjs from 'dayjs';

const DocumentArchive: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        {
            key: '1',
            archiveNo: 'ARCH-001',
            docNo: 'DOC-001',
            type: 'Bill of Lading',
            archiveDate: '2024-03-20',
            location: 'Zone A-01-05',
            status: 'Normal',
            borrower: '',
            borrowDate: '',
            returnDate: '',
        },
        {
            key: '2',
            archiveNo: 'ARCH-002',
            docNo: 'DOC-002',
            type: 'Invoice',
            archiveDate: '2024-03-21',
            location: 'Zone B-02-03',
            status: 'Lent',
            borrower: 'John Doe',
            borrowDate: '2024-03-25',
            returnDate: '2024-03-30',
        },
    ]);

    const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [borrowForm] = Form.useForm();
    const [pendingArchiveData, setPendingArchiveData] = useState([
        { key: 'p1', docNo: 'DOC-101', type: 'Bill of Lading', location: 'Zone C-01-02' },
        { key: 'p2', docNo: 'DOC-102', type: 'Invoice', location: 'Zone C-02-01' },
        { key: 'p3', docNo: 'DOC-103', type: 'Packing List', location: 'Zone D-01-03' },
    ]);
    const [selectedPendingKeys, setSelectedPendingKeys] = useState<React.Key[]>([]);

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        // Simulate API call
        setTimeout(() => setLoading(false), 500);
    };

    const handleBorrow = (record: any) => {
        setCurrentRecord(record);
        borrowForm.resetFields();
        setIsBorrowModalVisible(true);
    };

    const handleBorrowSubmit = () => {
        borrowForm.validateFields().then(values => {
            const newData = data.map(item => {
                if (item.key === currentRecord.key) {
                    return {
                        ...item,
                        status: 'Lent',
                        borrower: values.borrower,
                        borrowDate: values.borrowDate.format('YYYY-MM-DD'),
                        returnDate: values.returnDate.format('YYYY-MM-DD'),
                    };
                }
                return item;
            });
            setData(newData);
            setIsBorrowModalVisible(false);
            message.success(i18n.t(LocaleHelper.getDocumentArchiveBorrowSuccess()));
        });
    };

    const handleReturn = (record: any) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                return {
                    ...item,
                    status: 'Normal',
                    borrower: '',
                    borrowDate: '',
                    returnDate: '',
                };
            }
            return item;
        });
        setData(newData);
        message.success(i18n.t(LocaleHelper.getDocumentArchiveReturnSuccess()));
    };

    const handleView = (record: any) => {
        setCurrentRecord(record);
        setIsViewModalVisible(true);
    };

    const handleBatchArchiveOpen = () => {
        setIsBatchModalVisible(true);
    };

    const handleBatchArchiveConfirm = () => {
        if (selectedPendingKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getDocumentArchiveBatchEmpty()));
            return;
        }
        const selectedItems = pendingArchiveData.filter(item => selectedPendingKeys.includes(item.key));
        const newArchived = selectedItems.map((item, index) => ({
            key: `arch-${Date.now()}-${index}`,
            archiveNo: `ARCH-${Date.now()}-${index + 1}`,
            docNo: item.docNo,
            type: item.type,
            archiveDate: dayjs().format('YYYY-MM-DD'),
            location: item.location,
            status: 'Normal',
            borrower: '',
            borrowDate: '',
            returnDate: '',
        }));
        setData([...newArchived, ...data]);
        setPendingArchiveData(pendingArchiveData.filter(item => !selectedPendingKeys.includes(item.key)));
        setSelectedPendingKeys([]);
        setIsBatchModalVisible(false);
        message.success(i18n.t(LocaleHelper.getDocumentArchiveBatchSuccess()));
    };

    const columns = getColumns({
        onView: handleView,
        onBorrow: handleBorrow,
        onReturn: handleReturn
    });

    const pendingColumns = [
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveDocumentNo()),
            dataIndex: 'docNo',
            key: 'docNo',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveType()),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveLocation()),
            dataIndex: 'location',
            key: 'location',
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentArchiveTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>借阅 (Borrow)</b></span>
                                                指当某个单证已经完成归档入库（状态为“正常”）后，因业务需要（如客户索取复印件、海关查验、法律纠纷取证等）需要将实物原件从档案室或存放位置暂时取出。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>归还 (Return)</b></span>
                                                指借出的实物单证使用完毕后，被重新放回档案库的指定位置。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>台账范围</b></span>
                                                本台账仅展示已归档单证；“批量归档”用于将待归档单证批量入库。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" icon={<InboxOutlined />} onClick={handleBatchArchiveOpen}>
                                {i18n.t(LocaleHelper.getDocumentArchiveBatchArchive())}
                            </Button>
                            <Button icon={<ExportOutlined />}>
                                {i18n.t(LocaleHelper.getDocumentArchiveExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />

            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 480px)' }}
                    pagination={{
                        size: 'small',
                        showTotal: total => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        locale: {
                            items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
                            jump_to: i18n.t(LocaleHelper.getJumpTo()),
                            page: i18n.t(LocaleHelper.getPage()),
                        },
                    }}
                />
            </div>

            <Modal
                title={i18n.t(LocaleHelper.getDocumentArchiveBorrowModalTitle())}
                open={isBorrowModalVisible}
                onOk={handleBorrowSubmit}
                onCancel={() => setIsBorrowModalVisible(false)}
            >
                <Form form={borrowForm} layout="vertical">
                    <Form.Item
                        name="borrower"
                        label={i18n.t(LocaleHelper.getDocumentArchiveBorrower())}
                        rules={[{ required: true, message: i18n.t(LocaleHelper.getDocumentArchiveBorrowerRequired()) }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="borrowDate"
                        label={i18n.t(LocaleHelper.getDocumentArchiveBorrowDate())}
                        rules={[{ required: true, message: i18n.t(LocaleHelper.getDocumentArchiveBorrowDateRequired()) }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="returnDate"
                        label={i18n.t(LocaleHelper.getDocumentArchiveExpectedReturnDate())}
                        rules={[{ required: true, message: i18n.t(LocaleHelper.getDocumentArchiveReturnDateRequired()) }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={i18n.t(LocaleHelper.getDocumentArchiveViewModalTitle())}
                open={isViewModalVisible}
                onCancel={() => setIsViewModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalVisible(false)}>
                        {i18n.t(LocaleHelper.getDocumentArchiveClose())}
                    </Button>
                ]}
            >
                {currentRecord && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveArchiveNo())}>{currentRecord.archiveNo}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveDocumentNo())}>{currentRecord.docNo}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveType())}>{currentRecord.type}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveArchiveDate())}>{currentRecord.archiveDate}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveLocation())}>{currentRecord.location}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveStatus())}>{currentRecord.status}</Descriptions.Item>
                        {currentRecord.status === 'Lent' && (
                            <>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveBorrower())}>{currentRecord.borrower}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveBorrowDate())}>{currentRecord.borrowDate}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentArchiveExpectedReturnDate())}>{currentRecord.returnDate}</Descriptions.Item>
                            </>
                        )}
                    </Descriptions>
                )}
            </Modal>

            <Modal
                title={i18n.t(LocaleHelper.getDocumentArchiveBatchModalTitle())}
                open={isBatchModalVisible}
                onOk={handleBatchArchiveConfirm}
                onCancel={() => setIsBatchModalVisible(false)}
                okText={i18n.t(LocaleHelper.getDocumentArchiveBatchConfirm())}
                cancelText={i18n.t(LocaleHelper.getCancel())}
                width={720}
            >
                <Table
                    columns={pendingColumns}
                    dataSource={pendingArchiveData}
                    size="small"
                    rowKey="key"
                    rowSelection={{
                        selectedRowKeys: selectedPendingKeys,
                        onChange: (keys) => setSelectedPendingKeys(keys),
                    }}
                    pagination={false}
                />
            </Modal>
        </div>
    );
};

export default DocumentArchive;
