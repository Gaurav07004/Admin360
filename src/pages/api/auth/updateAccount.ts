import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/utils/dbConnect";
import authenticateMiddleware from '@/middleware/authMiddleware';
import Admin from '@/models/Admin';

const UpdateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { adminID, firstName, lastName, email, role, profileImage } = req.body;

    if (!firstName || !lastName || !email || !adminID) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await connectDB();

        const admin = await Admin.findOne({ adminID });

        if (!admin) {
            return res.status(403).json({ message: 'Forbidden: Admin not found' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin && existingAdmin.adminID !== adminID) {
            return res.status(400).json({ message: 'Email is already in use by another admin' });
        }

        admin.firstName = firstName;
        admin.lastName = lastName;
        admin.email = email;
        admin.role = role;
        admin.profileImage = profileImage;

        await admin.save();
        return res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => UpdateAccount(req, res));
};

export default apiRoute;
