import Order from '@/models/Order';
import MonthlyData from '@/models/subModels/orderProcess';

export const fetchOrders = async () => {
    try {
        const orders = await Order.find().limit(4);
        return orders;
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};

export const fetchMonthlyOrdersData = async () => {
    try {
        const monthlyData = await MonthlyData.find();
        return monthlyData;
    } catch (error) {
        throw new Error('Failed to fetch monthly orders data');
    }
};
