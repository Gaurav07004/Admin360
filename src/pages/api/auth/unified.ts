import { NextApiRequest, NextApiResponse } from 'next';
import LineChart from '@/models/subModels/LineChart';
import PieChart from '@/models/subModels/PieChart';
import TopProduct from '@/models/subModels/TopOrder';
import CustomerTraffic from '@/models/subModels/CustomerTraffic'

const unifiedHandler = async (req: NextApiRequest, res: NextApiResponse, returnRawData = false) => {
    try {
        const lineChartData = await LineChart.find();
        const pieChartData = await PieChart.find();
        const topProductData = await TopProduct.find();
        const CustomerTrafficData = await CustomerTraffic.find();

        const unifiedData = {
            lineChart: lineChartData,
            pieChart: pieChartData,
            topProducts: topProductData,
            customerTraffic: CustomerTrafficData,
        };

        if (returnRawData) {
            return unifiedData;
        }

        res.status(200).json({
            message: 'Authenticated successfully',
            data: unifiedData,
        });

    } catch (error) {
        console.error('Error fetching data:', error);

        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching data', error: errorMessage });
    }
};

export default unifiedHandler;
