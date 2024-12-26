import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin'

interface AdminPayload {
    adminID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
}

type NextFunction = () => void;

declare module 'next' {
    interface NextApiRequest {
        admin?: AdminPayload;
    }
}

const authenticateMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as AdminPayload;

        const adminID = decoded.adminID;
        const adminData = await Admin.findOne({ adminID }).select({ password: 0 });

        if (!adminData) {
            return res.status(401).json({ message: "Unauthorized, User not found" });
        }

        req.admin = adminData;

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateMiddleware;
