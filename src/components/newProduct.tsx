/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setProductDrawerStatus, setFiles, setImageUrl, deleteFile, setFormData } from "@/redux/slices/productsSlice";
import { HiArrowLongRight } from "react-icons/hi2";
import { Divider, Button } from "keep-react";
import { Upload, UploadBody, UploadFooter, UploadIcon, UploadText, toast } from 'keep-react';
import { Info, Trash } from 'phosphor-react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { productDrawerStatus, drawerStatus, files, formData } = useSelector((state: RootState) => state.product);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('supplier')) {
            const updatedSupplier = { ...formData.supplier, [name.split('.')[1]]: value };
            dispatch(setFormData({ ...formData, supplier: updatedSupplier }));
        } else {
            dispatch(setFormData({ ...formData, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("Token not received. Redirecting to login.", { position: "top-right" });
            setTimeout(() => router.push("/"), 2000);
            return;
        }

        const isFormValid = Object.values(formData).every(value => {
            if (typeof value === "string") {
                return value.trim() !== "";
            }
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            if (typeof value === "number") {
                return value >= 0;
            }
            if (typeof value === "boolean") {
                return true;
            }
            return true;
        });

        if (!isFormValid) {
            toast.error("Please fill all the required fields.");
            return;
        }

        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

            const updateResponse = await fetch(`${baseURL}/api/auth/newProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (updateResponse.ok) {
                toast.success("Product added successfully.", { position: "top-right" });
                dispatch(deleteFile());
                dispatch(setProductDrawerStatus(!productDrawerStatus))
                window.location.reload()
            } else {
                const errorData = await updateResponse.json();
                toast.error(`Failed to add product: ${errorData.message || "Unknown error"}`, { position: "top-right" });
            }
        } catch (error) {
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
        }
    };

    const headerProductDetail = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-[#263445] p-4 border-b-[0.5px] border-gray-200 dark:border-gray-500">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-[#FF6500] font-bold text-sm uppercase">Add New Product</div>
            </div>
            <div className="flex items-center space-x-2">
                <div
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-500 hover:bg-orange-100 dark:hover:bg-gray-400 rounded-lg transition duration-300"
                    onClick={() => dispatch(setProductDrawerStatus(!productDrawerStatus))}>
                    <HiArrowLongRight className="w-5 h-5 text-gray-500 dark:text-gray-900" />
                </div>
            </div>
        </section>
    );

    const ProductDetailsForm = () => {
        return (
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="space-y-2">
                    <label htmlFor="productID" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Product ID</label>
                    <input
                        type="text"
                        id="productID"
                        name="productID"
                        value={formData.productID}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product ID"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="productName" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product Name"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="category" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Category"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="subcategory" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Subcategory</label>
                    <input
                        type="text"
                        id="subcategory"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Subcategory"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="price" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Price (₹)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Price"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="stockQuantity" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Stock Quantity</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Stock Quantity"
                        required
                    />
                </div>
            </div>
        );
    };

    const SupplierDetailsForm = () => {
        return (
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label htmlFor="supplierName" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Supplier Name</label>
                    <input
                        type="text"
                        id="supplierName"
                        name="supplier.name"
                        value={formData.supplier.name}
                        onChange={handleChange}
                        className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Supplier Name"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="supplierContact" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Supplier Contact</label>
                        <input
                            type="text"
                            id="supplierContact"
                            name="supplier.contact"
                            value={formData.supplier.contact}
                            onChange={handleChange}
                            className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Supplier Contact"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="supplierEmail" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Supplier Email</label>
                        <input
                            type="email"
                            id="supplierEmail"
                            name="supplier.email"
                            value={formData.supplier.email}
                            onChange={handleChange}
                            className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Supplier Email"
                            required
                        />
                    </div>
                </div>
            </div>
        );
    };

    const ProductDescriptionForm = () => {
        return (
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label htmlFor="description" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Product Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 max-h-24 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product Description"
                        rows={4}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="tags" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Product Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags.join(", ")}
                            onChange={(e) => dispatch(setFormData({ ...formData, tags: e.target.value.split(", ") }))}
                            className="w-full p-2  border-2 dark:border border-gray-300 dark:border-gray-500  dark:bg-gray-700  rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Tags"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="previousCount" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Previous Count</label>
                        <input
                            type="number"
                            id="previousCount"
                            name="previousCount"
                            value={formData.previousCount}
                            onChange={handleChange}
                            className="w-full p-2 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Previous Count"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="viewsCount" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Views Count</label>
                        <input
                            type="number"
                            id="viewsCount"
                            name="viewsCount"
                            value={formData.viewsCount}
                            onChange={handleChange}
                            className="w-full p-2 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Views Count"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="purchaseCount" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Purchase Count</label>
                        <input
                            type="number"
                            id="purchaseCount"
                            name="purchaseCount"
                            value={formData.purchaseCount}
                            onChange={handleChange}
                            className="w-full p-2 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Purchase Count"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="wishlistCount" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Wishlist Count</label>
                        <input
                            type="number"
                            id="wishlistCount"
                            name="wishlistCount"
                            value={formData.wishlistCount}
                            onChange={handleChange}
                            className="w-full p-2 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Wishlist Count"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="rating" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full p-2 border-2 dark:border dark:border-gray-500  border-gray-300 dark:bg-gray-700 rounded-[0.4rem] text-gray-500 dark:text-gray-400 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Rating"
                            required
                        />
                    </div>
                </div>
            </div>
        );
    };

    const ProductImageForm = () => {
        const onDrop = useCallback((acceptedFiles: any) => {
            const imageFiles = acceptedFiles.filter((file: File) =>
                file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
            );

            if (imageFiles.length === 0) {
                toast.error('Only JPG/JPEG, PNG, or WEBP files are allowed.');
                return;
            }

            const file = imageFiles[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                if (reader.result) {
                    const dataUrl = reader.result as string
                    dispatch(setFiles([{ name: file.name, dataUrl }]));
                    dispatch(setImageUrl(dataUrl));
                }
            }

            reader.readAsDataURL(file);
        }, [dispatch]);


        const handleDeleteFile = () => {
            dispatch(deleteFile());
        };

        return (
            <Upload options={{ onDrop, multiple: false }} className='border-none p-4 space-y-2 dark:bg-[#263445]'>
                <label htmlFor="productImage" className="text-[0.75rem] font-medium text-gray-600 dark:text-gray-300 uppercase">Product Image</label>
                <UploadBody className="border-dashed border-2 border-gray-300 dark:border-gray-500 rounded-md py-6 text-center cursor-pointer dark:bg-gray-700 hover:dark:bg-gray-700">
                    <UploadIcon className='w-14 h-14'>
                        <IoCloudUploadOutline className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </UploadIcon>
                    <UploadText>
                        <p className="!text-sm font-medium text-metal-600 dark:text-gray-400">
                            <span className="text-[#FF6F20]">Choose File to Upload</span> or Drag & Drop
                        </p>
                        <div>
                            <p className="!text-xs font-normal text-metal-400  dark:text-metal-300">PNG and JPG formats</p>
                            <p className="!text-xs font-normal text-metal-400 dark:text-metal-300">(max. 800x400px)</p>
                        </div>
                    </UploadText>
                </UploadBody>
                <UploadFooter isFileExists={files.length > 0}>
                    <p className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600">
                        <Info size={16} />
                        Uploaded File
                    </p>
                    <ul className="space-y-1">
                        {files.map((file) => (
                            <li
                                key={file.name}
                                className="flex items-center justify-between border-l-4 border-l-[#FF6F20] bg-metal-25 dark:bg-gray-700 dark:text-gray-400 px-4 py-2.5 text-left text-xs font-normal capitalize text-metal-600">
                                <span className='w-[80%]'>{file.name}</span>
                                <div className="p-2 bg-red-100 rounded-md cursor-pointer">
                                    <Trash
                                        size={16}
                                        color="red"
                                        className="cursor-pointer"
                                        onClick={handleDeleteFile}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </UploadFooter>
            </Upload>
        );
    };

    const footerProductDetail = () => <section className="sticky bottom-0 z-10 bg-white dark:bg-[#263445] w-full h-7"></section>;

    return (
        <>
            {productDrawerStatus && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-20 z-10" />}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 ${drawerStatus === true ? 'right-0' : 'right-3'} w-full max-w-[30rem] rounded-xl bg-white dark:bg-[#263445] shadow-md text-black transform overflow-auto ${productDrawerStatus ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {headerProductDetail()}
                <div className="overflow-auto">
                    {ProductDetailsForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {SupplierDetailsForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {ProductDescriptionForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {ProductImageForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    <div className='flex items-center justify-between w-full p-4'>
                        <Button onClick={() => dispatch(setProductDrawerStatus(false))} className="w-[55%] py-3 px-6 rounded-[0.6rem] border bg-white dark:bg-[#263445] border-[#FF6F20] text-[#FF6F20] hover:bg-white hover:dark:bg-[#263445] hover:text-[#FF6F20] transition duration-200 ease-in-out focus:outline-none">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="w-[40%] py-4 px-6 bg-[#ff660021] text-[#FF6500] hover:bg-[#ff660021] transition duration-200 ease-in-out focus:outline-none">
                            Save Product
                        </Button>
                    </div>
                </div>
                {footerProductDetail()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
