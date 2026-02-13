import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, message } from 'antd';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { getFields } from './search_fields';
import { searchHistory } from '@/api/customs_compliance/pre_entry_classification/historical_classification_service';
import { HistoryItem } from '@/types/customs_compliance/pre_entry_classification/historical_classification';
import '@/pages/page_list.less';

const HistoryPanel: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HistoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await searchHistory(params);
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

  const handleViewDetail = (record: HistoryItem) => {
    navigate(`history/detail/${record.id}`);
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 200px)'}}>
      <AdvancedSearchForm
        fields={fields as any}
        onSearch={handleSearch}
      />
      <div className="nc-bill-table-area">
        <Table
            columns={getColumns(handleViewDetail) as any}
            dataSource={data}
            rowKey="id"
            loading={loading}
            bordered={true}
            pagination={{
                total: total,
                showSizeChanger: true,
                showQuickJumper: true,
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 400px)' }}
        />
      </div>
    </div>
  );
};

export default HistoryPanel;