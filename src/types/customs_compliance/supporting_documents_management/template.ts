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
