'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerStatus } from "../redux/slices/customerSlice";  // Ensure this action is imported
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { RootState } from '../redux/store';
import TableComponent from "./table";
import { toast } from 'keep-react';

const columns = [
    { id: 'customerID', label: 'Customer ID' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'email', label: 'Email' },
    { id: 'location', label: 'Location' },
    { id: 'dateJoined', label: 'Date Joined' },
    { id: 'customerStatus', label: 'Customer Status' },
    { id: 'order', label: 'Order' },
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
    const { customers } = useSelector((state: RootState) => state.customer);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenuClick = (id: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
            dispatch(updateCustomerStatus({ id, customerStatus: newStatus }));  // Dispatch the correct action to update the status
            toast.success(`Customer ID ${id} status changed to ${newStatus}.`);
        } catch (error) {
            toast.error('Failed to update status.');
        }
    };

    const data = customers.map((customer) => ({
        customerID: customer.customerID,
        customerName: customer.customerName,
        email: customer.email,
        location: customer.location,
        dateJoined: customer.dateJoined,
        customerStatus: customer.customerStatus,
        order: customer.order,
        action: (
            <div>
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(customer.id, customer.customerStatus)}  // Correct customer object usage
                />
            </div>
        ),
    }));

    if (!mounted) return null;

    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Customer Information"
            getBadgeColor={getBadgeColor}
            Applyfilter={true}
        />
    );
};

export default CustomerTable;
