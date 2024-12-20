/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
}, { _id: false });

const recentOrderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    courier: { type: String },
    warehouse: { type: String },
    estimatedDelivery: { type: String },
}, { _id: false });

const customerSchema = new mongoose.Schema({
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
    color: { type: String, required: true }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
