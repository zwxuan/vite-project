import React from 'react';

export interface ReminderRuleItem {
    id: React.Key;
    ruleName: string;
    reminderType: 'email' | 'system' | 'sms';
    triggerCondition: string;
    recipients: string[];
    status: 'active' | 'inactive';
    lastModified: string;
    description?: string;
}

const mockData: ReminderRuleItem[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `RULE_${i + 1}`,
    ruleName: i % 2 === 0 ? '即将到期提醒' : '缺失单证提醒',
    reminderType: i % 3 === 0 ? 'email' : (i % 3 === 1 ? 'system' : 'sms'),
    triggerCondition: i % 2 === 0 ? '申报前 2 天' : '归档截止前 1 天',
    recipients: ['Admin', 'Manager'],
    status: i % 4 === 0 ? 'inactive' : 'active',
    lastModified: '2023-10-26',
    description: '这是一条自动生成的测试规则',
}));

export const getReminderRuleList = async (params: any) => {
    return { success: true, data: mockData, total: 10 };
};

export const createReminderRule = async (data: any) => {
    return { success: true };
};

export const updateReminderRule = async (id: React.Key, data: any) => {
    return { success: true };
};

export const deleteReminderRule = async (id: React.Key) => {
    return { success: true };
};

export const batchDeleteReminderRules = async (ids: React.Key[]) => {
    return { success: true };
};
