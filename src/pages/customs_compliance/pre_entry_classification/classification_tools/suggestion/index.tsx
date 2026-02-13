import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, message } from 'antd';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import { searchClassificationSuggestions } from '@/api/customs_compliance/pre_entry_classification/classification_suggestion_service';
import { ClassificationSuggestion } from '@/types/customs_compliance/pre_entry_classification/classification_suggestion';
import '@/pages/page_list.less';

const SuggestionPanel: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassificationSuggestion[]>([]);
  const [total, setTotal] = useState(0);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await searchClassificationSuggestions(params);
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

  const handleViewDetail = (record: ClassificationSuggestion) => {
    navigate(`suggestion/detail/${record.id}`);
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

export default SuggestionPanel;