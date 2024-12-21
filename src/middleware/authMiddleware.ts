import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type NextFunction = () => void;

const authenticateMiddleware = (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; email: string };
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export default authenticateMiddleware;
