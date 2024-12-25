/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type NextFunction = () => void;

const authenticateMiddleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
            adminID: string;
            name: string;
            email: string;
            role: string;
            iat: number;
            exp: number;
        };
        (req as any).admin = decoded;

        console.log('Decoded admin:', decoded);

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateMiddleware;
