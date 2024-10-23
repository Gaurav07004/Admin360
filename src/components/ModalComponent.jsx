'use client';
import { useState } from 'react';
import { Check } from 'phosphor-react';
import {
    Modal,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
} from 'keep-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCustomerState, hideReviewModal, setFilter } from '../redux/slices/CustomerSlice';

const ModalComponent = () => {
    const dispatch = useDispatch();
    const { showReview, reviewContent } = useSelector(selectCustomerState);
    const [filter, setLocalFilter] = useState('');

    const handleClose = () => {
        dispatch(hideReviewModal());
    };

    const handleFilterChange = (e) => {
        setLocalFilter(e.target.value);
    };

    const applyFilter = () => {
        dispatch(setFilter(filter)); // Assumes you have a setFilter action
        handleClose();
    };

    return (
        <Modal isOpen={showReview} onClose={handleClose}>
            <ModalContent className="w-[20rem] lg:w-[26rem]">
                <ModalClose className="absolute right-4 top-4" />
                <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
                        <Check size={60} />
                    </div>
                    <div className="space-y-1 text-center">
                        <ModalTitle>{reviewContent?.title || 'Filter'}</ModalTitle>
                        <ModalDescription>
                            {reviewContent?.description || 'Apply your filter criteria below:'}
                        </ModalDescription>
                        <input
                            type="text"
                            placeholder="Filter..."
                            value={filter}
                            onChange={handleFilterChange}
                            className="py-2 px-4 text-sm border border-gray-300 rounded-lg mt-4"
                        />
                        <button
                            onClick={applyFilter}
                            className="mt-4 py-2 px-5 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-400"
                        >
                            Apply Filter
                        </button>
                    </div>
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
