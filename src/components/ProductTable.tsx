'use client';

import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineLight } from 'react-icons/pi';
import { RootState } from '../redux/store';
import { setSelectedProduct, setDrawerStatus } from '../redux/slices/productsSlice';
import TableComponent from './table';

// interface Product {
//     id: number;
//     productID: string;
//     productName: string;
//     category: string;
//     price: number;
//     stockStatus: 'Available' | 'Out of Stock' | 'Low Stock';
//     stockQuantity: number;
// }

const columns = [
    { id: 'productID', label: 'Product ID' },
    { id: 'productName', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'subcategory', label: 'Sub Category' },
    { id: 'price', label: 'Product Price' },
    { id: 'stockStatus', label: 'Stock Status' },
    { id: 'stockQuantity', label: 'Quantity' },
    { id: 'purchaseCount', label: 'Total Purchase' },
    { id: 'action', label: 'Action' },
];

const getBadgeColor = (status: string) => {
    switch (status) {
        case 'Available': return 'success';
        case 'Out of Stock': return 'error';
        case 'Low Stock': return 'warning';
        default: return 'primary';
    }
};

const ProductTable = () => {
    const dispatch = useDispatch();
    const { products, drawerStatus } = useSelector((state: RootState) => state.product);

    // const handleProductMenuClick = (productID: string, status: 'Available' | 'Out of Stock' | 'Low Stock') => {
    //     try {
    //         const newStatus = (() => {
    //             switch (status) {
    //                 case 'Available':
    //                     return 'Low Stock';
    //                 case 'Low Stock':
    //                     return 'Out of Stock';
    //                 case 'Out of Stock':
    //                     return 'Available';
    //                 default:
    //                     return 'Available';
    //             }
    //         })();

    //         if (newStatus !== status) {
    //             dispatch(updateProductStatus({ productID, status: newStatus }));
    //             toast.success(`Product ID ${productID} status changed to ${newStatus}.`);
    //         } else {
    //             toast.info(`Product ID ${productID} is already in the ${status} state.`);
    //         }
    //     } catch (error) {
    //         toast.error('Failed to update product status.');
    //     }
    // };

    const handleProduct = (productID: string) => {
        const selectedProduct = products.find((product) => product.productID === productID);
        if (selectedProduct) {
            dispatch(setSelectedProduct(selectedProduct));
            dispatch(setDrawerStatus(!drawerStatus));
        }
    };

    // const handleStockChange = (id: number, stockQuantity: number) => {
    //     const newStock = stockQuantity > 0 ? stockQuantity - 1 : stockQuantity;
    //     dispatch(updateProductStock({ id, stockQuantity: newStock }));
    //     toast.success(`Stock updated for Product ID ${id}. New stock: ${newStock}`);
    // };

    const data = products.map((product) => ({
        productID: product.productID,
        productName: product.productName,
        productImage: product.productImage,
        category: product.category,
        subcategory: product.subcategory,
        price: product.price,
        stockStatus: product.stockStatus,
        stockQuantity: product.stockQuantity,
        purchaseCount: product.purchaseCount,
        action: (
            <div>
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleProduct(product.productID)}
                />
            </div>
        ),
    }));


    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Product Information"
            getBadgeColor={getBadgeColor}
        />
    );
};

export default ProductTable;
