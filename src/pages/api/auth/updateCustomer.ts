import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/utils/dbConnect";
import authenticateMiddleware from '@/middleware/authMiddleware';
import Customer from '@/models/Customer';

const UpdateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { customerID, customerStatus } = req.body;

    if (!customerID || !customerStatus) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await connectDB();

        const admin = await Customer.findOne({ customerID });

        if (!admin) {
            return res.status(403).json({ message: 'Forbidden: Admin not found' });
        }

        const existingCustomer = await Customer.findOne({ customerID });
        if (existingCustomer && existingCustomer.customerID !== customerID) {
            return res.status(400).json({ message: 'Email is already in use by another admin' });
        }

        admin.customerID = customerID;
        admin.customerStatus = customerStatus;

        await admin.save();
        return res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => UpdateAccount(req, res));
};

export default apiRoute;
