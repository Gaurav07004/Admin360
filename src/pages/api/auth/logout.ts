import { NextApiRequest, NextApiResponse } from 'next';

const logoutAdmin = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "Logged out successfully" });
};

export default logoutAdmin;
