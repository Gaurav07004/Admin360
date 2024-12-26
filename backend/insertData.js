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
// const Admin = require('./models/Admin');

mongoose.connect(MONGO_URI || "").then(() => {
    console.log('MongoDB connected');
    insertData();
}).catch((err) => console.log('MongoDB connection failed:', err));

const unifiedSchema = new mongoose.Schema({
    customerID: { type: String, required: true },
    customerName: { type: String, required: true },
    profileImage: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    dateJoined: { type: String, required: true },
    customerStatus: { type: String, required: true },
    order: { type: Number, required: true },
    delivered: { type: Number, required: true },
    cancelled: { type: Number, required: true },
    pending: { type: Number, required: true },
    visit: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    Recent_Orders: [{
        title: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        courier: { type: String },
        warehouse: { type: String },
        estimatedDelivery: { type: String },
    }],
    color: { type: String, required: true },

});

const Customer = mongoose.model("Customer", unifiedSchema);

const unifiedData = [

    // {
    //     adminID: "AD82913",
    //     email: "gaurav.singh@gmail.com",
    //     password: "Gaurav@82913",
    //     firstName: "Gaurav",
    //     lastName: "Singh",
    //     role: "Admin",
    //     isActive: true,
    //     profileImage: null,
    // }

    {
        id: 1,
        customerID: 'CD82910',
        customerName: "Amit Kumar",
        profileImage: "a",
        email: "amit.kumar@gmail.com",
        location: "Delhi",
        mobileNumber: 9768011433,
        dateJoined: "Jan 15, 2024",
        customerStatus: "Active",
        order: 12,
        delivered: 8,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 123 },
            { name: "Feb", price: 987 },
            { name: "Mar", price: 432 },
            { name: "Apr", price: 234 },
            { name: "May", price: 876 },
            { name: "Jun", price: 543 },
            { name: "Jul", price: 678 },
            { name: "Aug", price: 345 },
        ],
        Recent_Orders: [
            {

                title: "Order Placed",
                date: "2024-12-09",
                time: "10:00",
                description: "Your order has been placed. The items were processed and are ready for shipment.",
                status: "Completed",
            },
            {

                title: "Order Confirmed",
                date: "2024-12-10",
                time: "14:30",
                description: "Your order was confirmed and prepared for shipment.",
                status: "Completed",
            },
            {

                title: "Shipped",
                date: "2024-12-11",
                time: "13:00",
                description: "Your order has been shipped. It left the warehouse and is on its way to you.",
                courier: "XYZ Logistics",
                warehouse: "Warehouse XYZ",
                status: "Completed",
            },
            {

                title: "Out for Delivery",
                date: "2024-12-12",
                time: "09:00",
                description: "Your order was out for delivery and arrived on the scheduled date.",
                estimatedDelivery: "Thu, Dec 12, 2024",
                status: "Completed",
            },
            {

                title: "Delivered",
                date: "2024-12-15",
                time: "14:00",
                description: "Your package was successfully delivered to the provided address.",
                status: "Completed",
            },
        ],
        color: "#698474",
    },
    {
        id: 2,
        customerID: "CD82912",
        customerName: "Priya Sharma",
        profileImage: "a",
        email: "priya.sharma@gmail.com",
        location: "Mumbai",
        mobileNumber: 9768021433,
        dateJoined: "Feb 20, 2024",
        customerStatus: 'Inactive',
        order: 80,
        delivered: 76,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 301 },
            { name: "Feb", price: 654 },
            { name: "Mar", price: 209 },
            { name: "Apr", price: 872 },
            { name: "May", price: 113 },
            { name: "Jun", price: 978 },
            { name: "Jul", price: 432 },
            { name: "Aug", price: 564 },
        ],
        color: "#F05A7E",
    },
    {
        id: 3,
        customerID: "CD82913",
        customerName: "Rajesh Gupta",
        profileImage: "a",
        email: "rajesh.gupta@gmail.com",
        location: "Bangalore",
        mobileNumber: 9768031433,
        dateJoined: "Mar 10, 2024",
        customerStatus: 'Active',
        order: 15,
        delivered: 11,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 789 },
            { name: "Feb", price: 345 },
            { name: "Mar", price: 678 },
            { name: "Apr", price: 987 },
            { name: "May", price: 456 },
            { name: "Jun", price: 123 },
            { name: "Jul", price: 890 },
            { name: "Aug", price: 234 },
        ],
        Recent_Orders: [
            {

                title: "Order Placed",
                date: "2024-12-10",
                time: "10:00",
                description: "Your order has been placed. The items were processed and are ready for shipment.",
                status: "Completed",
            },
            {

                title: "Order Confirmed",
                date: "2024-12-12",
                time: "14:30",
                description: "Your order was confirmed and prepared for shipment.",
                status: "Completed",
            },
            {

                title: "Shipped",
                date: "2024-12-14",
                time: "13:00",
                description: "Your order has been shipped. It left the warehouse and is on its way to you.",
                courier: "XYZ Logistics",
                warehouse: "Warehouse XYZ",
                status: "Completed",
            },
            {

                title: "Out for Delivery",
                date: "2024-12-15",
                time: "09:00",
                description: "Your order was out for delivery and arrived on the scheduled date.",
                estimatedDelivery: "Thu, Dec 12, 2024",
                status: "Completed",
            },
            {

                title: "Delivered",
                date: "2024-12-17",
                time: "17:00",
                description: "Your package was successfully delivered to the provided address.",
                status: "Completed",
            },
        ],
        color: "#219C90",
    },
    {
        id: 4,
        customerID: "CD82914",
        customerName: "Neha Patel",
        profileImage: "a",
        email: "neha.patel@gmail.com",
        location: "Ahmedabad",
        mobileNumber: 9768041433,
        dateJoined: "Apr 5, 2024",
        customerStatus: 'Active',
        order: 10,
        delivered: 8,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 564 },
            { name: "Feb", price: 210 },
            { name: "Mar", price: 789 },
            { name: "Apr", price: 345 },
            { name: "May", price: 678 },
            { name: "Jun", price: 234 },
            { name: "Jul", price: 567 },
            { name: "Aug", price: 890 },
        ],
        Recent_Orders: [
            {

                title: "Order Placed",
                date: "2024-12-01",
                time: "10:00",
                description: "Your order has been placed. The items were processed and are ready for shipment.",
                status: "Completed",
            },
            {

                title: "Order Confirmed",
                date: "2024-12-03",
                time: "14:30",
                description: "Your order was confirmed and prepared for shipment.",
                status: "Completed",
            },
            {

                title: "Shipped",
                date: "2024-12-04",
                time: "13:00",
                description: "Your order has been shipped. It left the warehouse and is on its way to you.",
                courier: "XYZ Logistics",
                warehouse: "Warehouse XYZ",
                status: "Completed",
            },
            {

                title: "Out for Delivery",
                date: "2024-12-05",
                time: "09:00",
                description: "Your order was out for delivery and arrived on the scheduled date.",
                estimatedDelivery: "Thu, Dec 12, 2024",
                status: "Completed",
            },
            {

                title: "Delivered",
                date: "2024-12-06",
                time: "17:00",
                description: "Your package was successfully delivered to the provided address.",
                status: "Completed",
            },
        ],
        color: "#0D1282",
    },
    {
        id: 5,
        customerID: "CD82915",
        customerName: "Sanjay Reddy",
        profileImage: "a",
        email: "sanjay.reddy@gmail.com",
        location: "Hyderabad",
        mobileNumber: 9768051433,
        dateJoined: "May 12, 2024",
        customerStatus: 'Inactive',
        order: 60,
        delivered: 56,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 135 },
            { name: "Feb", price: 678 },
            { name: "Mar", price: 432 },
            { name: "Apr", price: 789 },
            { name: "May", price: 567 },
            { name: "Jun", price: 123 },
            { name: "Jul", price: 345 },
            { name: "Aug", price: 678 },
        ],
        color: "#B31312",
    },
    {
        id: 6,
        customerID: "CD82916",
        customerName: "Ravi Kumar",
        profileImage: "a",
        email: "ravi.kumar@gmail.com",
        location: "Chennai",
        mobileNumber: 9768061433,
        dateJoined: "Jun 22, 2024",
        customerStatus: 'Active',
        order: 18,
        delivered: 14,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 453 },
            { name: "Feb", price: 789 },
            { name: "Mar", price: 234 },
            { name: "Apr", price: 567 },
            { name: "May", price: 890 },
            { name: "Jun", price: 123 },
            { name: "Jul", price: 456 },
            { name: "Aug", price: 789 },
        ],
        Recent_Orders: [
            {

                title: "Order Placed",
                date: "2024-12-15",
                time: "10:00",
                description: "Your order has been placed. The items were processed and are ready for shipment.",
                status: "Completed",
            },
            {

                title: "Order Confirmed",
                date: "2024-12-17",
                time: "14:30",
                description: "Your order was confirmed and prepared for shipment.",
                status: "Completed",
            },
            {

                title: "Shipped",
                date: "2024-12-18",
                time: "13:00",
                description: "Your order has been shipped. It left the warehouse and is on its way to you.",
                courier: "XYZ Logistics",
                warehouse: "Warehouse XYZ",
                status: "Completed",
            },
            {

                title: "Out for Delivery",
                date: "2024-12-19",
                time: "09:00",
                description: "Your order was out for delivery and arrived on the scheduled date.",
                estimatedDelivery: "Thu, Dec 12, 2024",
                status: "Completed",
            },
            {

                title: "Delivered",
                date: "2024-12-20",
                time: "17:00",
                description: "Your package was successfully delivered to the provided address.",
                status: "Completed",
            },
        ],
        color: "#B71375",
    },
    {
        id: 7,
        customerID: "CD82917",
        customerName: "Sonia Verma",
        profileImage: "a",
        email: "sonia.verma@gmail.com",
        location: "Pune",
        mobileNumber: 9768071433,
        dateJoined: "Jul 30, 2024",
        customerStatus: 'Active',
        order: 100,
        delivered: 96,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 289 },
            { name: "Feb", price: 450 },
            { name: "Mar", price: 123 },
            { name: "Apr", price: 678 },
            { name: "May", price: 345 },
            { name: "Jun", price: 890 },
            { name: "Jul", price: 234 },
            { name: "Aug", price: 567 },
        ],
        Recent_Orders: [
            {

                title: "Order Placed",
                date: "2024-12-06",
                time: "10:00",
                description: "Your order has been placed. The items were processed and are ready for shipment.",
                status: "Completed",
            },
            {

                title: "Order Confirmed",
                date: "2024-12-08",
                time: "14:30",
                description: "Your order was confirmed and prepared for shipment.",
                status: "Completed",
            },
            {

                title: "Shipped",
                date: "2024-12-11",
                time: "13:00",
                description: "Your order has been shipped. It left the warehouse and is on its way to you.",
                courier: "XYZ Logistics",
                warehouse: "Warehouse XYZ",
                status: "Completed",
            },
            {

                title: "Out for Delivery",
                date: "2024-12-12",
                time: "09:00",
                description: "Your order was out for delivery and arrived on the scheduled date.",
                estimatedDelivery: "Thu, Dec 12, 2024",
                status: "Completed",
            },
            {

                title: "Delivered",
                date: "2024-12-13",
                time: "17:00",
                description: "Your package was successfully delivered to the provided address.",
                status: "Completed",
            },
        ],
        color: "#EA5455",
    },
    {
        id: 8,
        customerID: "CD82918",
        customerName: "Deepak Mehta",
        profileImage: "a",
        email: "deepak.mehta@gmail.com",
        location: "Jaipur",
        mobileNumber: 9768081433,
        dateJoined: "Aug 18, 2024",
        customerStatus: 'Inactive',
        order: 90,
        delivered: 86,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 321 },
            { name: "Feb", price: 543 },
            { name: "Mar", price: 654 },
            { name: "Apr", price: 789 },
            { name: "May", price: 321 },
            { name: "Jun", price: 654 },
            { name: "Jul", price: 789 },
            { name: "Aug", price: 432 },
        ],
        color: "#424242",
    },
    {
        id: 9,
        customerID: "CD82919",
        customerName: "Sunil Mehta",
        profileImage: "a",
        email: "sunil.mehta@gmail.com",
        location: "Delhi",
        mobileNumber: 9768091433,
        dateJoined: "Jan 18, 2024",
        customerStatus: 'Inactive',
        order: 80,
        delivered: 76,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 360 },
            { name: "Feb", price: 543 },
            { name: "Mar", price: 654 },
            { name: "Apr", price: 589 },
            { name: "May", price: 321 },
            { name: "Jun", price: 614 },
            { name: "Jul", price: 789 },
            { name: "Aug", price: 482 },
        ],
        color: "#009FBD",
    },
    {
        id: 10,
        customerID: "CD82920",
        customerName: "Vivek Sharma",
        profileImage: "a",
        email: "vivek.sharma@gmail.com",
        location: "Mumbai",
        mobileNumber: 9768101433,
        dateJoined: "Mar 14, 2024",
        customerStatus: 'Inactive',
        order: 50,
        delivered: 46,
        cancelled: 2,
        pending: 2,
        visit: [
            { name: "Jan", price: 241 },
            { name: "Feb", price: 543 },
            { name: "Mar", price: 644 },
            { name: "Apr", price: 789 },
            { name: "May", price: 421 },
            { name: "Jun", price: 694 },
            { name: "Jul", price: 489 },
            { name: "Aug", price: 632 },
        ],
        color: "#131842",
    },

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

    // { timeRange: "06:00 AM", productView: 50000, addToCart: 49000, checkout: 48000, purchase: 47000 },
    // { timeRange: "07:00 AM", productView: 50000, addToCart: 49500, checkout: 49000, purchase: 48000 },
    // { timeRange: "08:00 AM", productView: 50000, addToCart: 50500, checkout: 49500, purchase: 49000 },
    // { timeRange: "09:00 AM", productView: 70000, addToCart: 71000, checkout: 70500, purchase: 70000 },
    // { timeRange: "10:00 AM", productView: 65000, addToCart: 66000, checkout: 64000, purchase: 63000 },
    // { timeRange: "11:00 AM", productView: 90000, addToCart: 91000, checkout: 89500, purchase: 88000 },
    // { timeRange: "12:00 PM", productView: 60000, addToCart: 61500, checkout: 59500, purchase: 58000 },
    // { timeRange: "01:00 PM", productView: 55000, addToCart: 56500, checkout: 54000, purchase: 52000 },
    // { timeRange: "02:00 PM", productView: 30000, addToCart: 31000, checkout: 29500, purchase: 28500 },
    // { timeRange: "03:00 PM", productView: 65000, addToCart: 66000, checkout: 64000, purchase: 62000 },
    // { timeRange: "04:00 PM", productView: 75000, addToCart: 76000, checkout: 74000, purchase: 72000 },
    // { timeRange: "05:00 PM", productView: 95000, addToCart: 96500, checkout: 93500, purchase: 91000 },
    // { timeRange: "06:00 PM", productView: 90000, addToCart: 92000, checkout: 88000, purchase: 86000 },
    // { timeRange: "07:00 PM", productView: 85000, addToCart: 86000, checkout: 84000, purchase: 82000 },
    // { timeRange: "08:00 PM", productView: 55000, addToCart: 56000, checkout: 53000, purchase: 51000 },
    // { timeRange: "09:00 PM", productView: 50000, addToCart: 51500, checkout: 48500, purchase: 47500 },
    // { timeRange: "10:00 PM", productView: 70000, addToCart: 71000, checkout: 69000, purchase: 67000 },
    // { timeRange: "11:00 PM", productView: 70000, addToCart: 71000, checkout: 69000, purchase: 67000 },
    // { timeRange: "12:00 AM", productView: 79000, addToCart: 80000, checkout: 78000, purchase: 76000 },
    // { timeRange: "01:00 AM", productView: 70000, addToCart: 70500, checkout: 69500, purchase: 67500 },
    // { timeRange: "02:00 AM", productView: 77000, addToCart: 78000, checkout: 76000, purchase: 74000 },
    // { timeRange: "03:00 AM", productView: 85000, addToCart: 85500, checkout: 84000, purchase: 82000 },
    // { timeRange: "04:00 AM", productView: 90000, addToCart: 91000, checkout: 89000, purchase: 87000 },
    // { timeRange: "05:00 AM", productView: 82000, addToCart: 82500, checkout: 81000, purchase: 79500 },
];

async function insertData() {
    try {
        await Customer.insertMany(unifiedData);
        console.log("Data inserted successfully into a single collection");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.disconnect();
    }
}


