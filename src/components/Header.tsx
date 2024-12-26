/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
//import { FiSearch } from "react-icons/fi";
import { IoMailOutline, IoCalendarOutline } from "react-icons/io5";
import profilePic from "../Assets/Men.jpg";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TfiLayoutLineSolid } from "react-icons/tfi";

const Header: React.FC = () => {
    const { accountData } = useSelector((state: RootState) => state.user);
    const fullName = `${accountData?.firstName} ${accountData?.lastName}`;

    const currentDate = new Date();

    // Format the date as "September 11. 2024"
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-IN', options);

    return (
        <nav className="flex items-center justify-between py-4 px-6 bg-white rounded-[1rem] w-[100%]">
            <div className="flex flex-col items-start">
                <p className="text-2xl font-semibold text-[#5e6574]">Hello, {accountData?.firstName}</p>
                <p className="text-xs text-gray-400 font-semibold">Track your overall progress here. You're almost there!</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
                    <IoCalendarOutline className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-[0.5rem] left-[1.15rem] w-[0.55rem] h-[0.55rem] bg-red-500 rounded-full border-2 border-white"></span>
                    <span className="text-xs text-gray-500">{formattedDate}</span>
                </div>
                <div className="relative p-2 bg-gray-100 rounded-md border border-gray-300 cursor-pointer">
                    <IoMailOutline className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-[0.5rem] left-[1.35rem] w-[0.55rem] h-[0.55rem] bg-red-500 rounded-full border-2 border-white"></span>
                </div>
                <TfiLayoutLineSolid className="text-xl text-gray-300 rotate-90" />
                <div className="flex items-center space-x-2">
                    <Image
                        src={accountData?.profileImage || profilePic}
                        alt="Profile Picture"
                        className="w-10 h-10 object-cover rounded-md shadow-md"
                        width={0}
                        height={0}
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-600">{fullName}</p>
                        <p className="text-xs text-gray-400">{accountData?.role}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;