/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");
require('dotenv').config();

MONGO_URI = `mongodb+srv://gauravsingh07004:dyawSUbB9vtfAXnP@admin.ks9jn.mongodb.net/AdminDB?retryWrites=true&w=majority&appName=Admin`

mongoose.connect(MONGO_URI || "").then(() => {
    console.log('MongoDB connected');
    insertData();
}).catch((err) => console.log('MongoDB connection failed:', err));

const unifiedSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profileImage: {
        type: String,
        required: false
    }
});

const LineChart = mongoose.model("LineChart", unifiedSchema);

const unifiedData = [
    {
        adminID: "AD82914",
        email: "singhgaurav7094@gmail.com",
        password: "demo@12345",
        firstName: "Gaurav",
        lastName: "Singh",
        role: "Admin",
        isActive: true,
    }
];

async function insertData() {
    try {
        await LineChart.insertMany(unifiedData);
        console.log("Data inserted successfully into a single collection");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.disconnect();
    }
}

