export interface BookingItem {
  bookingId: string;
  bookingNo: string;
  carrier: string;
  vesselVoyage: string;
  route: string;
  containerSummary: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  confirmDate: string;
  etd: string;
}

export interface BookingListParams {
  current?: number;
  pageSize?: number;
  bookingNo?: string;
  carrier?: string;
  status?: string;
  route?: string;
  etd?: string[];
}

export interface BookingQueryItem {
  bookingId: string;
  bookingNo: string;
  waybillNo: string;
  customer: string;
  carrier: string;
  route: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'OTHER';
  applyDate: string;
  operator: string;
  confirmStatus: 'CONFIRMED' | 'UNCONFIRMED';
}

export interface BookingQueryParams {
  bookingNo?: string;
  waybillNo?: string;
  customer?: string;
  carrier?: string;
  status?: string;
  route?: string;
  applyDate?: string[];
  sailingDate?: string[];
  operator?: string;
  confirmStatus?: string;
}

export interface PickupPlanItem {
  planId: string;
  planNo: string;
  bookingNo: string;
  carrier: string;
  depot: string;
  plannedDate: string;
  containerCount: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  pushStatus: 'PENDING' | 'PUSHED';
  progress: number;
}

export interface PickupPlanParams {
  planNo?: string;
  bookingNo?: string;
  carrier?: string;
  status?: string;
  pickupDate?: string[];
  depot?: string;
  pushStatus?: string;
}

export interface PickupTrackingItem {
  trackingId: string;
  planNo: string;
  bookingNo: string;
  vehicleNo: string;
  driver: string;
  status: 'WAITING' | 'PICKING' | 'ARRIVED' | 'COMPLETED' | 'EXCEPTION';
  lastUpdate: string;
  progress: number;
}

export interface CarrierIntegrationItem {
  carrierId: string;
  carrierName: string;
  integrationType: 'EDI' | 'API' | 'EMAIL' | 'MANUAL';
  connectionStatus: 'NORMAL' | 'ABNORMAL';
  lastSync: string;
  successRate: number;
}

export interface CarrierErrorLogItem {
  logId: string;
  time: string;
  messageType: string;
  errorMessage: string;
  status: 'RETRYING' | 'RESOLVED';
}

export interface SpaceItem {
  spaceId: string;
  carrier: string;
  vesselVoyage: string;
  route: string;
  departureDate: string;
  totalSpace: number;
  bookedSpace: number;
  availableSpace: number;
  status: 'OPEN' | 'TIGHT' | 'FULL';
}

export interface BookingTemplateItem {
  templateId: string;
  templateName: string;
  transportMode: 'SEA' | 'AIR' | 'RAIL';
  templateType: 'BOOKING' | 'PICKUP' | 'CONFIRMATION';
  scope: 'GLOBAL' | 'PERSONAL';
  status: 'ENABLED' | 'DISABLED';
  updatedBy: string;
  updateTime: string;
}
