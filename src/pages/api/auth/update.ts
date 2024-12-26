import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/utils/dbConnect";
import authenticateMiddleware from '@/middleware/authMiddleware';
import Admin from '@/models/Customer';

const UpdateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        console.log('Invalid method received: ', req.method);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { customerID, profileImage } = req.body;

    if (!customerID || !profileImage) {
        console.log('Missing required fields: ', { customerID });
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await connectDB();

        const admin = await Admin.findOne({ customerID });

        if (!admin) {
            return res.status(403).json({ message: 'Forbidden: Admin not found' });
        }

        const existingAdmin = await Admin.findOne({ customerID });
        if (existingAdmin && existingAdmin.customerID !== customerID) {
            return res.status(400).json({ message: 'Email is already in use by another admin' });
        }

        // console.log('Profile Image:', profileImage);
        admin.profileImage = profileImage;

        await admin.save();
        return res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error during update: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => UpdateAccount(req, res));
};

export default apiRoute;
