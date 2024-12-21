import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MongoDB URI is missing');
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

async function connectDB() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI || '');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        throw new Error('MongoDB connection failed');
    }
}

export default connectDB;
