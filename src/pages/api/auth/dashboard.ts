import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import unifiedHandler from '@/pages/api/auth/unified';
import Customer from '@/models/Customer';
import Order from '@/models/Order';
import Product from '@/models/Product';

const dashboardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const customers = await Customer.find();
        const orders = await Order.find();
        const products = await Product.find();

        const unifiedData = await unifiedHandler(req, res, true);

        res.status(200).json({
            message: 'Authenticated successfully',
            admin: req.admin,
            customers,
            orders,
            products,
            ...unifiedData,
        });
    } catch (error) {
        console.error('Error fetching data:', error);

        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching data', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => dashboardHandler(req, res));
};

export default apiRoute;
