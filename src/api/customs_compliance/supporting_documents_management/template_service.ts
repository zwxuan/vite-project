import React from 'react';

export interface TemplateItem {
  id: string;
  templateName: string;
  description: string;
  businessType: 'import' | 'export';
  tradeMode: string;
  status: 'active' | 'inactive';
  docCount: number;
  updateUser: string;
  updateTime: string;
}

export const getTemplateList = async (params: any) => {
  // Mock data
  const data: TemplateItem[] = [
    {
      id: '1',
      templateName: '一般贸易进口标准模板',
      description: '适用于一般贸易进口业务的基础单证组合',
      businessType: 'import',
      tradeMode: 'general',
      status: 'active',
      docCount: 5,
      updateUser: 'Admin',
      updateTime: '2023-10-01 10:00:00',
    },
    {
      id: '2',
      templateName: '一般贸易出口标准模板',
      description: '适用于一般贸易出口业务的基础单证组合',
      businessType: 'export',
      tradeMode: 'general',
      status: 'active',
      docCount: 4,
      updateUser: 'Admin',
      updateTime: '2023-10-02 11:30:00',
    },
    {
      id: '3',
      templateName: '加工贸易进口料件模板',
      description: '加工贸易进口料件专用',
      businessType: 'import',
      tradeMode: 'processing',
      status: 'active',
      docCount: 7,
      updateUser: 'Li Si',
      updateTime: '2023-10-05 09:15:00',
    },
    {
      id: '4',
      templateName: '暂时进出口模板',
      description: 'ATA单证册及暂时进出口业务',
      businessType: 'import',
      tradeMode: 'temporary',
      status: 'inactive',
      docCount: 3,
      updateUser: 'Wang Wu',
      updateTime: '2023-09-20 14:00:00',
    },
    {
      id: '5',
      templateName: '跨境电商进口模板',
      description: '1210/9610业务适用',
      businessType: 'import',
      tradeMode: 'e_commerce',
      status: 'active',
      docCount: 6,
      updateUser: 'Admin',
      updateTime: '2023-10-08 16:20:00',
    },
  ];

  return {
    data,
    total: data.length,
    success: true,
  };
};

export const deleteTemplate = async (id: React.Key) => {
    return { success: true };
};

export const copyTemplate = async (id: React.Key) => {
    return { success: true };
};

export const updateTemplateStatus = async (id: React.Key, status: 'active' | 'inactive') => {
    return { success: true };
};

export const createTemplate = async (data: any) => {
    return { success: true };
};

export const updateTemplate = async (id: React.Key, data: any) => {
    return { success: true };
};
