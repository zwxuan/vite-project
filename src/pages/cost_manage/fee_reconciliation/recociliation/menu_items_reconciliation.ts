import React from 'react';
import { MenuProps } from 'antd';
import { FileExcelOutlined, SyncOutlined, SettingOutlined } from '@ant-design/icons';

// 对账功能菜单项
export const reconciliationMenuItems: MenuProps['items'] = [
  {
    key: 'upload',
    label: '上传Excel',
    icon: React.createElement(FileExcelOutlined),
  },
  {
    key: 'reconcile',
    label: '执行对账',
    icon: React.createElement(SyncOutlined),
  },
  {
    key: 'settings',
    label: '对账设置',
    icon: React.createElement(SettingOutlined),
    children: [
      {
        key: 'match_fields',
        label: '匹配字段设置',
      },
      {
        key: 'compare_fields',
        label: '比较字段设置',
      },
      {
        key: 'templates',
        label: '模板管理',
      },
    ],
  },
];

// 对账结果操作菜单项
export const reconciliationResultItems: MenuProps['items'] = [
  {
    key: 'export',
    label: '导出结果',
    icon: React.createElement(FileExcelOutlined),
  },
  {
    key: 'save',
    label: '保存配置',
    icon: React.createElement(SettingOutlined),
  },
];

// 颜色说明
export const colorLegend = [
  {
    color: 'green',
    description: '对比相同',
  },
  {
    color: 'red',
    description: '对比不同',
  },
  {
    color: 'black',
    description: '未匹配',
  },
];