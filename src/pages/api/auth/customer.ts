import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import Customer from '@/models/Customer';

const customersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const customers = await Customer.find().limit(3);
        res.status(200).json(customers);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching customers', error: errorMessage });
        console.error("Error fetching customers:", error);
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => {
        if (res.writableEnded) return;
        customersHandler(req, res);
    });
};

export default apiRoute;
