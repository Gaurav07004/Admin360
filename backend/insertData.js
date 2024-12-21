/* eslint-disable @typescript-eslint/no-var-requires */

// const mongoose = require('mongoose');
// const Order = require('../backend/models/Order');
// const json = require('./jsonFlies.json');
// require('dotenv').config();

const MONGO_URI = `mongodb+srv://gauravsingh07004:dyawSUbB9vtfAXnP@admin.ks9jn.mongodb.net/AdminDB?retryWrites=true&w=majority&appName=Admin`

// mongoose.connect(MONGO_URI || "").then(() => {
//     console.log('MongoDB connected');
//     insertData();
// }).catch((err) => console.log('MongoDB connection failed:', err));

// const insertData = async () => {
//     try {
//         await Order.insertMany(json);
//         console.log('Customer data inserted successfully!');
//         mongoose.connection.close();
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         mongoose.connection.close();
//     }
// };

const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(MONGO_URI || "").then(() => {
    console.log('MongoDB connected');
    insertData();
}).catch((err) => console.log('MongoDB connection failed:', err));

const unifiedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    sold: { type: Number, required: true },
    productImage: { type: String, required: true },
    // checkoutvalue: { type: Number, required: true },
    // purchasevalue: { type: Number, required: true },

});

const TopOrder = mongoose.model("TopOrder", unifiedSchema);

const unifiedData = [
    // { name: "Feb'24", value: 500000 },
    // { name: "Jan'24", value: 500000 },
    // { name: "Mar'24", value: 500000 },
    // { name: "Apr'24", value: 700000 },
    // { name: "May'24", value: 650000 },
    // { name: "Jun'24", value: 900000 },
    // { name: "Jul'24", value: 600000 },
    // { name: "Aug'24", value: 550000 },
    // { name: "Sep'24", value: 300000 },
    // { name: "Oct'24", value: 600000 },
    // { name: "Nov'24", value: 650000 },
    // { name: "Dec'24", value: 750000 },

    // { name: "Laptops", value: 2500 },
    // { name: "Smartphones", value: 1200 },
    // { name: "Tablets", value: 1350 },
    // { name: "Headphones", value: 1500 },

    { name: "Dell Inspiron 15 Laptop", value: "₹50000", sold: 917, productImage: "productImage" },
    { name: "Targus Laptop Sleeve", value: "₹800", sold: 804, productImage: "productImage" },
    { name: "Apple iPhone 15", value: "₹80000", sold: 738, productImage: "productImage" },
    { name: "Samsung Galaxy Watch 5", value: "₹8000", sold: 684, productImage: "productImage" },

    // { Female: 50, Male: 48 },
    // { Female: 85, Male: 80 },
    // { Female: 78, Male: 65 },
    // { Female: 85, Male: 78 },
    // { Female: 55, Male: 85 },
    // { Female: 45, Male: 40 },
    // { Female: 90, Male: 80 },
    // { Female: 50, Male: 55 },
    // { Female: 45, Male: 60 },
    // { Female: 88, Male: 70 },
    // { Female: 30, Male: 25 },
    // { Female: 85, Male: 75 },
    // { Female: 70, Male: 48 },
    // { Female: 80, Male: 55 },
    // { Female: 75, Male: 68 },
    // { Female: 50, Male: 55 },
    // { Female: 65, Male: 50 },
    // { Female: 48, Male: 52 },
    // { Female: 25, Male: 48 },
    // { Female: 85, Male: 55 },
    // { Female: 65, Male: 50 },
    // { Female: 35, Male: 40 },
    // { Female: 25, Male: 30 },
    // { Female: 20, Male: 25 },
    // { Female: 15, Male: 20 },

    // { month: "January", sold: 150, returned: 50 },
    // { month: "February", sold: 180, returned: 60 },
    // { month: "March", sold: 130, returned: 75 },
    // { month: "April", sold: 200, returned: 85 },
    // { month: "May", sold: 170, returned: 65 },
    // { month: "June", sold: 210, returned: 70 },
    // { month: "July", sold: 190, returned: 80 },
    // { month: "August", sold: 220, returned: 75 },
    // { month: "September", sold: 160, returned: 90 },
    // { month: "October", sold: 200, returned: 65 },
    // { month: "November", sold: 210, returned: 55 },
    // { month: "December", sold: 230, returned: 50 },

    // { month: "January", OrderRunning: 100, OnProcess: 70 },
    // { month: "February", OrderRunning: 160, OnProcess: 120 },
    // { month: "March", OrderRunning: 130, OnProcess: 90 },
    // { month: "April", OrderRunning: 70, OnProcess: 190 },
    // { month: "May", OrderRunning: 110, OnProcess: 150 },
    // { month: "June", OrderRunning: 140, OnProcess: 100 },
    // { month: "July", OrderRunning: 170, OnProcess: 130 },
    // { month: "August", OrderRunning: 120, OnProcess: 160 },
    // { month: "September", OrderRunning: 160, OnProcess: 110 },
    // { month: "October", OrderRunning: 130, OnProcess: 180 },
    // { month: "November", OrderRunning: 110, OnProcess: 130 },
    // { month: "December", OrderRunning: 150, OnProcess: 110 },

    // { timeRange: "06:00 AM", productViewvalue: 50000, addToCartvalue: 49000, checkoutvalue: 48000, purchasevalue: 47000 },
    // { timeRange: "07:00 AM", productViewvalue: 50000, addToCartvalue: 49500, checkoutvalue: 49000, purchasevalue: 48000 },
    // { timeRange: "08:00 AM", productViewvalue: 50000, addToCartvalue: 50500, checkoutvalue: 49500, purchasevalue: 49000 },
    // { timeRange: "09:00 AM", productViewvalue: 70000, addToCartvalue: 71000, checkoutvalue: 70500, purchasevalue: 70000 },
    // { timeRange: "10:00 AM", productViewvalue: 65000, addToCartvalue: 66000, checkoutvalue: 64000, purchasevalue: 63000 },
    // { timeRange: "11:00 AM", productViewvalue: 90000, addToCartvalue: 91000, checkoutvalue: 89500, purchasevalue: 88000 },
    // { timeRange: "01:00 PM", productViewvalue: 55000, addToCartvalue: 56500, checkoutvalue: 54000, purchasevalue: 52000 },
    // { timeRange: "02:00 PM", productViewvalue: 30000, addToCartvalue: 31000, checkoutvalue: 29500, purchasevalue: 28500 },
    // { timeRange: "12:00 PM", productViewvalue: 60000, addToCartvalue: 61500, checkoutvalue: 59500, purchasevalue: 58000 },
    // { timeRange: "03:00 PM", productViewvalue: 65000, addToCartvalue: 66000, checkoutvalue: 64000, purchasevalue: 62000 },
    // { timeRange: "04:00 PM", productViewvalue: 75000, addToCartvalue: 76000, checkoutvalue: 74000, purchasevalue: 72000 },
    // { timeRange: "05:00 PM", productViewvalue: 95000, addToCartvalue: 96500, checkoutvalue: 93500, purchasevalue: 91000 },
    // { timeRange: "06:00 PM", productViewvalue: 90000, addToCartvalue: 92000, checkoutvalue: 88000, purchasevalue: 86000 },
    // { timeRange: "07:00 PM", productViewvalue: 85000, addToCartvalue: 86000, checkoutvalue: 84000, purchasevalue: 82000 },
    // { timeRange: "08:00 PM", productViewvalue: 55000, addToCartvalue: 56000, checkoutvalue: 53000, purchasevalue: 51000 },
    // { timeRange: "09:00 PM", productViewvalue: 50000, addToCartvalue: 51500, checkoutvalue: 48500, purchasevalue: 47500 },
    // { timeRange: "10:00 PM", productViewvalue: 70000, addToCartvalue: 71000, checkoutvalue: 69000, purchasevalue: 67000 },
    // { timeRange: "11:00 PM", productViewvalue: 70000, addToCartvalue: 71000, checkoutvalue: 69000, purchasevalue: 67000 },
    // { timeRange: "12:00 AM", productViewvalue: 79000, addToCartvalue: 80000, checkoutvalue: 78000, purchasevalue: 76000 },
    // { timeRange: "01:00 AM", productViewvalue: 70000, addToCartvalue: 70500, checkoutvalue: 69500, purchasevalue: 67500 },
    // { timeRange: "02:00 AM", productViewvalue: 77000, addToCartvalue: 78000, checkoutvalue: 76000, purchasevalue: 74000 },
    // { timeRange: "03:00 AM", productViewvalue: 85000, addToCartvalue: 85500, checkoutvalue: 84000, purchasevalue: 82000 },
    // { timeRange: "04:00 AM", productViewvalue: 90000, addToCartvalue: 91000, checkoutvalue: 89000, purchasevalue: 87000 },
    // { timeRange: "05:00 AM", productViewvalue: 82000, addToCartvalue: 82500, checkoutvalue: 81000, purchasevalue: 79500 },
];

async function insertData() {
    try {
        await TopOrder.insertMany(unifiedData);
        console.log("Data inserted successfully into a single collection");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.disconnect();
    }
}

insertData();


