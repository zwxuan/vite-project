import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Card, Spin, message, Progress } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getSuggestionDetail, ClassificationSuggestion } from '@/api/customs_compliance/pre_entry_classification/classification_suggestion_service';

const SuggestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassificationSuggestion | null>(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (detailId: string) => {
    setLoading(true);
    try {
      const res = await getSuggestionDetail(detailId);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        message.error('Failed to load detail');
      }
    } catch (error) {
      message.error('Error loading detail');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
      return <div style={{ textAlign: 'center', padding: '50px' }}><Spin /></div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack} 
                style={{ marginRight: 8, color: 'inherit' }}
            />
            <span>{i18n.t(LocaleHelper.getClassificationSuggestionPageTitle())} - {i18n.t(LocaleHelper.getDetail())}</span>
          </div>
        }
        bordered={false}
      >
        {data ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionProductName())}>
              {data.product_name}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionHsCode())}>
              {data.hs_code}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionConfidence())}>
               <Progress percent={data.confidence} size="small" style={{ width: 100 }} />
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionSource())}>
              {data.source}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionCreateTime())}>
              {data.create_time}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {data.status}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <div>No Data</div>
        )}
      </Card>
    </div>
  );
};

export default SuggestionDetail;
