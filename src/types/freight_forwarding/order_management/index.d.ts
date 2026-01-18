export interface OrderItem {
  id: string;
  orderNo: string;
  customerName: string;
  orderType: string;
  orderStatus: string; // e.g., 'New', 'Booking', 'Shipped', 'Completed'
  bookingDate: string;
  origin: string;
  destination: string;
  createTime: string;
  carrier?: string;
  vessel?: string;
  voyage?: string;
  pieces?: number;
  grossWeight?: number;
  volume?: number;
}
