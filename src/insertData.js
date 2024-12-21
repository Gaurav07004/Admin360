/* eslint-disable @typescript-eslint/no-var-requires */

const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const json = require('./jsonFlies.json');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || "").then(() => {
    console.log('MongoDB connected');
    insertData();
}).catch((err) => console.log('MongoDB connection failed:', err));

const insertData = async () => {
    try {
        await Admin.insertMany(json);
        console.log('Admin data inserted successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error inserting data:', err);
        mongoose.connection.close();
    }
};

// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI || "").then(() => {
//     console.log('MongoDB connected');
//     insertData();
// }).catch((err) => console.log('MongoDB connection failed:', err));

// const unifiedSchema = new mongoose.Schema({
//     type: String,
//     data: mongoose.Schema.Types.Mixed,
// });

// const UnifiedCollection = mongoose.model("UnifiedCollection", unifiedSchema);

// const unifiedData = [
//     { type: "linedata", data: { name: "Feb'24", price: 500000 } },
//     { type: "linedata", data: { name: "Jan'24", price: 500000 } },
//     { type: "linedata", data: { name: "Mar'24", price: 500000 } },
//     { type: "linedata", data: { name: "Apr'24", price: 700000 } },
//     { type: "linedata", data: { name: "May'24", price: 650000 } },
//     { type: "linedata", data: { name: "Jun'24", price: 900000 } },
//     { type: "linedata", data: { name: "Jul'24", price: 600000 } },
//     { type: "linedata", data: { name: "Aug'24", price: 550000 } },
//     { type: "linedata", data: { name: "Sep'24", price: 300000 } },
//     { type: "linedata", data: { name: "Oct'24", price: 600000 } },
//     { type: "linedata", data: { name: "Nov'24", price: 650000 } },
//     { type: "linedata", data: { name: "Dec'24", price: 750000 } },

//     { type: "pieData", data: { value: 2500, name: "Laptops" } },
//     { type: "pieData", data: { value: 1200, name: "Smartphones" } },
//     { type: "pieData", data: { value: 1350, name: "Tablets" } },
//     { type: "pieData", data: { value: 1500, name: "Headphones" } },

//     { type: "products", data: { name: "Dell Inspiron 15 Laptop", price: "₹50000", sold: "917", ProductImage: "" } },
//     { type: "products", data: { name: "Targus Laptop Sleeve", price: "₹800", sold: "804", ProductImage: "" } },
//     { type: "products", data: { name: "Apple iPhone 15", price: "₹80000", sold: "738", ProductImage: "" } },
//     { type: "products", data: { name: "Samsung Galaxy Watch 5", price: "₹8000", sold: "684", ProductImage: "" } },

//     { type: "genderData", data: { Female: 50, Male: 48 } },
//     { type: "genderData", data: { Female: 85, Male: 80 } },
//     { type: "genderData", data: { Female: 78, Male: 65 } },
//     { type: "genderData", data: { Female: 85, Male: 78 } },
//     { type: "genderData", data: { Female: 55, Male: 85 } },
//     { type: "genderData", data: { Female: 45, Male: 40 } },
//     { type: "genderData", data: { Female: 90, Male: 80 } },
//     { type: "genderData", data: { Female: 50, Male: 55 } },
//     { type: "genderData", data: { Female: 45, Male: 60 } },
//     { type: "genderData", data: { Female: 88, Male: 70 } },
//     { type: "genderData", data: { Female: 30, Male: 25 } },
//     { type: "genderData", data: { Female: 85, Male: 75 } },
//     { type: "genderData", data: { Female: 70, Male: 48 } },
//     { type: "genderData", data: { Female: 80, Male: 55 } },
//     { type: "genderData", data: { Female: 75, Male: 68 } },
//     { type: "genderData", data: { Female: 50, Male: 55 } },
//     { type: "genderData", data: { Female: 65, Male: 50 } },
//     { type: "genderData", data: { Female: 48, Male: 52 } },
//     { type: "genderData", data: { Female: 25, Male: 48 } },
//     { type: "genderData", data: { Female: 85, Male: 55 } },
//     { type: "genderData", data: { Female: 65, Male: 50 } },
//     { type: "genderData", data: { Female: 35, Male: 40 } },
//     { type: "genderData", data: { Female: 25, Male: 30 } },
//     { type: "genderData", data: { Female: 20, Male: 25 } },
//     { type: "genderData", data: { Female: 15, Male: 20 } },

//     { type: "salesData", data: { month: "January", Sold: 150, Returned: 50 } },
//     { type: "salesData", data: { month: "February", Sold: 180, Returned: 60 } },
//     { type: "salesData", data: { month: "March", Sold: 130, Returned: 75 } },
//     { type: "salesData", data: { month: "April", Sold: 200, Returned: 85 } },
//     { type: "salesData", data: { month: "May", Sold: 170, Returned: 65 } },
//     { type: "salesData", data: { month: "June", Sold: 210, Returned: 70 } },
//     { type: "salesData", data: { month: "July", Sold: 190, Returned: 80 } },
//     { type: "salesData", data: { month: "August", Sold: 220, Returned: 75 } },
//     { type: "salesData", data: { month: "September", Sold: 160, Returned: 90 } },
//     { type: "salesData", data: { month: "October", Sold: 200, Returned: 65 } },
//     { type: "salesData", data: { month: "November", Sold: 210, Returned: 55 } },
//     { type: "salesData", data: { month: "December", Sold: 230, Returned: 50 } },

//     { type: "orderData", data: { month: "January", OrderRunning: 100, OnProcess: 70 } },
//     { type: "orderData", data: { month: "February", OrderRunning: 160, OnProcess: 120 } },
//     { type: "orderData", data: { month: "March", OrderRunning: 130, OnProcess: 90 } },
//     { type: "orderData", data: { month: "April", OrderRunning: 70, OnProcess: 190 } },
//     { type: "orderData", data: { month: "May", OrderRunning: 110, OnProcess: 150 } },
//     { type: "orderData", data: { month: "June", OrderRunning: 140, OnProcess: 100 } },
//     { type: "orderData", data: { month: "July", OrderRunning: 170, OnProcess: 130 } },
//     { type: "orderData", data: { month: "August", OrderRunning: 120, OnProcess: 160 } },
//     { type: "orderData", data: { month: "September", OrderRunning: 160, OnProcess: 110 } },
//     { type: "orderData", data: { month: "October", OrderRunning: 130, OnProcess: 180 } },
//     { type: "orderData", data: { month: "November", OrderRunning: 110, OnProcess: 130 } },
//     { type: "orderData", data: { month: "December", OrderRunning: 150, OnProcess: 110 } },

//     { type: "Analysis", data: { timeRange: "06:00 AM", productViewPrice: 50000, addToCartPrice: 49000, checkoutPrice: 48000, purchasePrice: 47000 } },
//     { type: "Analysis", data: { timeRange: "07:00 AM", productViewPrice: 50000, addToCartPrice: 49500, checkoutPrice: 49000, purchasePrice: 48000 } },
//     { type: "Analysis", data: { timeRange: "08:00 AM", productViewPrice: 50000, addToCartPrice: 50500, checkoutPrice: 49500, purchasePrice: 49000 } },
//     { type: "Analysis", data: { timeRange: "09:00 AM", productViewPrice: 70000, addToCartPrice: 71000, checkoutPrice: 70500, purchasePrice: 70000 } },
//     { type: "Analysis", data: { timeRange: "10:00 AM", productViewPrice: 65000, addToCartPrice: 66000, checkoutPrice: 64000, purchasePrice: 63000 } },
//     { type: "Analysis", data: { timeRange: "11:00 AM", productViewPrice: 90000, addToCartPrice: 91000, checkoutPrice: 89500, purchasePrice: 88000 } },
//     { type: "Analysis", data: { timeRange: "01:00 PM", productViewPrice: 55000, addToCartPrice: 56500, checkoutPrice: 54000, purchasePrice: 52000 } },
//     { type: "Analysis", data: { timeRange: "02:00 PM", productViewPrice: 30000, addToCartPrice: 31000, checkoutPrice: 29500, purchasePrice: 28500 } },
//     { type: "Analysis", data: { timeRange: "12:00 PM", productViewPrice: 60000, addToCartPrice: 61500, checkoutPrice: 59500, purchasePrice: 58000 } },
//     { type: "Analysis", data: { timeRange: "03:00 PM", productViewPrice: 65000, addToCartPrice: 66000, checkoutPrice: 64000, purchasePrice: 62000 } },
//     { type: "Analysis", data: { timeRange: "04:00 PM", productViewPrice: 75000, addToCartPrice: 76000, checkoutPrice: 74000, purchasePrice: 72000 } },
//     { type: "Analysis", data: { timeRange: "05:00 PM", productViewPrice: 95000, addToCartPrice: 96500, checkoutPrice: 93500, purchasePrice: 91000 } },
//     { type: "Analysis", data: { timeRange: "06:00 PM", productViewPrice: 90000, addToCartPrice: 92000, checkoutPrice: 88000, purchasePrice: 86000 } },
//     { type: "Analysis", data: { timeRange: "07:00 PM", productViewPrice: 85000, addToCartPrice: 86000, checkoutPrice: 84000, purchasePrice: 82000 } },
//     { type: "Analysis", data: { timeRange: "08:00 PM", productViewPrice: 55000, addToCartPrice: 56000, checkoutPrice: 53000, purchasePrice: 51000 } },
//     { type: "Analysis", data: { timeRange: "09:00 PM", productViewPrice: 50000, addToCartPrice: 51500, checkoutPrice: 48500, purchasePrice: 47500 } },
//     { type: "Analysis", data: { timeRange: "10:00 PM", productViewPrice: 70000, addToCartPrice: 71000, checkoutPrice: 69000, purchasePrice: 67000 } },
//     { type: "Analysis", data: { timeRange: "11:00 PM", productViewPrice: 70000, addToCartPrice: 71000, checkoutPrice: 69000, purchasePrice: 67000 } },
//     { type: "Analysis", data: { timeRange: "12:00 AM", productViewPrice: 79000, addToCartPrice: 80000, checkoutPrice: 78000, purchasePrice: 76000 } },
//     { type: "Analysis", data: { timeRange: "01:00 AM", productViewPrice: 70000, addToCartPrice: 70500, checkoutPrice: 69500, purchasePrice: 67500 } },
//     { type: "Analysis", data: { timeRange: "02:00 AM", productViewPrice: 77000, addToCartPrice: 78000, checkoutPrice: 76000, purchasePrice: 74000 } },
//     { type: "Analysis", data: { timeRange: "03:00 AM", productViewPrice: 85000, addToCartPrice: 85500, checkoutPrice: 84000, purchasePrice: 82000 } },
//     { type: "Analysis", data: { timeRange: "04:00 AM", productViewPrice: 90000, addToCartPrice: 91000, checkoutPrice: 89000, purchasePrice: 87000 } },
//     { type: "Analysis", data: { timeRange: "05:00 AM", productViewPrice: 82000, addToCartPrice: 82500, checkoutPrice: 81000, purchasePrice: 79500 } },
// ];

// async function insertData() {
//     try {
//         await UnifiedCollection.insertMany(unifiedData);
//         console.log("Data inserted successfully into a single collection");
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     } finally {
//         mongoose.disconnect();
//     }
// }

// insertData();


