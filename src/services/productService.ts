import Product from '@/models/Product';
import ProductStat from '@/models/subModels/ProductStat';

export const fetchProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};

export const fetchProductStats = async () => {
    try {
        const productStats = await ProductStat.find();
        return productStats;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};
