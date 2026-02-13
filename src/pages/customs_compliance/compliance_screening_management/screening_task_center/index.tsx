import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tooltip, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { getSearchFields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import { getScreeningTaskList } from '@/api/customs_compliance/compliance_screening_management/screening_service';
import { ScreeningTask } from '@/types/customs_compliance/compliance_screening_management/screening';
import '@/pages/page_list.less';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';

const ScreeningTaskCenter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScreeningTask[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchParams, setSearchParams] = useState({});
  const navigate = useNavigate();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      const res: any = await getScreeningTaskList(params);
      if (res.success) {
        setData(res.data.list);
        setTotal(res.data.total);
      }
    } catch (error) {
      message.error('Failed to fetch data');
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

  const handleDetail = (record: ScreeningTask) => {
    navigate(`/compliance_screening_management/screening_result_query?id=${record.screeningId}`);
  };

  const handleReport = (record: ScreeningTask) => {
    message.success(`Downloading report for ${record.screeningId}`);
  };

  const handleProcess = (record: ScreeningTask) => {
    navigate(`/compliance_screening_management/hit_processing?id=${record.screeningId}`);
  };

  const handleInitiate = () => {
    navigate('/compliance_screening_management/initiate_screening');
  };

  const handleBatchScreening = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一项进行批量操作');
      return;
    }
    message.success('Batch screening initiated');
  };

  const handleExport = () => {
    message.success('Exporting data...');
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getScreeningTaskCenterPageTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                          <b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpLabel())}</b>
                        </span>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                          <li><b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpRole())}</b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpRoleDesc())}</li>
                          <li><b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpOriginDesc())}</li>
                          <li><b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpFunc())}</b>{i18n.t(LocaleHelper.getScreeningTaskCenterPageHelpFuncDesc())}</li>
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
          <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
          <div style={{ display: "flex" }}>
            <div className="buttonGroup-component">
              <div className="u-button-group">
                <Button type="primary" danger onClick={handleInitiate}>
                  {i18n.t(LocaleHelper.getScreeningTaskCenterBtnInitiate())}
                </Button>
                <Button onClick={handleBatchScreening}>
                  {i18n.t(LocaleHelper.getScreeningTaskCenterBtnBatch())}
                </Button>
                <Button onClick={handleExport}>
                  {i18n.t(LocaleHelper.getScreeningTaskCenterBtnExport())}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvancedSearchForm fields={getSearchFields() as any} onSearch={handleSearch} />

      <div className="nc-bill-table-area">
        <Table
          columns={getColumns(handleDetail, handleReport, handleProcess)}
          dataSource={data}
          rowKey="id"
          loading={loading}
          size="small"
          bordered
          rowSelection={rowSelection}
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          pagination={{
            total,
            showTotal: (total) => `Total ${total} items`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
};

export default ScreeningTaskCenter;
