"use client";

import React, { useEffect } from "react";
import { RootState } from "../redux/store";
import { Divider } from "keep-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu, setActiveSubMenu } from "../redux/slices/menuSlice";
import logo from "../Assets/Logo.png";
import profilePic from "../Assets/Profile.jpg";
import classNames from "classnames";
import { PiBoundingBoxLight, PiShoppingCartSimpleLight, PiChartLineUpLight, PiCubeLight, PiUsersThreeLight } from "react-icons/pi";
import { CiSettings, CiLogout } from "react-icons/ci";

const menuConfig = [
    {
        title: "Menu",
        items: [
            { name: "Dashboard", icon: PiBoundingBoxLight, href: "/dashboard" },
            { name: "Customers", icon: PiUsersThreeLight, href: "/dashboard/customers" },
            { name: "Orders", icon: PiShoppingCartSimpleLight, href: "/dashboard/orders", },
        ],
    },
    {
        title: "Sales",
        items: [
            { name: "Analytics", icon: PiChartLineUpLight, href: "/dashboard/analytics" },
            { name: "Products", icon: PiCubeLight, href: "/dashboard/products" },
        ],
    },
    {
        title: "Account",
        items: [
            { name: "Settings", icon: CiSettings, href: "/dashboard/settings" },
            { name: "Log out", icon: CiLogout, href: "/logout" },
        ],
    },
];

const Sidebar: React.FC = () => {
    const { activeMenu } = useSelector((state: RootState) => state.menu);
    const { imageUrl } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const storedMenu = localStorage.getItem("activeMenu");
    //     if (storedMenu) {
    //         dispatch(setActiveMenu(storedMenu));
    //     }
    // }, [dispatch]);

    const handleMenuClick = (menu: string) => {
        dispatch(setActiveMenu(menu));
        dispatch(setActiveSubMenu(null));
    };

    const renderMenuItem = (menu: string, MenuIcon: React.ComponentType<{ className?: string }>, href: string, notification?: number) => (
        <li key={menu}>
            <Link href={href}>
                <div
                    onClick={() => handleMenuClick(menu)}
                    className={classNames("p-[0.70rem] w-full text-left rounded-lg flex items-center justify-between transition text-sm font-medium", {
                        "bg-[#ff66002b] text-[#FF6500] border border-[#FF6500]": activeMenu === menu,
                        "text-[#FF6500]": menu === "Log out",
                        "hover:bg-[#ff66002b] text-gray-800": activeMenu !== menu && menu !== "Log out",
                    })}
                    role="button"
                    aria-current={activeMenu === menu ? "page" : undefined}
                >
                    <div className="flex items-center">
                        <MenuIcon className="w-5 h-5" />
                        <span className="ml-2">{menu}</span>
                    </div>
                    {notification && <span className="py-[0.3rem] px-2 text-xs text-white bg-[#ff6600c1] rounded-md">{notification}</span>}
                </div>
            </Link>
        </li>
    );

    return (
        <nav className="bg-white w-60 h-auto py-7 px-4 rounded-[1rem]" role="navigation">
            <ul className="space-y-6">
                <div className="mb-5">
                    <Image src={logo} alt="logo" width={90} height={50} />
                </div>
                {menuConfig.map((section, index) => (
                    <section key={index} className="flex flex-col gap-2">
                        {section.title && <div className="text-xs text-gray-500">{section.title}</div>}
                        {section.items.map(({ name, icon, href }) => renderMenuItem(name, icon, href))}
                    </section>
                ))}
                <Divider className="border-t border-gray-300 mx-[-1rem] mt-4" />
                <div className="flex items-center space-x-3 mt-4">
                    <Image src={imageUrl || profilePic} alt="Profile Picture" className="w-10 h-10 object-cover rounded-full shadow-md hover:opacity-90 transition" width={0} height={0} />
                    <div>
                        <p className="text-sm font-semibold text-gray-600 truncate">Gaurav Singh</p>
                        <p className="text-xs text-gray-400">Sales Manager</p>
                    </div>
                </div>
            </ul>
        </nav>
    );
};

export default Sidebar;
