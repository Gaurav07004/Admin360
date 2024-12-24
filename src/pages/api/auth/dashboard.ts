import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import LineChart from '@/models/subModels/LineChart';
import PieChart from '@/models/subModels/PieChart';
import TopProduct from '@/models/subModels/TopOrder';
import CustomerTraffic from '@/models/subModels/CustomerTraffic'

const dashboardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const lineChartData = await LineChart.find();
        const pieChartData = await PieChart.find();
        const topProductData = await TopProduct.find();
        const CustomerTrafficData = await CustomerTraffic.find();

        res.status(200).json({
            admin: req.admin,
            lineChartData,
            pieChartData,
            topProductData,
            CustomerTrafficData
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
