"use client";

import React, { useEffect } from "react";
import { RootState } from "../redux/store";
import { Divider } from 'keep-react';
import Image from "next/image";
import logo from "../Assets/Logo.png";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu, setActiveSubMenu } from "../redux/slices/menuSlice";
import profilePic from "../Assets/Profile.jpg";
import classNames from "classnames";
import { PiBoundingBoxLight, PiShoppingCartSimpleLight, PiChartLineUpLight, PiCubeLight, PiUsersThreeLight, PiTruckLight } from "react-icons/pi";
import { CiSettings, CiLogout } from "react-icons/ci";

const Sidebar: React.FC = () => {
    const { activeMenu } = useSelector((state: RootState) => state.menu);
    const { imageUrl } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedMenu = localStorage.getItem("activeMenu");
        if (storedMenu) {
            dispatch(setActiveMenu(storedMenu));
        }
    }, [dispatch]);

    const handleMenuClick = (menu: string) => {
        dispatch(setActiveMenu(menu));
        dispatch(setActiveSubMenu(null));
    };

    const renderMenuItem = (menu: string, MenuIcon: React.ComponentType<{ className?: string }>, href: string, notification?: string) => (
        <li>
            <Link href={href}>
                <div
                    onClick={() => handleMenuClick(menu)}
                    className={classNames(
                        "p-[0.60rem] w-full text-left rounded-[0.5rem] flex items-center justify-between transition text-[0.85rem] font-medium",
                        {
                            "bg-[#ff66002b] text-[#FF6500] border border-[#FF6500]": activeMenu === menu, // Dark orange active state color
                            "text-[#FF6500]": menu === "Log out",
                            "hover:bg-[#ff66002b] text-black": activeMenu !== menu && menu !== "Log out", // Dark orange hover state color
                        }
                    )}
                    role="button"
                >
                    <section className="flex items-center justify-between">
                        <MenuIcon className="w-5 h-[1.5rem]" />
                        <span className="ml-2">{menu}</span>
                    </section>
                    {notification && (
                        <div className="py-1 px-[0.40rem] text-white bg-[#ff6600c1] rounded-md cursor-pointer">
                            <span className="!size-4">{notification}</span>
                        </div>
                    )}
                </div>
            </Link>
        </li>
    );

    return (
        <nav className="bg-white w-[15rem] h-auto py-4 px-6 rounded-[1rem]">
            <ul className="text-black space-y-2 flex flex-col gap-[0.8rem]">
                <section className="flex flex-col space-y-2">
                    <div className="mb-4">
                        <Image src={logo} alt="logo" width={90} height={50} />
                    </div>
                    <div className="text-xs text-[#7D7C7C]">Menu</div>
                    {renderMenuItem("Dashboard", PiBoundingBoxLight, "/dashboard")}
                    {renderMenuItem("Customers", PiUsersThreeLight, "/customers")}
                    {renderMenuItem("Orders", PiShoppingCartSimpleLight, "/orders", "10")}
                    {renderMenuItem("Products", PiCubeLight, "/products")}
                </section>
                <section className="flex flex-col space-y-2">
                    <div className="text-xs text-[#7D7C7C]">Sales</div>
                    {renderMenuItem("Analytics", PiChartLineUpLight, "/analytics")}
                    {renderMenuItem("Shipments", PiTruckLight, "/sales/shipments")}
                </section>
                <section className="flex flex-col space-y-2">
                    {renderMenuItem("Settings", CiSettings, "/settings")}
                    {renderMenuItem("Log out", CiLogout, "/logout")}
                </section>
                <Divider className="border-t border-gray-300 mx-[-1.5rem] mt-3" />
                <section className="flex items-center space-x-2">
                    <Image
                        src={imageUrl || profilePic}
                        alt="Profile Picture"
                        className="w-10 h-10 object-cover rounded-md shadow-md"
                        width={0}
                        height={0}
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Gaurav Singh</p>
                        <p className="text-xs text-gray-400">Sales Manager</p>
                    </div>
                </section>
            </ul>
        </nav>
    );
};

export default Sidebar;
