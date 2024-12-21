import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', serialize('token', '', { path: '/', maxAge: -1 }));

        return res.status(200).json({ message: 'Logged out successfully' });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
