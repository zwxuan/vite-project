import { 
    TrackingOverviewItem, 
    MilestoneConfigItem, 
    RealtimeTrackingItem, 
    ExceptionAlertItem, 
    CustomerNotificationItem, 
    TrackingReportItem, 
    InterfaceConfigItem 
} from '@/types/freight_forwarding/milestone_tracking';

// Mock Data
const trackingOverviewData: TrackingOverviewItem[] = [
    { id: '1', waybillNumber: 'WAY-001', customerName: 'ABC Company', route: 'Shanghai - LA', status: 'Shipped', progress: 60, etd: '2024-03-20', eta: '2024-04-15' },
    { id: '2', waybillNumber: 'WAY-002', customerName: 'XYZ Company', route: 'Shenzhen - NY', status: 'Booked', progress: 20, etd: '2024-03-25', eta: '2024-04-20' },
    { id: '3', waybillNumber: 'WAY-003', customerName: 'DEF Trade', route: 'Qingdao - Hamburg', status: 'Arrived', progress: 80, etd: '2024-03-10', eta: '2024-04-05' },
    { id: '4', waybillNumber: 'WAY-004', customerName: 'GHI Logistics', route: 'Ningbo - Rotterdam', status: 'Delivered', progress: 100, etd: '2024-03-01', eta: '2024-03-30' },
    { id: '5', waybillNumber: 'WAY-005', customerName: 'JKL Import', route: 'Tianjin - Tokyo', status: 'Exception', progress: 45, etd: '2024-03-15', eta: '2024-04-10' },
];

const milestoneConfigData: MilestoneConfigItem[] = [
    { id: '1', milestoneName: 'Booking Confirmed', triggerCondition: 'Auto', notificationSettings: ['Customer', 'Internal'], status: true, sequence: 1 },
    { id: '2', milestoneName: 'Cargo Picked Up', triggerCondition: 'Manual', notificationSettings: ['Internal'], status: true, sequence: 2 },
    { id: '3', milestoneName: 'Departure', triggerCondition: 'EDI', notificationSettings: ['Customer', 'Internal'], status: true, sequence: 3 },
    { id: '4', milestoneName: 'Arrival', triggerCondition: 'Auto Calculation', notificationSettings: ['Customer'], status: true, sequence: 4 },
];

const realtimeTrackingData: RealtimeTrackingItem[] = [
    { id: '1', waybillNumber: 'WAY-001', currentLocation: 'Pacific Ocean', coordinates: { lat: 30.5, lng: -140.2 }, status: 'In Transit', updateTime: '2024-03-22 10:00', nextMilestone: 'Arrival', estimatedArrival: '2024-04-15' },
    { id: '2', waybillNumber: 'WAY-002', currentLocation: 'Shenzhen Port', coordinates: { lat: 22.5, lng: 114.0 }, status: 'At Port', updateTime: '2024-03-25 09:00', nextMilestone: 'Departure', estimatedArrival: '2024-04-20' },
];

const exceptionAlertData: ExceptionAlertItem[] = [
    { id: '1', waybillNumber: 'WAY-001', alertType: 'Delay', severity: 'High', alertTime: '2024-03-22 10:30', status: 'Pending', description: 'Vessel delayed by 2 days due to weather' },
    { id: '2', waybillNumber: 'WAY-002', alertType: 'Status Error', severity: 'Medium', alertTime: '2024-03-25 09:15', status: 'Processed', description: 'Status mismatch with carrier system' },
    { id: '3', waybillNumber: 'WAY-005', alertType: 'Doc Missing', severity: 'Critical', alertTime: '2024-03-15 08:45', status: 'Pending', description: 'Customs clearance documents missing' },
];

const customerNotificationData: CustomerNotificationItem[] = [
    { id: '1', customerName: 'ABC Company', waybillNumber: 'WAY-001', notificationType: 'Departure', method: 'Email', sendTime: '2024-03-20 10:30', status: 'Sent' },
    { id: '2', customerName: 'XYZ Company', waybillNumber: 'WAY-002', notificationType: 'Booking', method: 'SMS', sendTime: '2024-03-25 09:15', status: 'Sent' },
    { id: '3', customerName: 'DEF Trade', waybillNumber: 'WAY-003', notificationType: 'Delay', method: 'WeChat', sendTime: '2024-03-22 08:45', status: 'Failed' },
];

const trackingReportData: TrackingReportItem[] = [
    { route: 'Shanghai - LA', shipmentCount: 45, avgDuration: '18 days', onTimeRate: 95, exceptionRate: 5, customerSatisfaction: 4.5 },
    { route: 'Shenzhen - NY', shipmentCount: 32, avgDuration: '19 days', onTimeRate: 90, exceptionRate: 10, customerSatisfaction: 4.2 },
    { route: 'Qingdao - Hamburg', shipmentCount: 28, avgDuration: '22 days', onTimeRate: 88, exceptionRate: 12, customerSatisfaction: 4.0 },
];

const interfaceConfigData: InterfaceConfigItem[] = [
    { id: '1', interfaceName: 'COSCO API', interfaceType: 'Carrier', status: 'Normal', lastSyncTime: '2024-03-25 10:30', apiUrl: 'https://api.cosco.com', syncFrequency: 15 },
    { id: '2', interfaceName: 'MSK API', interfaceType: 'Carrier', status: 'Error', lastSyncTime: '2024-03-25 09:15', apiUrl: 'https://api.maersk.com', syncFrequency: 30 },
    { id: '3', interfaceName: 'Customs EDI', interfaceType: 'Government', status: 'Normal', lastSyncTime: '2024-03-25 10:00', apiUrl: 'https://customs.gov', syncFrequency: 60 },
];

// Service Functions
export const getTrackingOverviewList = async (): Promise<TrackingOverviewItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(trackingOverviewData), 500));
};

export const getMilestoneConfigList = async (): Promise<MilestoneConfigItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(milestoneConfigData), 500));
};

export const getRealtimeTrackingList = async (): Promise<RealtimeTrackingItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(realtimeTrackingData), 500));
};

export const getExceptionAlertList = async (): Promise<ExceptionAlertItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(exceptionAlertData), 500));
};

export const getCustomerNotificationList = async (): Promise<CustomerNotificationItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(customerNotificationData), 500));
};

export const getTrackingReportList = async (): Promise<TrackingReportItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(trackingReportData), 500));
};

export const getInterfaceConfigList = async (): Promise<InterfaceConfigItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(interfaceConfigData), 500));
};
