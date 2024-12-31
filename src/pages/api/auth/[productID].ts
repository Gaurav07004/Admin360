import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/dbConnect';
import authenticateMiddleware from '@/middleware/authMiddleware';
import ProductModel from '@/models/Product';

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { productID } = req.query;

    if (!productID) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await connectDB();

        const product = await ProductModel.findOne({ productID });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await ProductModel.deleteOne({ productID });

        return res.status(200).json({
            message: 'Product deleted successfully',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    return authenticateMiddleware(req, res, () => deleteProduct(req, res));
};

export default apiRoute;
