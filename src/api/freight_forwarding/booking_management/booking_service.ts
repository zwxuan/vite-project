import { ApiRes } from '../../request';
import {
  BookingItem,
  BookingListParams,
  BookingQueryItem,
  BookingQueryParams,
  PickupPlanItem,
  PickupPlanParams,
  PickupTrackingItem,
  CarrierIntegrationItem,
  CarrierErrorLogItem,
  SpaceItem,
  BookingTemplateItem,
} from '@/types/freight_forwarding/booking_management';

const bookingListData: BookingItem[] = [
  { bookingId: 'BKG-001', bookingNo: 'BKG-001', carrier: 'COSCO', vesselVoyage: 'MSC/240315E', route: 'SHA-LAX', containerSummary: '40HQ*2', status: 'CONFIRMED', confirmDate: '2024-03-16', etd: '2024-03-20' },
  { bookingId: 'BKG-002', bookingNo: 'BKG-002', carrier: 'MAERSK', vesselVoyage: 'AE7/240320W', route: 'SHA-HAM', containerSummary: '20GP*1', status: 'PENDING', confirmDate: '', etd: '2024-03-22' },
  { bookingId: 'BKG-003', bookingNo: 'BKG-003', carrier: 'CR', vesselVoyage: 'X8001/240322', route: 'CGO-HAM', containerSummary: '40HQ*3', status: 'CONFIRMED', confirmDate: '2024-03-18', etd: '2024-03-26' },
  { bookingId: 'BKG-004', bookingNo: 'BKG-004', carrier: 'MSC', vesselVoyage: 'MSC/240325E', route: 'NGB-HAM', containerSummary: '40GP*1', status: 'CANCELLED', confirmDate: '2024-03-19', etd: '2024-03-27' },
  { bookingId: 'BKG-005', bookingNo: 'BKG-005', carrier: 'CMA', vesselVoyage: 'CMA/240328E', route: 'XMN-DXB', containerSummary: '40HQ*2', status: 'PENDING', confirmDate: '', etd: '2024-03-28' },
  { bookingId: 'BKG-006', bookingNo: 'BKG-006', carrier: 'OOCL', vesselVoyage: 'OOCL/240330E', route: 'SZX-NYC', containerSummary: '20GP*2', status: 'CONFIRMED', confirmDate: '2024-03-20', etd: '2024-03-30' },
  { bookingId: 'BKG-007', bookingNo: 'BKG-007', carrier: 'ONE', vesselVoyage: 'ONE/240401E', route: 'TSN-TYO', containerSummary: '40HQ*1', status: 'PENDING', confirmDate: '', etd: '2024-04-01' },
  { bookingId: 'BKG-008', bookingNo: 'BKG-008', carrier: 'HPL', vesselVoyage: 'HPL/240403E', route: 'QDG-SIN', containerSummary: '20GP*4', status: 'CONFIRMED', confirmDate: '2024-03-23', etd: '2024-04-03' },
  { bookingId: 'BKG-009', bookingNo: 'BKG-009', carrier: 'EMC', vesselVoyage: 'EMC/240405E', route: 'KAO-SEA', containerSummary: '40HQ*2', status: 'PENDING', confirmDate: '', etd: '2024-04-05' },
  { bookingId: 'BKG-010', bookingNo: 'BKG-010', carrier: 'COSCO', vesselVoyage: 'COSCO/240407E', route: 'SHA-LAX', containerSummary: '40GP*3', status: 'CONFIRMED', confirmDate: '2024-03-25', etd: '2024-04-07' },
];

const bookingQueryData: BookingQueryItem[] = [
  { bookingId: 'BQ-001', bookingNo: 'BKG-001', waybillNo: 'WAY-001', customer: 'ABC TRADING', carrier: 'COSCO', route: 'SHA-LAX', status: 'CONFIRMED', applyDate: '2024-03-15', operator: 'Lily', confirmStatus: 'CONFIRMED' },
  { bookingId: 'BQ-002', bookingNo: 'BKG-002', waybillNo: 'WAY-002', customer: 'XYZ LOGISTICS', carrier: 'MAERSK', route: 'SZX-NYC', status: 'PENDING', applyDate: '2024-03-16', operator: 'Jack', confirmStatus: 'UNCONFIRMED' },
  { bookingId: 'BQ-003', bookingNo: 'BKG-003', waybillNo: 'WAY-003', customer: 'DEF INDUSTRY', carrier: 'CR', route: 'CGO-HAM', status: 'CONFIRMED', applyDate: '2024-03-17', operator: 'Nina', confirmStatus: 'CONFIRMED' },
  { bookingId: 'BQ-004', bookingNo: 'BKG-004', waybillNo: 'WAY-004', customer: 'LMN SUPPLY', carrier: 'MSC', route: 'NGB-HAM', status: 'CANCELLED', applyDate: '2024-03-18', operator: 'Eric', confirmStatus: 'CONFIRMED' },
  { bookingId: 'BQ-005', bookingNo: 'BKG-005', waybillNo: 'WAY-005', customer: 'OPQ ELECTRONICS', carrier: 'CMA', route: 'XMN-DXB', status: 'PENDING', applyDate: '2024-03-19', operator: 'Ivy', confirmStatus: 'UNCONFIRMED' },
  { bookingId: 'BQ-006', bookingNo: 'BKG-006', waybillNo: 'WAY-006', customer: 'SUNRISE LTD', carrier: 'OOCL', route: 'SZX-NYC', status: 'CONFIRMED', applyDate: '2024-03-20', operator: 'Leo', confirmStatus: 'CONFIRMED' },
  { bookingId: 'BQ-007', bookingNo: 'BKG-007', waybillNo: 'WAY-007', customer: 'NEO TECH', carrier: 'ONE', route: 'TSN-TYO', status: 'OTHER', applyDate: '2024-03-21', operator: 'May', confirmStatus: 'UNCONFIRMED' },
  { bookingId: 'BQ-008', bookingNo: 'BKG-008', waybillNo: 'WAY-008', customer: 'PACIFIC CO', carrier: 'HPL', route: 'QDG-SIN', status: 'CONFIRMED', applyDate: '2024-03-22', operator: 'Owen', confirmStatus: 'CONFIRMED' },
  { bookingId: 'BQ-009', bookingNo: 'BKG-009', waybillNo: 'WAY-009', customer: 'GLOBE AUTO', carrier: 'EMC', route: 'KAO-SEA', status: 'PENDING', applyDate: '2024-03-23', operator: 'Sara', confirmStatus: 'UNCONFIRMED' },
  { bookingId: 'BQ-010', bookingNo: 'BKG-010', waybillNo: 'WAY-010', customer: 'NOVA LTD', carrier: 'COSCO', route: 'SHA-LAX', status: 'CONFIRMED', applyDate: '2024-03-24', operator: 'Victor', confirmStatus: 'CONFIRMED' },
];

const pickupPlanData: PickupPlanItem[] = [
  { planId: 'PP-001', planNo: 'PP-202403-001', bookingNo: 'BKG-001', carrier: 'COSCO', depot: '外高桥', plannedDate: '2024-03-18', containerCount: 2, status: 'PLANNED', pushStatus: 'PUSHED', progress: 20 },
  { planId: 'PP-002', planNo: 'PP-202403-002', bookingNo: 'BKG-002', carrier: 'MAERSK', depot: '洋山港', plannedDate: '2024-03-19', containerCount: 1, status: 'PLANNED', pushStatus: 'PENDING', progress: 10 },
  { planId: 'PP-003', planNo: 'PP-202403-003', bookingNo: 'BKG-003', carrier: '中铁集装箱', depot: '郑州站', plannedDate: '2024-03-20', containerCount: 3, status: 'IN_PROGRESS', pushStatus: 'PUSHED', progress: 60 },
  { planId: 'PP-004', planNo: 'PP-202403-004', bookingNo: 'BKG-004', carrier: 'MSC', depot: '外高桥', plannedDate: '2024-03-20', containerCount: 1, status: 'DELAYED', pushStatus: 'PENDING', progress: 0 },
  { planId: 'PP-005', planNo: 'PP-202403-005', bookingNo: 'BKG-005', carrier: 'CMA', depot: '厦门站', plannedDate: '2024-03-21', containerCount: 2, status: 'PLANNED', pushStatus: 'PENDING', progress: 5 },
  { planId: 'PP-006', planNo: 'PP-202403-006', bookingNo: 'BKG-006', carrier: 'OOCL', depot: '深圳站', plannedDate: '2024-03-21', containerCount: 2, status: 'IN_PROGRESS', pushStatus: 'PUSHED', progress: 50 },
  { planId: 'PP-007', planNo: 'PP-202403-007', bookingNo: 'BKG-007', carrier: 'ONE', depot: '天津站', plannedDate: '2024-03-22', containerCount: 1, status: 'PLANNED', pushStatus: 'PENDING', progress: 15 },
  { planId: 'PP-008', planNo: 'PP-202403-008', bookingNo: 'BKG-008', carrier: 'HPL', depot: '青岛站', plannedDate: '2024-03-23', containerCount: 4, status: 'COMPLETED', pushStatus: 'PUSHED', progress: 100 },
  { planId: 'PP-009', planNo: 'PP-202403-009', bookingNo: 'BKG-009', carrier: 'EMC', depot: '高雄站', plannedDate: '2024-03-24', containerCount: 2, status: 'IN_PROGRESS', pushStatus: 'PUSHED', progress: 70 },
  { planId: 'PP-010', planNo: 'PP-202403-010', bookingNo: 'BKG-010', carrier: 'COSCO', depot: '上海站', plannedDate: '2024-03-25', containerCount: 3, status: 'PLANNED', pushStatus: 'PENDING', progress: 25 },
];

const pickupTrackingData: PickupTrackingItem[] = [
  { trackingId: 'PT-001', planNo: 'PP-202403-001', bookingNo: 'BKG-001', vehicleNo: '沪A12345', driver: 'Chen', status: 'WAITING', lastUpdate: '2024-03-18 08:30', progress: 10 },
  { trackingId: 'PT-002', planNo: 'PP-202403-002', bookingNo: 'BKG-002', vehicleNo: '沪B22222', driver: 'Wang', status: 'PICKING', lastUpdate: '2024-03-19 11:00', progress: 40 },
  { trackingId: 'PT-003', planNo: 'PP-202403-003', bookingNo: 'BKG-003', vehicleNo: '沪C33333', driver: 'Li', status: 'COMPLETED', lastUpdate: '2024-03-20 12:00', progress: 100 },
  { trackingId: 'PT-004', planNo: 'PP-202403-004', bookingNo: 'BKG-004', vehicleNo: '宁D44444', driver: 'Zhao', status: 'EXCEPTION', lastUpdate: '2024-03-20 14:20', progress: 60 },
  { trackingId: 'PT-005', planNo: 'PP-202403-005', bookingNo: 'BKG-005', vehicleNo: '厦E55555', driver: 'Xu', status: 'WAITING', lastUpdate: '2024-03-21 08:10', progress: 5 },
  { trackingId: 'PT-006', planNo: 'PP-202403-006', bookingNo: 'BKG-006', vehicleNo: '深F66666', driver: 'Liu', status: 'ARRIVED', lastUpdate: '2024-03-21 16:30', progress: 75 },
  { trackingId: 'PT-007', planNo: 'PP-202403-007', bookingNo: 'BKG-007', vehicleNo: '津G77777', driver: 'Zhou', status: 'WAITING', lastUpdate: '2024-03-22 07:50', progress: 12 },
  { trackingId: 'PT-008', planNo: 'PP-202403-008', bookingNo: 'BKG-008', vehicleNo: '青H88888', driver: 'Yang', status: 'COMPLETED', lastUpdate: '2024-03-23 12:10', progress: 100 },
  { trackingId: 'PT-009', planNo: 'PP-202403-009', bookingNo: 'BKG-009', vehicleNo: '高I99999', driver: 'Sun', status: 'PICKING', lastUpdate: '2024-03-24 15:30', progress: 55 },
  { trackingId: 'PT-010', planNo: 'PP-202403-010', bookingNo: 'BKG-010', vehicleNo: '沪J00001', driver: 'He', status: 'WAITING', lastUpdate: '2024-03-25 09:20', progress: 18 },
];

const carrierIntegrationData: CarrierIntegrationItem[] = [
  { carrierId: 'C-001', carrierName: 'COSCO', integrationType: 'EDI', connectionStatus: 'NORMAL', lastSync: '10:30', successRate: 98.5 },
  { carrierId: 'C-002', carrierName: 'MAERSK', integrationType: 'API', connectionStatus: 'NORMAL', lastSync: '10:25', successRate: 97.2 },
  { carrierId: 'C-003', carrierName: 'MSC', integrationType: 'EMAIL', connectionStatus: 'ABNORMAL', lastSync: 'Yesterday', successRate: 85.0 },
  { carrierId: 'C-004', carrierName: 'CR', integrationType: 'API', connectionStatus: 'NORMAL', lastSync: '10:20', successRate: 96.8 },
  { carrierId: 'C-005', carrierName: 'OOCL', integrationType: 'MANUAL', connectionStatus: 'NORMAL', lastSync: '-', successRate: 92.1 },
];

const carrierErrorLogs: CarrierErrorLogItem[] = [
  { logId: 'E-001', time: '10:15', messageType: 'BOOKING', errorMessage: 'Connection timeout', status: 'RETRYING' },
  { logId: 'E-002', time: '09:45', messageType: 'STATUS', errorMessage: 'Authentication failed', status: 'RESOLVED' },
  { logId: 'E-003', time: '09:10', messageType: 'BOOKING', errorMessage: 'Invalid payload', status: 'RESOLVED' },
];

const spaceData: SpaceItem[] = [
  { spaceId: 'S-001', carrier: 'COSCO', vesselVoyage: 'MSC/240320E', route: 'SHA-LAX', departureDate: '2024-03-20', totalSpace: 200, bookedSpace: 156, availableSpace: 44, status: 'OPEN' },
  { spaceId: 'S-002', carrier: 'MAERSK', vesselVoyage: 'AE7/240322W', route: 'SZX-NYC', departureDate: '2024-03-22', totalSpace: 180, bookedSpace: 145, availableSpace: 35, status: 'TIGHT' },
  { spaceId: 'S-003', carrier: 'MSC', vesselVoyage: 'MSC/240325E', route: 'NGB-HAM', departureDate: '2024-03-25', totalSpace: 220, bookedSpace: 89, availableSpace: 131, status: 'OPEN' },
  { spaceId: 'S-004', carrier: 'CR', vesselVoyage: 'X8002/240326', route: 'CKG-DUI', departureDate: '2024-03-26', totalSpace: 150, bookedSpace: 95, availableSpace: 55, status: 'TIGHT' },
  { spaceId: 'S-005', carrier: 'CMA', vesselVoyage: 'CMA/240327', route: 'XMN-DXB', departureDate: '2024-03-27', totalSpace: 160, bookedSpace: 160, availableSpace: 0, status: 'FULL' },
  { spaceId: 'S-006', carrier: 'ONE', vesselVoyage: 'ONE/240328', route: 'TSN-TYO', departureDate: '2024-03-28', totalSpace: 140, bookedSpace: 100, availableSpace: 40, status: 'OPEN' },
  { spaceId: 'S-007', carrier: 'HPL', vesselVoyage: 'HPL/240329', route: 'QDG-SIN', departureDate: '2024-03-29', totalSpace: 190, bookedSpace: 170, availableSpace: 20, status: 'TIGHT' },
  { spaceId: 'S-008', carrier: 'EMC', vesselVoyage: 'EMC/240330', route: 'KAO-SEA', departureDate: '2024-03-30', totalSpace: 210, bookedSpace: 200, availableSpace: 10, status: 'TIGHT' },
  { spaceId: 'S-009', carrier: 'OOCL', vesselVoyage: 'OOCL/240401', route: 'SZX-NYC', departureDate: '2024-04-01', totalSpace: 175, bookedSpace: 120, availableSpace: 55, status: 'OPEN' },
  { spaceId: 'S-010', carrier: 'COSCO', vesselVoyage: 'COSCO/240402', route: 'SHA-LAX', departureDate: '2024-04-02', totalSpace: 230, bookedSpace: 210, availableSpace: 20, status: 'TIGHT' },
];

const bookingTemplateData: BookingTemplateItem[] = [
  { templateId: 'T-001', templateName: 'Global SEA Export', transportMode: 'SEA', templateType: 'BOOKING', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Admin', updateTime: '2024-03-10' },
  { templateId: 'T-002', templateName: 'Air Priority', transportMode: 'AIR', templateType: 'BOOKING', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Admin', updateTime: '2024-03-11' },
  { templateId: 'T-003', templateName: 'Rail Booking CN-DE', transportMode: 'RAIL', templateType: 'BOOKING', scope: 'PERSONAL', status: 'DISABLED', updatedBy: 'Nina', updateTime: '2024-03-12' },
  { templateId: 'T-004', templateName: 'Pickup Plan East', transportMode: 'SEA', templateType: 'PICKUP', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Leo', updateTime: '2024-03-13' },
  { templateId: 'T-005', templateName: 'Confirmation Standard', transportMode: 'SEA', templateType: 'CONFIRMATION', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Ivy', updateTime: '2024-03-14' },
  { templateId: 'T-006', templateName: 'Rail Pickup EU', transportMode: 'RAIL', templateType: 'PICKUP', scope: 'PERSONAL', status: 'DISABLED', updatedBy: 'Sara', updateTime: '2024-03-15' },
  { templateId: 'T-007', templateName: 'Air Pickup Fast', transportMode: 'AIR', templateType: 'PICKUP', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Victor', updateTime: '2024-03-16' },
  { templateId: 'T-008', templateName: 'SEA Booking West', transportMode: 'SEA', templateType: 'BOOKING', scope: 'PERSONAL', status: 'ENABLED', updatedBy: 'May', updateTime: '2024-03-17' },
  { templateId: 'T-009', templateName: 'SEA Confirmation', transportMode: 'SEA', templateType: 'CONFIRMATION', scope: 'GLOBAL', status: 'DISABLED', updatedBy: 'Owen', updateTime: '2024-03-18' },
  { templateId: 'T-010', templateName: 'Air Export Standard', transportMode: 'AIR', templateType: 'BOOKING', scope: 'GLOBAL', status: 'ENABLED', updatedBy: 'Jack', updateTime: '2024-03-19' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getBookingList = async (params: BookingListParams): Promise<ApiRes<{ list: BookingItem[]; total: number }>> => {
  await delay(400);
  let filtered = [...bookingListData];
  if (params.bookingNo) {
    filtered = filtered.filter(item => item.bookingNo.includes(params.bookingNo!));
  }
  if (params.carrier) {
    filtered = filtered.filter(item => item.carrier.includes(params.carrier!));
  }
  if (params.status) {
    filtered = filtered.filter(item => item.status === params.status);
  }
  if (params.route) {
    filtered = filtered.filter(item => item.route.includes(params.route!));
  }
  return {
    data: { list: filtered, total: filtered.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getBookingQueryList = async (params: BookingQueryParams): Promise<ApiRes<{ list: BookingQueryItem[]; total: number }>> => {
  await delay(400);
  let filtered = [...bookingQueryData];
  if (params.bookingNo) {
    filtered = filtered.filter(item => item.bookingNo.includes(params.bookingNo!));
  }
  if (params.waybillNo) {
    filtered = filtered.filter(item => item.waybillNo.includes(params.waybillNo!));
  }
  if (params.customer) {
    filtered = filtered.filter(item => item.customer.includes(params.customer!));
  }
  if (params.carrier) {
    filtered = filtered.filter(item => item.carrier.includes(params.carrier!));
  }
  if (params.status) {
    filtered = filtered.filter(item => item.status === params.status);
  }
  if (params.route) {
    filtered = filtered.filter(item => item.route.includes(params.route!));
  }
  if (params.operator) {
    filtered = filtered.filter(item => item.operator.includes(params.operator!));
  }
  if (params.confirmStatus) {
    filtered = filtered.filter(item => item.confirmStatus === params.confirmStatus);
  }
  return {
    data: { list: filtered, total: filtered.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getPickupPlanList = async (params: PickupPlanParams): Promise<ApiRes<{ list: PickupPlanItem[]; total: number }>> => {
  await delay(400);
  let filtered = [...pickupPlanData];
  if (params.planNo) {
    filtered = filtered.filter(item => item.planNo.includes(params.planNo!));
  }
  if (params.bookingNo) {
    filtered = filtered.filter(item => item.bookingNo.includes(params.bookingNo!));
  }
  if (params.carrier) {
    filtered = filtered.filter(item => item.carrier.includes(params.carrier!));
  }
  if (params.status) {
    filtered = filtered.filter(item => item.status === params.status);
  }
  if (params.depot) {
    filtered = filtered.filter(item => item.depot.includes(params.depot!));
  }
  if (params.pushStatus) {
    filtered = filtered.filter(item => item.pushStatus === params.pushStatus);
  }
  if (params.pickupDate && params.pickupDate.length === 2) {
    const [start, end] = params.pickupDate;
    filtered = filtered.filter(item => item.plannedDate >= start && item.plannedDate <= end);
  }
  return {
    data: { list: filtered, total: filtered.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getPickupTrackingList = async (params: PickupPlanParams): Promise<ApiRes<{ list: PickupTrackingItem[]; total: number }>> => {
  await delay(400);
  let filtered = [...pickupTrackingData];
  if (params.planNo) {
    filtered = filtered.filter(item => item.planNo.includes(params.planNo!));
  }
  if (params.bookingNo) {
    filtered = filtered.filter(item => item.bookingNo.includes(params.bookingNo!));
  }
  if (params.status) {
    filtered = filtered.filter(item => item.status === params.status);
  }
  return {
    data: { list: filtered, total: filtered.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getCarrierIntegrationList = async (): Promise<ApiRes<{ list: CarrierIntegrationItem[]; total: number }>> => {
  await delay(300);
  return {
    data: { list: carrierIntegrationData, total: carrierIntegrationData.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getCarrierErrorLogs = async (): Promise<ApiRes<{ list: CarrierErrorLogItem[]; total: number }>> => {
  await delay(300);
  return {
    data: { list: carrierErrorLogs, total: carrierErrorLogs.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getSpaceList = async (): Promise<ApiRes<{ list: SpaceItem[]; total: number }>> => {
  await delay(300);
  return {
    data: { list: spaceData, total: spaceData.length },
    success: true,
    code: 200,
    message: 'success',
  };
};

export const getBookingTemplateList = async (): Promise<ApiRes<{ list: BookingTemplateItem[]; total: number }>> => {
  await delay(300);
  return {
    data: { list: bookingTemplateData, total: bookingTemplateData.length },
    success: true,
    code: 200,
    message: 'success',
  };
};
