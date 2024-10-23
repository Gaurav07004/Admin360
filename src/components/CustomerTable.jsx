'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/CustomerSlice";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import TableComponent from "./table";
import { toast } from 'keep-react'

const columns = [
    { id: 'id', label: 'Sr. No' },
    { id: 'Customer', label: 'Customer' },
    { id: 'Email', label: 'Email' },
    { id: 'Location', label: 'Location' },
    { id: 'dateJoined', label: 'Date Joined' },
    { id: 'status', label: 'Status' },
    { id: 'Order', label: 'Order' },
    { id: 'Visit', label: 'Visit' },
    { id: 'Action', label: 'Action' },
];


const getBadgeColor = (status) => {
    switch (status) {
        case 'Active': return 'success';
        case 'Inactive': return 'error';
        default: return 'warning';
    }
};

const CustomerTable = () => {
    const dispatch = useDispatch();
    const { customerStatus } = useSelector((state) => state.customer);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenuClick = (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
            dispatch(setStatus({ id, status: newStatus }));
            toast.success(`Customer ID ${id} status changed to ${newStatus}.`);
        } catch (error) {
            toast.error('Failed to update status.');
        }
    };

    const data = [
        {
            id: 1,
            Customer: 'Amit Kumar',
            Email: 'amit.kumar@gmail.com',
            Location: 'Delhi',
            dateJoined: 'Jan 15, 2024',
            status: customerStatus?.[1],
            Order: 12,
            chartData: [
                { name: 'Jan', price: 123 },
                { name: 'Feb', price: 987 },
                { name: 'Mar', price: 432 },
                { name: 'Apr', price: 234 },
                { name: 'May', price: 876 },
                { name: 'Jun', price: 543 },
                { name: 'Jul', price: 678 },
                { name: 'Aug', price: 345 }
            ],
            color: '#698474',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(1, customerStatus?.[1])}
                />
            ),
        },
        {
            id: 2,
            Customer: 'Priya Sharma',
            Email: 'priya.sharma@gmail.com',
            Location: 'Mumbai',
            dateJoined: 'Feb 20, 2024',
            status: customerStatus?.[2],
            Order: 80,
            chartData: [
                { name: 'Jan', price: 301 },
                { name: 'Feb', price: 654 },
                { name: 'Mar', price: 209 },
                { name: 'Apr', price: 872 },
                { name: 'May', price: 113 },
                { name: 'Jun', price: 978 },
                { name: 'Jul', price: 432 },
                { name: 'Aug', price: 564 }
            ],
            color: '#F05A7E',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(2, customerStatus?.[2])}
                />
            ),
        },
        {
            id: 3,
            Customer: 'Rajesh Gupta',
            Email: 'rajesh.gupta@gmail.com',
            Location: 'Bangalore',
            dateJoined: 'Mar 10, 2024',
            status: customerStatus[3],
            Order: 15,
            chartData: [
                { name: 'Jan', price: 789 },
                { name: 'Feb', price: 345 },
                { name: 'Mar', price: 678 },
                { name: 'Apr', price: 987 },
                { name: 'May', price: 456 },
                { name: 'Jun', price: 123 },
                { name: 'Jul', price: 890 },
                { name: 'Aug', price: 234 }
            ],
            color: '#219C90',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(3, customerStatus?.[3])}
                />
            ),
        },
        {
            id: 4,
            Customer: 'Neha Patel',
            Email: 'neha.patel@gmail.com',
            Location: 'Ahmedabad',
            dateJoined: 'Apr 5, 2024',
            status: customerStatus[4],
            Order: 10,
            chartData: [
                { name: 'Jan', price: 564 },
                { name: 'Feb', price: 210 },
                { name: 'Mar', price: 789 },
                { name: 'Apr', price: 345 },
                { name: 'May', price: 678 },
                { name: 'Jun', price: 234 },
                { name: 'Jul', price: 567 },
                { name: 'Aug', price: 890 }
            ],
            color: '#0D1282',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(4, customerStatus?.[4])}
                />
            ),
        },
        {
            id: 5,
            Customer: 'Sanjay Reddy',
            Email: 'sanjay.reddy@gmail.com',
            Location: 'Hyderabad',
            dateJoined: 'May 12, 2024',
            status: customerStatus[5],
            Order: 60,
            chartData: [
                { name: 'Jan', price: 135 },
                { name: 'Feb', price: 678 },
                { name: 'Mar', price: 432 },
                { name: 'Apr', price: 789 },
                { name: 'May', price: 567 },
                { name: 'Jun', price: 123 },
                { name: 'Jul', price: 345 },
                { name: 'Aug', price: 678 }
            ],
            color: '#B31312',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(5, customerStatus?.[5])}
                />
            ),
        },
        {
            id: 6,
            Customer: 'Ravi Kumar',
            Email: 'ravi.kumar@gmail.com',
            Location: 'Chennai',
            dateJoined: 'Jun 22, 2024',
            status: customerStatus[6],
            Order: 18,
            chartData: [
                { name: 'Jan', price: 453 },
                { name: 'Feb', price: 789 },
                { name: 'Mar', price: 234 },
                { name: 'Apr', price: 567 },
                { name: 'May', price: 890 },
                { name: 'Jun', price: 123 },
                { name: 'Jul', price: 456 },
                { name: 'Aug', price: 789 }
            ],
            color: '#B71375',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(6, customerStatus?.[6])}
                />
            ),
        },
        {
            id: 7,
            Customer: 'Sonia Verma',
            Email: 'sonia.verma@gmail.com',
            Location: 'Pune',
            dateJoined: 'Jul 30, 2024',
            status: customerStatus[7],
            Order: 100,
            chartData: [
                { name: 'Jan', price: 289 },
                { name: 'Feb', price: 450 },
                { name: 'Mar', price: 123 },
                { name: 'Apr', price: 678 },
                { name: 'May', price: 345 },
                { name: 'Jun', price: 890 },
                { name: 'Jul', price: 234 },
                { name: 'Aug', price: 567 }
            ],
            color: '#EA5455',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(7, customerStatus?.[7])}
                />
            ),
        },
        {
            id: 8,
            Customer: 'Deepak Mehta',
            Email: 'deepak.mehta@gmail.com',
            Location: 'Jaipur',
            dateJoined: 'Aug 18, 2024',
            status: customerStatus[8],
            Order: 90,
            chartData: [
                { name: 'Jan', price: 321 },
                { name: 'Feb', price: 543 },
                { name: 'Mar', price: 654 },
                { name: 'Apr', price: 789 },
                { name: 'May', price: 321 },
                { name: 'Jun', price: 654 },
                { name: 'Jul', price: 789 },
                { name: 'Aug', price: 432 }
            ],
            color: '#424242',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(8, customerStatus?.[8])}
                />
            ),
        },
        {
            id: 9,
            Customer: 'Sunil Mehta',
            Email: 'sunil.mehta@gmail.com',
            Location: 'Delhi',
            dateJoined: 'Jan 18, 2024',
            status: customerStatus[9],
            Order: 80,
            chartData: [
                { name: 'Jan', price: 360 },
                { name: 'Feb', price: 543 },
                { name: 'Mar', price: 654 },
                { name: 'Apr', price: 589 },
                { name: 'May', price: 321 },
                { name: 'Jun', price: 614 },
                { name: 'Jul', price: 789 },
                { name: 'Aug', price: 482 }
            ],
            color: '#009FBD',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(9, customerStatus?.[9])}
                />
            ),
        },
        {
            id: 10,
            Customer: 'Vivek Sharma',
            Email: 'vivek.sharma@gmail.com',
            Location: 'Mumbai',
            dateJoined: 'Mar 14, 2024',
            status: customerStatus[10],
            Order: 50,
            chartData: [
                { name: 'Jan', price: 241 },
                { name: 'Feb', price: 543 },
                { name: 'Mar', price: 644 },
                { name: 'Apr', price: 789 },
                { name: 'May', price: 421 },
                { name: 'Jun', price: 694 },
                { name: 'Jul', price: 489 },
                { name: 'Aug', price: 632 }
            ],
            color: '#131842',
            Action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(10, customerStatus?.[10])}
                />
            ),
        }
    ];

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
