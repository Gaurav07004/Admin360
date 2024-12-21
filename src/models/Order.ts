import mongoose, { Schema, Document, Model, model } from 'mongoose';

interface IRecentOrder {
    title: string;
    status: string;
    date: string;
    time: string;
    description: string;
}

interface IOrder extends Document {
    orderID: string;
    orderDate: string;
    customerName: string;
    orderStatus: string;
    cost: number;
    paymentMethod: string;
    paymentStatus: string;
    deliveryAddress: string;
    trackingNumber?: string;
    customerPhone: string;
    itemName: string;
    itemImage: string;
    courier: string;
    Recent_Orders: IRecentOrder[];
}

const recentOrderSchema = new Schema<IRecentOrder>({
    title: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>({
    orderID: { type: String, required: true },
    orderDate: { type: String, required: true },
    customerName: { type: String, required: true },
    orderStatus: { type: String, required: true },
    cost: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    trackingNumber: { type: String, default: null },
    customerPhone: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String, required: true },
    courier: { type: String, required: true },
    Recent_Orders: { type: [recentOrderSchema], required: true },
});

const OrderModel: Model<IOrder> = mongoose.models.Order || model<IOrder>('Order', orderSchema);

export default OrderModel;
