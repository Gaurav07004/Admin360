/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus, setSelectedCustomer } from "../redux/slices/customerSlice";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { RootState } from '../redux/store';
import TableComponent from "./table";
import { toast } from "keep-react"
import { setCustomer } from "@/redux/slices/customerSlice";

const columns = [
    { id: 'customerID', label: 'Customer ID' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'email', label: 'Email' },
    { id: 'location', label: 'Location' },
    { id: 'dateJoined', label: 'Date Joined' },
    { id: 'customerStatus', label: 'Status' },
    { id: 'order', label: 'Order' },
    { id: 'visit', label: 'Visit' },
    { id: 'action', label: 'Action' },
];

const getBadgeColor = (status: string) => {
    switch (status) {
        case 'Active': return 'success';
        case 'Inactive': return 'error';
        default: return 'warning';
    }
};

const CustomerTable = () => {
    const dispatch = useDispatch();
    const { customers, drawerStatus } = useSelector((state: RootState) => state.customer);
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const handleCustomer = (customerID: string) => {
        const selectedCustomer = customers.find((customer) => customer.customerID === customerID);
        if (selectedCustomer) {
            dispatch(setSelectedCustomer(selectedCustomer));
            dispatch(setDrawerStatus(!drawerStatus));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/customer", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setCustomer(data));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const data = customers.map((customer) => ({
        customerID: customer.customerID,
        customerName: customer.customerName,
        email: customer.email,
        location: customer.location,
        dateJoined: customer.dateJoined,
        customerStatus: customer.customerStatus,
        order: customer.order,
        visit: customer.visit,
        Recent_Orders: customer.Recent_Orders,
        color: customer.color,
        action: (
            <PiDotsThreeOutlineLight
                className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                onClick={() => handleCustomer(customer.customerID)}
            />
        ),
    }));

    if (!mounted) return null;

    return (
        <>
            <TableComponent
                data={data}
                columns={columns}
                caption="Customer Information"
                getBadgeColor={getBadgeColor}
            />
        </>

    );
};

export default CustomerTable;
