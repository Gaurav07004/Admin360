import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import { fetchMonthlyOrdersData } from '@/services/orderService';

const ordersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const orders = await fetchOrders();
        const MonthlyOrders = await fetchMonthlyOrdersData();

        res.status(200).json({
            MonthlyOrders,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching orders', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => ordersHandler(req, res));
};

export default apiRoute;
