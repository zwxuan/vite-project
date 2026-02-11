import React, { useEffect, useState, useMemo } from 'react';
import { Table, message } from 'antd';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { getFields } from './search_fields';
import { searchTariffData, TariffData } from '@/api/customs_compliance/pre_entry_classification/tariff_data_service';
import '@/pages/page_list.less';

const TariffPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TariffData[]>([]);
  const [total, setTotal] = useState(0);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await searchTariffData(params);
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

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 200px)'}}>
      <AdvancedSearchForm
        fields={fields as any}
        onSearch={handleSearch}
      />
      <div className="nc-bill-table-area">
        <Table
            columns={getColumns() as any}
            dataSource={data}
            rowKey="id"
            loading={loading}
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

export default TariffPanel;