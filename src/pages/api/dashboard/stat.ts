import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbConnect';
import Unified from '@/models/Unified';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const userCount = await Unified.countDocuments();
        const stats = { userCount };

        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
