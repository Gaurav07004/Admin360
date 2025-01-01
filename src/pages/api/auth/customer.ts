import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import Customer from '@/models/Customer';

const customersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const customers = await Customer.find();

        res.status(200).json(customers);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching customers', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => customersHandler(req, res));
};

export default apiRoute;
