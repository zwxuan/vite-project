import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Button, Upload, Steps, message, Card, Table, Tooltip } from 'antd';
import { InboxOutlined, DownloadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import i18n from '@/i18n';
import { BatchOperationLocale } from '@/utils/locale/customs_compliance/customs_job_management/batch_operation';
import CustomIcon from "@/components/custom-icon";
import { getColumns, ImportResult } from './columns';

const { Dragger } = Upload;

const BatchOperation: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [fileList, setFileList] = useState<any[]>([]);
    const [importResults, setImportResults] = useState<ImportResult[]>([]);
    const [uploading, setUploading] = useState(false);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: true,
        beforeUpload: (file) => {
            setFileList((prev) => [...prev, file]);
            return false; // Prevent auto upload
        },
        onRemove: (file) => {
            setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
        },
        fileList,
    };

    const handleUpload = () => {
        if (fileList.length === 0) {
            message.warning(i18n.t(BatchOperationLocale.getBatchOperationUploadHint()));
            return;
        }

        setUploading(true);
        setCurrentStep(1); // Move to Validate

        // Simulate upload and validation
        setTimeout(() => {
            setUploading(false);
            setCurrentStep(2); // Move to Import
            message.success(i18n.t(BatchOperationLocale.getBatchOperationImportSuccess()));

            // Mock results
            const results: ImportResult[] = fileList.map((file, index) => ({
                id: file.uid,
                fileName: file.name,
                fileSize: (file.size / 1024).toFixed(2) + ' KB',
                status: index % 2 === 0 ? 'success' : 'fail',
                successCount: index % 2 === 0 ? 100 : 0,
                failCount: index % 2 === 0 ? 0 : 5,
                errorMessage: index % 2 === 0 ? undefined : 'Invalid data format in row 5',
                importTime: new Date().toLocaleString(),
            }));
            setImportResults(results);
            setFileList([]); // Clear file list after processing
        }, 2000);
    };

    const stepsItems = [
        {
            title: i18n.t(BatchOperationLocale.getBatchOperationStepUpload()),
            icon: <CloudUploadOutlined />,
        },
        {
            title: i18n.t(BatchOperationLocale.getBatchOperationStepValidate()),
            description: uploading ? 'Processing...' : '',
        },
        {
            title: i18n.t(BatchOperationLocale.getBatchOperationStepImport()),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(BatchOperationLocale.getBatchOperationPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(BatchOperationLocale.getBatchOperationHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(BatchOperationLocale.getBatchOperationHelpRole())}</b>{i18n.t(BatchOperationLocale.getBatchOperationHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(BatchOperationLocale.getBatchOperationHelpOrigin())}</b>{i18n.t(BatchOperationLocale.getBatchOperationHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(BatchOperationLocale.getBatchOperationHelpFunctionality())}</b>{i18n.t(BatchOperationLocale.getBatchOperationHelpFunctionalityDesc())}</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                         <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button icon={<DownloadOutlined />}>
                                    {i18n.t(BatchOperationLocale.getBatchOperationDownloadTemplate())}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card bordered={false}>
                    <Steps current={currentStep} items={stepsItems} style={{ marginBottom: 40 }} />
                    
                    {currentStep === 0 && (
                        <div style={{ maxWidth: 600, margin: '0 auto' }}>
                            <Dragger {...props} style={{ padding: 40, background: '#fafafa', border: '1px dashed #d9d9d9' }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: '#1890ff', fontSize: 48 }} />
                                </p>
                                <p className="ant-upload-text" style={{ fontSize: 16, color: '#333' }}>
                                    {i18n.t(BatchOperationLocale.getBatchOperationUploadTitle())}
                                </p>
                                <p className="ant-upload-hint" style={{ color: '#666' }}>
                                    {i18n.t(BatchOperationLocale.getBatchOperationUploadHint())}
                                </p>
                            </Dragger>
                            <div style={{ marginTop: 20, textAlign: 'center' }}>
                                <Button 
                                    type="primary" 
                                    onClick={handleUpload} 
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    size="large"
                                    style={{ width: 200 }}
                                >
                                    {i18n.t(BatchOperationLocale.getBatchOperationStartImport())}
                                </Button>
                            </div>
                        </div>
                    )}

                    {(currentStep === 1 || currentStep === 2) && (
                        <div>
                             {currentStep === 2 && (
                                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                                     <Button type="primary" onClick={() => setCurrentStep(0)}>
                                        {i18n.t(BatchOperationLocale.getBatchOperationRetry())}
                                     </Button>
                                </div>
                             )}
                            <div className='nc-bill-table-area'>
                                <Table
                                    columns={getColumns()}
                                    dataSource={importResults}
                                    rowKey="id"
                                    pagination={false}
                                    bordered
                                    size="small"
                                />
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BatchOperation;
