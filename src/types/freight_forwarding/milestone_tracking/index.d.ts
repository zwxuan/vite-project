export interface TrackingOverviewItem {
    id: string;
    waybillNumber: string;
    customerName: string;
    route: string;
    status: string;
    progress: number;
    etd?: string;
    eta?: string;
}

export interface MilestoneConfigItem {
    id: string;
    milestoneName: string;
    triggerCondition: string;
    notificationSettings: string[];
    status: boolean;
    sequence: number;
    delayThreshold?: number;
}

export interface RealtimeTrackingItem {
    id: string;
    waybillNumber: string;
    currentLocation: string;
    coordinates: { lat: number; lng: number };
    status: string;
    updateTime: string;
    nextMilestone: string;
    estimatedArrival: string;
}

export interface ExceptionAlertItem {
    id: string;
    waybillNumber: string;
    alertType: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    alertTime: string;
    status: 'Pending' | 'Processed' | 'Ignored';
    description: string;
}

export interface CustomerNotificationItem {
    id: string;
    customerName: string;
    waybillNumber: string;
    notificationType: string;
    method: 'Email' | 'SMS' | 'WeChat';
    sendTime: string;
    status: 'Sent' | 'Failed' | 'Pending';
}

export interface TrackingReportItem {
    route: string;
    shipmentCount: number;
    avgDuration: string;
    onTimeRate: number;
    exceptionRate: number;
    customerSatisfaction: number;
}

export interface InterfaceConfigItem {
    id: string;
    interfaceName: string;
    interfaceType: string;
    status: 'Normal' | 'Error' | 'Maintenance';
    lastSyncTime: string;
    apiUrl: string;
    syncFrequency: number;
}
