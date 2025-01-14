
'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import { setDrawerStatus, setSelectedCustomer } from "../redux/slices/customerSlice";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import TableComponent from "./table";

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

    const handleCustomer = (customerID: string) => {
        const selectedCustomer = customers.find((customer) => customer.customerID === customerID);
        if (selectedCustomer) {
            dispatch(setSelectedCustomer(selectedCustomer));
            dispatch(setDrawerStatus(!drawerStatus));
        }
    };

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
