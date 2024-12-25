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
    timeRange: { type: String, required: true },
    productView: { type: Number, required: true },
    addToCart: { type: Number, required: true },
    checkout: { type: Number, required: true },
    purchase: { type: Number, required: true },

});

const SalesCategory = mongoose.model("SalesCategory", unifiedSchema);

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

    // { name: "Dell Inspiron 15 Laptop", value: "₹50000", sold: 917, productImage: "productImage" },
    // { name: "Targus Laptop Sleeve", value: "₹800", sold: 804, productImage: "productImage" },
    // { name: "Apple iPhone 15", value: "₹80000", sold: 738, productImage: "productImage" },
    // { name: "Samsung Galaxy Watch 5", value: "₹8000", sold: 684, productImage: "productImage" },

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

    { timeRange: "06:00 AM", productView: 50000, addToCart: 49000, checkout: 48000, purchase: 47000 },
    { timeRange: "07:00 AM", productView: 50000, addToCart: 49500, checkout: 49000, purchase: 48000 },
    { timeRange: "08:00 AM", productView: 50000, addToCart: 50500, checkout: 49500, purchase: 49000 },
    { timeRange: "09:00 AM", productView: 70000, addToCart: 71000, checkout: 70500, purchase: 70000 },
    { timeRange: "10:00 AM", productView: 65000, addToCart: 66000, checkout: 64000, purchase: 63000 },
    { timeRange: "11:00 AM", productView: 90000, addToCart: 91000, checkout: 89500, purchase: 88000 },
    { timeRange: "12:00 PM", productView: 60000, addToCart: 61500, checkout: 59500, purchase: 58000 },
    { timeRange: "01:00 PM", productView: 55000, addToCart: 56500, checkout: 54000, purchase: 52000 },
    { timeRange: "02:00 PM", productView: 30000, addToCart: 31000, checkout: 29500, purchase: 28500 },
    { timeRange: "03:00 PM", productView: 65000, addToCart: 66000, checkout: 64000, purchase: 62000 },
    { timeRange: "04:00 PM", productView: 75000, addToCart: 76000, checkout: 74000, purchase: 72000 },
    { timeRange: "05:00 PM", productView: 95000, addToCart: 96500, checkout: 93500, purchase: 91000 },
    { timeRange: "06:00 PM", productView: 90000, addToCart: 92000, checkout: 88000, purchase: 86000 },
    { timeRange: "07:00 PM", productView: 85000, addToCart: 86000, checkout: 84000, purchase: 82000 },
    { timeRange: "08:00 PM", productView: 55000, addToCart: 56000, checkout: 53000, purchase: 51000 },
    { timeRange: "09:00 PM", productView: 50000, addToCart: 51500, checkout: 48500, purchase: 47500 },
    { timeRange: "10:00 PM", productView: 70000, addToCart: 71000, checkout: 69000, purchase: 67000 },
    { timeRange: "11:00 PM", productView: 70000, addToCart: 71000, checkout: 69000, purchase: 67000 },
    { timeRange: "12:00 AM", productView: 79000, addToCart: 80000, checkout: 78000, purchase: 76000 },
    { timeRange: "01:00 AM", productView: 70000, addToCart: 70500, checkout: 69500, purchase: 67500 },
    { timeRange: "02:00 AM", productView: 77000, addToCart: 78000, checkout: 76000, purchase: 74000 },
    { timeRange: "03:00 AM", productView: 85000, addToCart: 85500, checkout: 84000, purchase: 82000 },
    { timeRange: "04:00 AM", productView: 90000, addToCart: 91000, checkout: 89000, purchase: 87000 },
    { timeRange: "05:00 AM", productView: 82000, addToCart: 82500, checkout: 81000, purchase: 79500 },
];

async function insertData() {
    try {
        await SalesCategory.insertMany(unifiedData);
        console.log("Data inserted successfully into a single collection");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.disconnect();
    }
}


