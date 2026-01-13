import { OrderItem } from "@/types/freight_forwarding/order_management";

let mockOrders: OrderItem[] = Array.from({ length: 10 }).map((_, index) => ({
    id: `${index + 1}`,
    orderNo: `ORD2023${String(index + 1).padStart(4, '0')}`,
    customerName: `Customer ${String.fromCharCode(65 + index)}`,
    orderType: index % 2 === 0 ? 'Ocean Export' : 'Air Import',
    status: ['draft', 'pending', 'confirmed', 'processing', 'completed', 'cancelled'][index % 6],
    bookingDate: '2023-10-01',
    origin: 'Shanghai',
    destination: 'Los Angeles',
    createTime: '2023-09-28 10:00:00'
}));

export const getOrderList = async (): Promise<OrderItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockOrders]);
        }, 500);
    });
};

export const createOrder = async (order: Omit<OrderItem, 'id' | 'createTime'>): Promise<OrderItem> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newOrder: OrderItem = {
                ...order,
                id: `${mockOrders.length + 1}`,
                createTime: new Date().toLocaleString(),
                status: order.status || 'draft'
            };
            mockOrders.unshift(newOrder);
            resolve(newOrder);
        }, 500);
    });
};

export const updateOrder = async (id: string, order: Partial<OrderItem>): Promise<OrderItem> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockOrders.findIndex(o => o.id === id);
            if (index !== -1) {
                mockOrders[index] = { ...mockOrders[index], ...order };
                resolve(mockOrders[index]);
            } else {
                reject(new Error('Order not found'));
            }
        }, 500);
    });
};

export const deleteOrder = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockOrders = mockOrders.filter(o => o.id !== id);
            resolve();
        }, 500);
    });
};
