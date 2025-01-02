import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/utils/dbConnect";
import authenticateMiddleware from '@/middleware/authMiddleware';
import Customer from '@/models/Customer';

const UpdateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { customerID, customerStatus } = req.body;
    console.log('Request body:', { customerID, customerStatus });

    if (!customerID || !customerStatus) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await connectDB();

        const customer = await Customer.findOne({ customerID });
        console.log('Customer found:', customer);

        if (!customer) {
            return res.status(403).json({ message: 'Forbidden: customer not found' });
        }

        customer.customerStatus = customerStatus;
        await customer.save();
        console.log('Customer status updated:', customer);

        return res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => UpdateAccount(req, res));
};

export default apiRoute;
