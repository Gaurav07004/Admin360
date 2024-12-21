import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IVisit {
    name: string;
    price: number;
}

interface IRecentOrder {
    title: string;
    date: string;
    time: string;
    description: string;
    status: string;
    courier?: string;
    warehouse?: string;
    estimatedDelivery?: string;
}

export interface ICustomer extends Document {
    customerID: string;
    customerName: string;
    email: string;
    location: string;
    mobileNumber: number;
    dateJoined: string;
    customerStatus: string;
    order: number;
    delivered: number;
    cancelled: number;
    pending: number;
    visit: IVisit[];
    Recent_Orders: IRecentOrder[];
    color: string;

}

const visitSchema = new Schema<IVisit>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const recentOrderSchema = new Schema<IRecentOrder>(
    {
        title: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        courier: { type: String },
        warehouse: { type: String },
        estimatedDelivery: { type: String },
    },
    { _id: false }
);

const customerSchema = new Schema<ICustomer>(
    {
        customerID: { type: String, required: true },
        customerName: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: true },
        mobileNumber: { type: Number, required: true },
        dateJoined: { type: String, required: true },
        customerStatus: { type: String, required: true },
        order: { type: Number, required: true },
        delivered: { type: Number, required: true },
        cancelled: { type: Number, required: true },
        pending: { type: Number, required: true },
        visit: [visitSchema],
        Recent_Orders: [recentOrderSchema],
        color: { type: String, required: true },
    },
);

const Customer: Model<ICustomer> = mongoose.models.Customer || model<ICustomer>('Customer', customerSchema);

export default Customer;
