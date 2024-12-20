/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// RecentOrder Schema
const recentOrderSchema = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true }
});

// Order Schema
const orderSchema = new Schema({
    orderID: { type: String, required: true },
    orderDate: { type: String, required: true },
    customerName: { type: String, required: true },
    orderStatus: { type: String, required: true },
    cost: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    trackingNumber: { type: String, required: false, default: null },
    customerPhone: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String, required: true },
    courier: { type: String, required: true },
    Recent_Orders: { type: [recentOrderSchema], required: true }
});

// Order Model
const OrderModel = model('Order', orderSchema);

module.exports = OrderModel;
