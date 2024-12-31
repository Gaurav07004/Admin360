import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MongoDB URI is missing');
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI || '');
    } catch (error) {
        throw new Error('MongoDB connection failed');
    }
}

export default connectDB;
