import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/utils/dbConnect";
import authenticateMiddleware from '@/middleware/authMiddleware';
import Admin from '@/models/Admin';

const UpdateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        console.log('Invalid method received: ', req.method);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { adminID, name, email, role } = req.body;

    // Log request body for debugging
    console.log('Request body: ', { adminID, name, email, role });

    // Check if all required fields are provided
    if (!name || !email) {
        console.log('Missing required fields: ', { name, email });
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Connect to the database
        console.log('Connecting to database...');
        await connectDB();

        // Log the authenticated admin details
        console.log('Authenticated admin details: ', req.admin);

        // Ensure the authenticated user is allowed to update their own account
        if (req.admin?.adminID !== adminID) {
            console.log(`Forbidden: AdminID mismatch. Request AdminID: ${adminID}, Authenticated AdminID: ${req.admin?.adminID}`);
            return res.status(403).json({ message: 'Forbidden: You can only update your own account' });
        }

        // Update the admin record in the database
        console.log('Updating admin record...');
        const result = await Admin.updateOne(
            { adminID },
            { $set: { name, email, role } }
        );

        // Log the result of the database update
        console.log('Database update result: ', result);

        // If no matching admin was found, return a 404 error
        if (result.matchedCount === 0) {
            console.log('Admin not found for adminID: ', adminID);
            return res.status(404).json({ message: 'Admin not found', admin: req.admin });
        }

        // Return success response
        console.log('Admin updated successfully.');
        return res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error during update: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    console.log('API route triggered');
    authenticateMiddleware(req, res, () => UpdateAccount(req, res));
};

export default apiRoute;
