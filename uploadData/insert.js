/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");
require('dotenv').config();

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
});

const Customer = mongoose.model("Customer", unifiedSchema);

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

