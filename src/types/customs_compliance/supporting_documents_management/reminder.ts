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
