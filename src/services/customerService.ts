import Customer from '@/models/Customer';

export const fetchCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;

    } catch (error) {
        throw new Error('Failed to fetch customers');
    }
};
