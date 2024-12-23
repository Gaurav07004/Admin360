import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import { fetchCustomers } from '@/services/customerService';

const customersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const customers = await fetchCustomers();

        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching customers', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => customersHandler(req, res));
};

export default apiRoute;
