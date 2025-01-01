import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import salesCategory from '@/models/subModels/SalesCategory';

const dashboardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const salesData = await salesCategory.find().limit(20);

        res.status(200).json(salesData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching data', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => dashboardHandler(req, res));
};

export default apiRoute;
