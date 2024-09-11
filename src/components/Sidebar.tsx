"use client";

import React from "react";
import { RootState } from "../redux/store";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu, setActiveSubMenu } from "../redux/slices/menuSlice";
import classNames from "classnames";
import { PiBoundingBoxLight, PiShoppingCartSimpleLight, PiChartLineUpLight, PiCubeLight, PiUsersThreeLight, PiBasketLight, PiTruckLight } from "react-icons/pi";
import { CiSettings, CiLogout } from "react-icons/ci";
import logo from "../Assets/Logo.png";

const Sidebar: React.FC = () => {
    const { activeMenu } = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();

    const handleMenuClick = (menu: string) => {
        dispatch(setActiveMenu(menu));
        dispatch(setActiveSubMenu(null));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderMenuItem = (menu: string, MenuIcon: any, href: string, notification?: string) => (
        <li>
            <Link href={href}>
                <div
                    onClick={() => handleMenuClick(menu)}
                    className={classNames("p-[0.60rem] w-full text-left rounded flex items-center justify-between transition text-[0.85rem] font-medium", {
                        "bg-[#698474] text-[#ECEFF1]": activeMenu === menu,
                        "text-red-700": menu === "Log out",
                        "hover:bg-[#69847482] hover:text-white": activeMenu !== menu && menu !== "Log out",
                    })}
                    role="button"
                >
                    <section className="flex items-center justify-between">
                        <MenuIcon className="w-5 h-[1.5rem]" />
                        <span className="ml-2">{menu}</span>
                    </section>
                    {notification && <span className="!size-6 text-white bg-[#698474] rounded-full flex items-center justify-center">{notification}</span>}
                </div>
            </Link>
        </li>
    );

    return (
        <nav className="bg-white w-[15rem] h-auto p-5 rounded-[1rem]">
            <ul className="text-black space-y-2 flex flex-col gap-[1.45rem]">
                <section className="flex flex-col space-y-2">
                    <Image className="mb-4" src={logo} alt="logo" width={90} height={50} />
                    <div className="text-xs text-[#7D7C7C]">Menu</div>
                    {renderMenuItem("Dashboard", PiBoundingBoxLight, "/dashboard")}
                    {renderMenuItem("Customers", PiUsersThreeLight, "/customers")}
                    {renderMenuItem("Orders", PiShoppingCartSimpleLight, "/orders", "10")}
                    {renderMenuItem("Analytics", PiChartLineUpLight, "/analytics")}
                    {renderMenuItem("Products", PiCubeLight, "/products")}
                </section>
                <section className="flex flex-col space-y-2">
                    <div className="text-xs text-[#7D7C7C]">Sales</div>
                    {renderMenuItem("My Store", PiBasketLight, "/sales/my-store")}
                    {renderMenuItem("Shipments", PiTruckLight, "/sales/shipments")}
                </section>
                <section className="flex flex-col space-y-2">
                    {renderMenuItem("Settings", CiSettings, "/settings")}
                    {renderMenuItem("Log out", CiLogout, "/logout")}
                </section>
            </ul>
        </nav>
    );
};

export default Sidebar;
