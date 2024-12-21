import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import Customer from '@/models/Customer';
import Order from '@/models/Order';
import Product from '@/models/Product';
import UnifiedCollection from '@/models/Unified';

const dashboardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const customers = await Customer.find();
        // const orders = await Order.find();
        // const products = await Product.find();
        const dashboards = await UnifiedCollection.find().limit(10).skip(20);

        // console.log('Fetched data:', { customers, orders, products, dashboards });
        res.status(200).json({
            message: 'Authenticated successfully',
            admin: req.admin,
            // customers,
            // orders,
            // products,
            dashboards,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => dashboardHandler(req, res));
};

export default apiRoute;
