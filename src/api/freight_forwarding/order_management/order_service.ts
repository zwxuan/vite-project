import { OrderItem } from '@/types/freight_forwarding/order_management';

export const getOrderList = async (): Promise<OrderItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', orderNo: 'ORD20231001001', customerName: 'TechGlobal Inc.', orderType: 'Sea Export', orderStatus: 'New', bookingDate: '2023-10-01', origin: 'Shanghai', destination: 'Los Angeles', createTime: '2023-10-01 09:30:00', carrier: 'COSCO', vessel: 'COSCO SHIPPING PONY', voyage: '034E', pieces: 100, grossWeight: 5000, volume: 20 },
        { id: '2', orderNo: 'ORD20231002002', customerName: 'FastTrade Ltd.', orderType: 'Air Import', orderStatus: 'Booking', bookingDate: '2023-10-02', origin: 'London', destination: 'Beijing', createTime: '2023-10-02 10:15:00', carrier: 'Air China', vessel: '', voyage: 'CA938', pieces: 50, grossWeight: 500, volume: 3 },
        { id: '3', orderNo: 'ORD20231003003', customerName: 'AutoParts Co.', orderType: 'Sea Import', orderStatus: 'Shipped', bookingDate: '2023-10-03', origin: 'Hamburg', destination: 'Shanghai', createTime: '2023-10-03 14:20:00', carrier: 'Maersk', vessel: 'MAERSK SEALAND', voyage: '112W', pieces: 200, grossWeight: 12000, volume: 45 },
        { id: '4', orderNo: 'ORD20231004004', customerName: 'FashionNova', orderType: 'Air Export', orderStatus: 'Completed', bookingDate: '2023-10-04', origin: 'Guangzhou', destination: 'Paris', createTime: '2023-10-04 11:00:00', carrier: 'Air France', vessel: '', voyage: 'AF112', pieces: 80, grossWeight: 800, volume: 5 },
        { id: '5', orderNo: 'ORD20231005005', customerName: 'GreenEnergy', orderType: 'Rail Export', orderStatus: 'New', bookingDate: '2023-10-05', origin: 'Xi\'an', destination: 'Duisburg', createTime: '2023-10-05 16:45:00', carrier: 'CR Express', vessel: '', voyage: 'X8011', pieces: 40, grossWeight: 24000, volume: 60 },
        { id: '6', orderNo: 'ORD20231006006', customerName: 'MediCare Corp', orderType: 'Air Export', orderStatus: 'New', bookingDate: '2023-10-06', origin: 'Shenzhen', destination: 'Tokyo', createTime: '2023-10-06 09:00:00', carrier: 'ANA', vessel: '', voyage: 'NH934', pieces: 20, grossWeight: 200, volume: 1 },
        { id: '7', orderNo: 'ORD20231007007', customerName: 'FoodImporters', orderType: 'Sea Import', orderStatus: 'Booking', bookingDate: '2023-10-07', origin: 'Bangkok', destination: 'Ningbo', createTime: '2023-10-07 13:30:00', carrier: 'SITC', vessel: 'SITC SHANGHAI', voyage: '2321N', pieces: 500, grossWeight: 15000, volume: 30 },
        { id: '8', orderNo: 'ORD20231008008', customerName: 'ElectroComponents', orderType: 'Sea Export', orderStatus: 'Shipped', bookingDate: '2023-10-08', origin: 'Xiamen', destination: 'Singapore', createTime: '2023-10-08 10:20:00', carrier: 'ONE', vessel: 'ONE APUS', voyage: '006S', pieces: 150, grossWeight: 8000, volume: 25 },
        { id: '9', orderNo: 'ORD20231009009', customerName: 'HeavyMachinery', orderType: 'Rail Import', orderStatus: 'Completed', bookingDate: '2023-10-09', origin: 'Moscow', destination: 'Chengdu', createTime: '2023-10-09 15:10:00', carrier: 'CR Express', vessel: '', voyage: 'X8022', pieces: 10, grossWeight: 18000, volume: 50 },
        { id: '10', orderNo: 'ORD20231010010', customerName: 'GlobalLogistics', orderType: 'Air Import', orderStatus: 'New', bookingDate: '2023-10-10', origin: 'Sydney', destination: 'Guangzhou', createTime: '2023-10-10 08:50:00', carrier: 'Qantas', vessel: '', voyage: 'QF129', pieces: 30, grossWeight: 300, volume: 2 },
      ]);
    }, 500);
  });
};

export const saveOrder = async (data: OrderItem): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
