import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'your-default-mongo-uri';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const PORT = process.env.PORT || '5001';
