import React from 'react';
import ContainerLoading from './ContainerLoading';

const ContainerLoadingDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <ContainerLoading />
    </div>
  );
};

export default ContainerLoadingDemo;