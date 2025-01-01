import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    console.error('MongoDB URI is missing');
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('MongoDB connection failed');
    }
}

export default connectDB;
