import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/dbConnect';
import authenticateMiddleware from '@/middleware/authMiddleware';
import ProductModel from '@/models/Product';

const addNewProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {
        productID, productName, category, subcategory, price, stockQuantity, stockStatus, supplier,
        previousCount, viewsCount, purchaseCount, wishlistCount, rating, lastUpdatedBy, productImage, tags, description
    } = req.body;

    const requiredFields = [
        'productID', 'productName', 'category', 'subcategory', 'price', 'stockQuantity',
        'stockStatus', 'supplier', 'previousCount', 'viewsCount', 'purchaseCount',
        'wishlistCount', 'rating', 'lastUpdatedBy', 'productImage', 'tags', 'description'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`,
        });
    }

    try {
        await connectDB();

        const existingProduct = await ProductModel.findOne({ productID });

        if (existingProduct) {
            return res.status(400).json({ message: 'Product ID already exists. Please choose a different one.' });
        }

        const newProduct = new ProductModel({
            productID,
            productName,
            category,
            subcategory,
            price,
            stockQuantity,
            stockStatus,
            supplier,
            previousCount: previousCount || 0,
            viewsCount: viewsCount || 0,
            purchaseCount: purchaseCount || 0,
            wishlistCount: wishlistCount || 0,
            rating: rating || 0,
            lastUpdatedBy,
            productImage,
            tags,
            description,
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: 'Product added successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const apiRoute = (req: NextApiRequest, res: NextApiResponse) => {
    return authenticateMiddleware(req, res, () => addNewProduct(req, res));
};

export default apiRoute;
