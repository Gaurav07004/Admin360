"use client";

import React, { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDrawerStatus } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { Divider, Button } from "keep-react";
import { Upload, UploadBody, UploadFooter, UploadIcon, UploadText, toast } from 'keep-react';
import { Info, Trash } from 'phosphor-react';
import { IoCloudUploadOutline } from "react-icons/io5";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { productDrawerStatus, drawerStatus } = useSelector((state: RootState) => state.product);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        productID: "",
        productName: "",
        category: "",
        subcategory: "",
        price: 0,
        stockQuantity: 0,
        stockStatus: "Available",
        supplierName: "",
        supplierContact: "",
        supplierEmail: "",
        description: "",
        tags: [],
        rating: 0,
        productImage: "/placeholder.png",
        publishStatus: false,
    });
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product added:", formData);
    };

    const headerProductDetail = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-[#FF6500] font-bold text-sm uppercase">Add New Product</div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 rounded-lg transition duration-300" onClick={() => dispatch(setProductDrawerStatus(!productDrawerStatus))}>
                    <HiArrowLongRight className="w-5 h-5 text-gray-500" />
                </div>
            </div>
        </section>
    );

    const ProductDetailsForm = () => {
        return (
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="space-y-2">
                    <label htmlFor="productID" className="text-[0.75rem] font-medium text-gray-600 uppercase">Product ID</label>
                    <input
                        type="text"
                        id="productID"
                        name="productID"
                        value={formData.productID}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product ID"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="productName" className="text-[0.75rem] font-medium text-gray-600 uppercase">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product Name"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="category" className="text-[0.75rem] font-medium text-gray-600 uppercase">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Category"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="subcategory" className="text-[0.75rem] font-medium text-gray-600 uppercase">Subcategory</label>
                    <input
                        type="text"
                        id="subcategory"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Subcategory"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="price" className="text-[0.75rem] font-medium text-gray-600 uppercase">Price (₹)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Price"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="stockQuantity" className="text-[0.75rem] font-medium text-gray-600 uppercase">Stock Quantity</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
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
                    <label htmlFor="supplierName" className="text-[0.75rem] font-medium text-gray-600 uppercase">Supplier Name</label>
                    <input
                        type="text"
                        id="supplierName"
                        name="supplierName"
                        value={formData.supplierName}
                        onChange={handleChange}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Supplier Name"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="supplierContact" className="text-[0.75rem] font-medium text-gray-600 uppercase">Supplier Contact</label>
                        <input
                            type="text"
                            id="supplierContact"
                            name="supplierContact"
                            value={formData.supplierContact}
                            onChange={handleChange}
                            className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                            placeholder="Enter Supplier Contact"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="supplierEmail" className="text-[0.75rem] font-medium text-gray-600 uppercase">Supplier Email</label>
                        <input
                            type="email"
                            id="supplierEmail"
                            name="supplierEmail"
                            value={formData.supplierEmail}
                            onChange={handleChange}
                            className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
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
                    <label htmlFor="description" className="text-[0.75rem] font-medium text-gray-600 uppercase">Product Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 max-h-24 border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Product Description"
                        rows={4}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tags" className="text-[0.75rem] font-medium text-gray-600 uppercase">Product Tags (comma separated)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags.join(", ")}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(", ") })}
                        className="w-full p-2  border-2 border-gray-300 rounded-[0.4rem] text-gray-500 text-[0.75rem] placeholder:text-[0.75rem] focus:outline-none"
                        placeholder="Enter Tags"
                        required
                    />
                </div>
            </div>
        );
    };

    const ProductImageForm = () => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            const validFiles = acceptedFiles.filter(file => {
                const fileType = file.type;
                return fileType === 'image/png' || fileType === 'image/jpeg';
            });

            if (validFiles.length === 0) {
                toast.error('Only PNG and JPG files are allowed.');
                return;
            }

            const image = new Image();
            image.onload = () => {
                const imageURL = URL.createObjectURL(validFiles[0]);
                setFormData(prev => ({ ...prev, productImage: imageURL }));
                setFiles(validFiles);
            };
            image.src = URL.createObjectURL(validFiles[0]);
        }, []);

        const handleDeleteFile = () => {
            setFormData(prev => ({ ...prev, productImage: "/placeholder.png" }));
            setFiles([]);
        };

        return (
            <Upload options={{ onDrop, multiple: false }} className='border-none p-4 space-y-2'>
                <label htmlFor="productImage" className="text-[0.75rem] font-medium text-gray-600 uppercase">Product Image</label>
                <UploadBody className="border-dashed border-2 border-gray-300 rounded-md py-6 text-center cursor-pointer">
                    <UploadIcon className='w-14 h-14'>
                        <IoCloudUploadOutline className="w-6 h-6 text-gray-500" />
                    </UploadIcon>
                    <UploadText>
                        <p className="!text-sm font-medium text-metal-600 dark:text-white">
                            <span className="text-[#FF6F20]">Choose File to Upload</span> or Drag & Drop
                        </p>
                        <div>
                            <p className="!text-xs font-normal text-metal-400 dark:text-metal-300">PNG and JPG formats</p>
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
                                className="flex items-center justify-between border-l-4 border-l-[#FF6F20] bg-metal-25 px-4 py-2.5 text-left text-xs font-normal capitalize text-metal-600">
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

    const footerProductDetail = () => <section className="sticky bottom-0 z-10 bg-white w-full h-7"></section>;

    return (
        <>
            {productDrawerStatus && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-20 z-10" />}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 ${drawerStatus === true ? 'right-0' : 'right-3'} w-full max-w-[30rem] rounded-xl bg-white shadow-md text-black transform overflow-auto ${productDrawerStatus ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {headerProductDetail()}
                <div className="overflow-auto">
                    {ProductDetailsForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    {SupplierDetailsForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    {ProductDescriptionForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    {ProductImageForm()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    <div className='flex items-center justify-between w-full p-4'>
                        <Button onClick={() => dispatch(setProductDrawerStatus(false))} className="w-[55%] py-3 px-6 rounded-[0.6rem] border bg-white border-[#FF6F20] text-[#FF6F20] hover:bg-white hover:text-[#FF6F20] transition duration-200 ease-in-out focus:outline-none">
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
