/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import profilePic from "../Assets/Men.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { toggleTheme } from '@/redux/slices/commonSlice';
import { PiSunFill, PiMoonFill } from "react-icons/pi";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state: RootState) => state.menu);
    const { accountData } = useSelector((state: RootState) => state.user);
    const fullName = `${accountData?.firstName} ${accountData?.lastName}`;

    const currentDate = new Date();

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-IN', options);

    const handleToggle = () => {
        dispatch(toggleTheme());
        document.documentElement.classList.remove(mode);
        document.documentElement.classList.add(mode === 'light' ? 'dark' : 'light');
        localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className="flex items-center justify-between py-4 px-6 bg-white rounded-[1rem] w-[100%] dark:bg-[#263445]">
            <div className="flex flex-col items-start">
                <p className="text-xl text-gray-600 font-semibold dark:text-gray-300">Welcome, {accountData?.firstName}</p>
                <p className="text-xs text-gray-500 font-medium dark:text-gray-300">Monitor your progress and stay on track towards achieving your goals.</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-500 dark:bg-[#263445]">
                    <IoCalendarOutline className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                    <span className="absolute top-[0.5rem] left-[1.15rem] w-[0.55rem] h-[0.55rem] bg-red-500 rounded-full border-2 border-white"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-300">{formattedDate}</span>
                </div>
                <div
                    onClick={handleToggle}
                    className="relative p-2 bg-gray-50 rounded-md border border-gray-300 dark:border-gray-500 cursor-pointer dark:bg-[#263445]"
                >
                    {mode === "light" ? (
                        <PiSunFill className="w-5 h-5 text-yellow-500 animate-icon" />
                    ) : (
                        <PiMoonFill className="w-5 h-5 text-white animate-icon" />
                    )}
                </div>
                <TfiLayoutLineSolid className="text-xl text-orange-300 rotate-90 dark:text-gray-300" />
                <div className="flex items-center space-x-2">
                    <Image
                        src={accountData?.profileImage || profilePic}
                        alt="Profile Picture"
                        className="w-10 h-10 object-cover rounded-md shadow-md border dark:border-gray-500"
                        width={0}
                        height={0}
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{fullName}</p>
                        <p className="text-xs text-gray-500 font-semibold dark:text-gray-300">{accountData?.role}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;