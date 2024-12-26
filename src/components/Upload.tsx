/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Info, Trash } from 'phosphor-react';
import { useCallback } from 'react';
import Image from "next/image";
import { Upload, UploadBody, UploadFooter, UploadIcon, UploadText, toast } from 'keep-react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setFiles, setImageUrl, deleteFile } from '../redux/slices/adminSlice';
import { RootState } from '../redux/store';

const UploadComponent = () => {
    const dispatch = useDispatch();
    const { files, imageUrl, accountData } = useSelector((state: RootState) => state.user);

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
        <section>
            <div className="flex items-center space-x-3">
                <Image
                    src={imageUrl || accountData?.profileImage}
                    alt="Profile Picture"
                    className="w-10 h-10 object-cover rounded-md shadow-md"
                    width={0}
                    height={0}
                />
                <p className="text-sm font-semibold text-gray-600">Edit Profile Image</p>
            </div>
            <Upload options={{ onDrop, multiple: false }} className='border-none pt-6 pb-2 px-0'>
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
                        {files?.map((file) => (
                            <li
                                key={file?.name}
                                className="flex items-center justify-between border-l-4 border-l-[#FF6F20] bg-metal-25 px-4 py-2.5 text-left text-xs font-normal capitalize text-metal-600">
                                <span className='w-[80%]'>{file?.name}</span>
                                <div className="p-2 bg-red-100 rounded-md cursor-pointer">
                                    <Trash
                                        size={16}
                                        color="red"
                                        className="cursor-pointer "
                                        onClick={() => handleDeleteFile()}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </UploadFooter>
            </Upload>
        </section>
    );
}

export default UploadComponent;
