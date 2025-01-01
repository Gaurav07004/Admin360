import { NextApiRequest, NextApiResponse } from 'next';
import authenticateMiddleware from '@/middleware/authMiddleware';
import { fetchProducts } from '@/services/productService';

const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products = await fetchProducts();
        // const ProductStats = await fetchProductStats();
        res.status(200).json({ products });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: 'Error fetching products', error: errorMessage });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    authenticateMiddleware(req, res, () => productsHandler(req, res));
};

export default apiRoute;
