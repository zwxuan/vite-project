import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message, Modal } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import { ArchiveManagementLocale } from '@/utils/locale/customs_compliance/supporting_documents_management/archive_management';
import i18n from '@/i18n';
import { getArchiveList, batchRestore, batchDelete, ArchiveItem } from '@/api/customs_compliance/supporting_documents_management/archive_service';
import '@/pages/page_list.less';

const ArchiveManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArchiveItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getArchiveList(params);
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  const handleSearch = (values: any) => {
    fetchData(values);
  };

  const handleBatchRestore = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(i18n.t(ArchiveManagementLocale.getMsgSelectRestore()));
      return;
    }
    setLoading(true);
    try {
      await batchRestore(selectedRowKeys);
      message.success(i18n.t(ArchiveManagementLocale.getMsgBatchRestoreSuccess()));
      setSelectedRowKeys([]);
      fetchData({});
    } finally {
      setLoading(false);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
        message.warning(i18n.t(ArchiveManagementLocale.getMsgSelectDelete()));
        return;
    }
    Modal.confirm({
        title: i18n.t(ArchiveManagementLocale.getMsgConfirmDeleteTitle()),
        content: i18n.t(ArchiveManagementLocale.getMsgConfirmDeleteContent(), { count: selectedRowKeys.length }),
        onOk: async () => {
            setLoading(true);
            try {
                await batchDelete(selectedRowKeys);
                message.success(i18n.t(ArchiveManagementLocale.getMsgBatchDeleteSuccess()));
                setSelectedRowKeys([]);
                fetchData({});
            } finally {
                setLoading(false);
            }
        }
    });
  };

  const onRestore = async (record: ArchiveItem) => {
      message.success(i18n.t(ArchiveManagementLocale.getMsgRestoreSuccess()));
      fetchData({});
  };

  const onDelete = async (record: ArchiveItem) => {
      message.success(i18n.t(ArchiveManagementLocale.getMsgDeleteSuccess()));
      fetchData({});
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(ArchiveManagementLocale.getPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>说明</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>档案管理员</li>
                                  <li><b>数据来源：</b>历史单证数据</li>
                                  <li><b>功能说明：</b>管理已归档的单证，支持查询、还原和删除操作。</li>
                              </ul>
                          </li>
                      </ol>
                  </div>
              } color='white' overlayInnerStyle={{ color: 'black' }}>
                  <i className='iconfont icon-bangzhutishi' style={{ marginLeft: '8px', cursor: 'pointer' }} />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
             <span className="button-app-wrapper"></span>
             <div className="buttonGroup-component">
                <div className="u-button-group">
                    <Button onClick={handleBatchRestore}>{i18n.t(ArchiveManagementLocale.getBtnBatchRestore())}</Button>
                    <Button danger onClick={handleBatchDelete}>{i18n.t(ArchiveManagementLocale.getBtnBatchDelete())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<ArchiveItem>
            columns={getColumns(onRestore, onDelete) as any}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{
                total,
                showTotal: (total) => `Total ${total} items`,
                showQuickJumper: true,
                showSizeChanger: true,
            }}
            rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
            size="small"
            bordered
          />
      </div>
    </div>
  );
};

export default ArchiveManagement;
