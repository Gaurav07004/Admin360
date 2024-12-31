// /* eslint-disable @typescript-eslint/no-var-requires */
// const mongoose = require("mongoose");
// require('dotenv').config();

// MONGO_URI = `mongodb+srv://gauravsingh07004:dyawSUbB9vtfAXnP@admin.ks9jn.mongodb.net/AdminDB?retryWrites=true&w=majority&appName=Admin`

// mongoose.connect(MONGO_URI || "").then(() => {
//     console.log('MongoDB connected');
//     insertData();
// }).catch((err) => console.log('MongoDB connection failed:', err));

// const unifiedSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     value: { type: Number, required: true },
// });

// const LineChart = mongoose.model("LineChart", unifiedSchema);

// const unifiedData = [
//     { name: "Jan", value: 50000 },
//     { name: "Feb", value: 60000 },
//     { name: "Mar", value: 50000 },
//     { name: "Apr", value: 70000 },
//     { name: "May", value: 65000 },
//     { name: "Jun", value: 90000 },
//     { name: "Jul", value: 60000 },
//     { name: "Aug", value: 55000 },
//     { name: "Sep", value: 30000 },
//     { name: "Oct", value: 60000 },
//     { name: "Nov", value: 65000 },
//     { name: "Dec", value: 75000 }
// ];

// async function insertData() {
//     try {
//         await LineChart.insertMany(unifiedData);
//         console.log("Data inserted successfully into a single collection");
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     } finally {
//         mongoose.disconnect();
//     }
// }

