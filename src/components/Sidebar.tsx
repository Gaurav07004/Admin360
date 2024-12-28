/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Divider, toast } from "keep-react";
import Image from "next/image";
import logo from "@/Assets/New_Logo.png";
import profilePic from "@/Assets/Men.jpg";
import {
    PiBoundingBoxLight,
    PiShoppingCartSimpleLight,
    PiChartLineUpLight,
    PiCubeLight,
    PiUsersThreeLight,
} from "react-icons/pi";
import { CiSettings, CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";

const menuConfig = [
    {
        title: "Menu",
        items: [
            { name: "Dashboard", icon: PiBoundingBoxLight, href: "/dashboard" },
            { name: "Customers", icon: PiUsersThreeLight, href: "/dashboard/customers" },
            { name: "Orders", icon: PiShoppingCartSimpleLight, href: "/dashboard/orders" },
        ],
    },
    {
        title: "Sales",
        items: [
            { name: "Products", icon: PiCubeLight, href: "/dashboard/products" },
            { name: "Analytics", icon: PiChartLineUpLight, href: "/dashboard/analytics" },
        ],
    },
    {
        title: "Account",
        items: [
            { name: "Settings", icon: CiSettings, href: "/dashboard/settings" },
            { name: "Log out", icon: CiLogout, href: "#" },
        ],
    },
];

const Sidebar: React.FC = () => {
    const { accountData } = useSelector((state: RootState) => state.user);
    const pathname = usePathname();
    const fullName = `${accountData?.firstName} ${accountData?.lastName}`;

    const renderMenuItem = (
        menu: string,
        MenuIcon: React.ComponentType<{ className?: string }> | any,
        href: string,
        notification?: number
    ) => {
        const isActive = pathname === href;

        return (
            <li key={menu}>
                <Link href={href}>
                    <div
                        className={`p-[0.70rem] w-full text-left rounded-lg flex items-center justify-between transition text-sm ${isActive
                            ? "bg-[#ff66002b] text-[#FF6500] border border-[#FF6500]"
                            : menu === "Log out"
                                ? "text-[#FF6500]"
                                : "hover:bg-[#ff66002b] text-gray-800"
                            }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={menu === "Log out" ? handleLogout : undefined}
                    >
                        <div className="flex items-center">
                            <MenuIcon className="w-5 h-5" />
                            <span className="ml-2">{menu}</span>
                        </div>
                        {notification && (
                            <span className="py-[0.3rem] px-2 text-xs text-white bg-[#ff6600c1] rounded-md">
                                {notification}
                            </span>
                        )}
                    </div>
                </Link>
            </li>
        );
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                localStorage.removeItem("authToken");

                toast.success("Logout successful! Redirecting to login.", { position: "top-right" });

                setTimeout(() => {
                    window.location.href = "/";
                }, 500);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Something went wrong. Please try again.";
                toast.error(errorMessage, { position: "top-right" });
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
        }
    };


    return (
        <nav className="bg-white w-60 h-auto py-7 px-4 rounded-[1rem]" role="navigation">
            <ul className="space-y-6">
                <div className="mb-5">
                    <Image src={logo} alt="logo" width={0} height={0} className="w-[11rem] h-auto" />
                </div>
                {menuConfig.map((section, index) => (
                    <section key={index} className="flex flex-col gap-2">
                        {section.title && <div className="text-[0.68rem] text-gray-500 uppercase font-medium">{section.title}</div>}
                        {section.items.map(({ name, icon, href }) => renderMenuItem(name, icon, href))}
                    </section>
                ))}
                <Divider className="border-t border-gray-300 mx-[-1rem] mt-4" />
                <div className="flex items-center space-x-3 mt-4">
                    <Image
                        src={accountData?.profileImage || profilePic}
                        alt="Profile Picture"
                        className="w-10 h-10 object-cover rounded-md shadow-md hover:opacity-90 transition"
                        width={0}
                        height={0}
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-600 truncate">{fullName}</p>
                        <p className="text-xs text-gray-500 font-semibold">{accountData?.role}</p>
                    </div>
                </div>
            </ul>
        </nav>
    );
};

export default Sidebar;
