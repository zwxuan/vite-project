import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, message, Modal } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';
import { 
  getExemptionList, 
  approveExemption, 
  rejectExemption, 
  batchApproveExemptions, 
  batchRejectExemptions,
  getExemptionDetail,
  ExemptionRequest
} from '@/api/customs_compliance/compliance_screening_management/exemption_service';
import CreateExemptionModal from './CreateExemptionModal';
import ExemptionDetailDrawer from './ExemptionDetailDrawer';

const ExemptionRequestManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<ExemptionRequest[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });
  const [searchParams, setSearchParams] = useState<any>({});
  
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<ExemptionRequest | null>(null);

  const fetchData = async (params = searchParams) => {
    setLoading(true);
    try {
      const result = await getExemptionList({ ...params, page: pagination.current, pageSize: pagination.pageSize });
      setData(result.list);
      setPagination(prev => ({ ...prev, total: result.total }));
    } catch (error) {
      console.error(error);
      message.error(i18n.t(LocaleHelper.getFail()));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (values: any) => {
    setSearchParams(values);
    fetchData(values);
  };

  const handleApprove = (record: any) => {
    Modal.confirm({
      title: i18n.t(LocaleHelper.getConfirm()),
      content: `Are you sure you want to approve exemption request ${record.id}?`,
      onOk: async () => {
        await approveExemption(record.id);
        message.success(i18n.t(LocaleHelper.getSuccess()));
        fetchData();
        if (detailDrawerVisible && currentDetail?.id === record.id) {
            const updated = await getExemptionDetail(record.id);
            setCurrentDetail(updated || null);
        }
      },
    });
  };

  const handleReject = (record: any) => {
    Modal.confirm({
        title: i18n.t(LocaleHelper.getConfirm()),
        content: `Are you sure you want to reject exemption request ${record.id}?`,
        onOk: async () => {
            await rejectExemption(record.id);
            message.success(i18n.t(LocaleHelper.getSuccess()));
            fetchData();
            if (detailDrawerVisible && currentDetail?.id === record.id) {
                const updated = await getExemptionDetail(record.id);
                setCurrentDetail(updated || null);
            }
        },
    });
  }

  const handleDetail = async (record: any) => {
    setLoading(true);
    const detail = await getExemptionDetail(record.id);
    setLoading(false);
    if (detail) {
        setCurrentDetail(detail);
        setDetailDrawerVisible(true);
    }
  };

  const handleCreate = () => {
    setCreateModalVisible(true);
  };

  const handleBatchApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning(i18n.t(LocaleHelper.getSelectOne()));
      return;
    }
    Modal.confirm({
      title: i18n.t(LocaleHelper.getConfirm()),
      content: `Are you sure you want to approve ${selectedRowKeys.length} items?`,
      onOk: async () => {
        await batchApproveExemptions(selectedRowKeys as string[]);
        message.success(i18n.t(LocaleHelper.getSuccess()));
        setSelectedRowKeys([]);
        fetchData();
      },
    });
  };

  const handleBatchReject = () => {
    if (selectedRowKeys.length === 0) {
      message.warning(i18n.t(LocaleHelper.getSelectOne()));
      return;
    }
    Modal.confirm({
      title: i18n.t(LocaleHelper.getConfirm()),
      content: `Are you sure you want to reject ${selectedRowKeys.length} items?`,
      onOk: async () => {
        await batchRejectExemptions(selectedRowKeys as string[]);
        message.success(i18n.t(LocaleHelper.getSuccess()));
        setSelectedRowKeys([]);
        fetchData();
      },
    });
  };

  const columns = getColumns(handleApprove, handleDetail);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                {i18n.t(LocaleHelper.getExemptionRequestPageTitle())}
                <Tooltip
                  title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                        <li style={{ marginBottom: '10px' }}>
                          <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                            <b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpLabel())}</b>
                          </span>
                          <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                            <li><b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpRole())}</b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpRoleDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpOriginDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpFunc())}</b>{i18n.t(LocaleHelper.getExemptionRequestPageHelpFuncDesc())}</li>
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
        </div>
        <div className="header-button-area">
            <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
            <div style={{ display: "flex" }}>
                <div className="buttonGroup-component">
                    <div className="u-button-group">
                        <Button type="primary" onClick={handleCreate}>{i18n.t(LocaleHelper.getExemptionRequestBtnNew())}</Button>
                        <Button onClick={handleBatchApprove}>{i18n.t(LocaleHelper.getExemptionRequestBtnBatchApprove())}</Button>
                        <Button onClick={handleBatchReject}>{i18n.t(LocaleHelper.getExemptionRequestBtnBatchReject())}</Button>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

      <div className="nc-bill-table-area">
        <Table 
            rowSelection={rowSelection}
            columns={columns} 
            dataSource={data} 
            loading={loading}
            rowKey="id"
            bordered 
            size="small"  
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
                onChange: (page, pageSize) => {
                    setPagination(prev => ({ ...prev, current: page, pageSize }));
                    fetchData({ ...searchParams, page, pageSize });
                }
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 350px)' }}
        />
      </div>

      <CreateExemptionModal 
        visible={createModalVisible} 
        onCancel={() => setCreateModalVisible(false)} 
        onSuccess={() => {
            setCreateModalVisible(false);
            fetchData();
        }}
      />

      <ExemptionDetailDrawer 
        visible={detailDrawerVisible} 
        data={currentDetail} 
        onClose={() => setDetailDrawerVisible(false)} 
        onApprove={(id) => handleApprove({ id })}
        onReject={(id) => handleReject({ id })}
      />
    </div>
  );
};

export default ExemptionRequestManagement;
