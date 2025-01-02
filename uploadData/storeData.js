/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const fs = require('fs');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
});

const DataSchema = new mongoose.Schema({
    productID: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    stockStatus: { type: String, required: true },
    supplier: { type: supplierSchema, required: true },
    previousCount: { type: Number, required: true },
    viewsCount: { type: Number, required: true },
    purchaseCount: { type: Number, required: true },
    wishlistCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    lastUpdatedBy: { type: String, required: true },
    lastUpdatedAt: { type: Date, default: Date.now },
    productImage: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
});

const DataModel = mongoose.model('products', DataSchema);

async function fetchAndSaveData() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://gauravsingh07004:dyawSUbB9vtfAXnP@admin.ks9jn.mongodb.net/AdminDB?retryWrites=true&w=majority&appName=Admin');
        console.log('Connected to MongoDB');

        // Fetch data from MongoDB, you can use filters if needed
        const data = await DataModel.find(); // You can add filters here like { category: 'electronics' }

        // Check if data is empty
        if (data.length === 0) {
            console.log('No data found in the collection.');
            return;
        }

        // Optionally remove internal Mongoose properties before writing to JSON
        const plainData = data.map(doc => doc.toObject());

        // Create a JSON file and store the data
        const filePath = './outputData.json';
        fs.writeFileSync(filePath, JSON.stringify(plainData, null, 2));  // Beautify the JSON with 2-space indentation

        console.log(`Data has been saved to ${filePath}`);

        // Close MongoDB connection
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error fetching and saving data:', error);
    }
}

// Call the function to fetch and save data
fetchAndSaveData();
