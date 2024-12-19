'use client';
import Image from "next/image";
import logo from "@/Assets/New_Logo.png";
import login from '@/Assets/login_1.png';
import { FiAtSign, FiLock } from 'react-icons/fi';
import { MdErrorOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setModal, setForm, setEmailStatus } from "@/redux/slices/commonSlice";
import ForgotPasswordModal from '@/components/ForgetPassword';

const Login = () => {
    const dispatch = useDispatch();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { modal, form, passwordStatus, emailStatus } = useSelector((state: RootState) => state.menu);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            if (value.trim() === "") {
                dispatch(setEmailStatus(null));
            } else {
                dispatch(setEmailStatus(emailRegex.test(value) ? "valid" : "invalid"));
            }
        }

        dispatch(setForm({ ...form, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    const toggleModal = () => {
        dispatch(setModal(!modal));
    };

    return (
        <>
            <div className="flex justify-center items-center w-full bg-orange-200 h-screen">
                <div className="w-[70%] h-[96vh] flex justify-between items-center bg-white rounded-[1rem]">
                    <div className="w-1/2 p-4 ml-6 flex justify-center items-center bg-gradient-to-br from-orange-500 to-orange-300 rounded-[2rem] h-[90vh]">
                        <Image src={login} alt="Login Image" width={400} height={400} objectFit="cover" className="z-0" />
                    </div>
                    <div className="w-[40%] p-6 space-y-6">
                        <div className="flex flex-col items-center justify-center mb-8">
                            <Image
                                src={logo}
                                alt="logo"
                                width={180}
                                height={200}
                                className="mb-6"
                            />
                            <div className="text-center">
                                <p className="text-3xl font-semibold text-gray-500">Welcome Back!</p>
                                <p className="text-sm text-[#5e6574] mt-2">Please login to your account</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Username</p>
                            <div className="relative">
                                <FiAtSign className="absolute left-3 top-[1rem] text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                                />
                                {emailStatus === "invalid" && <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />}
                                {emailStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />}
                            </div>
                            <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Password</p>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-[1rem] text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                                />
                                {passwordStatus === "invalid" && <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />}
                                {passwordStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />}
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-orange-500 cursor-pointer mt-4" onClick={toggleModal}> Forgot your password? </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal />
        </>
    );
};

export default Login;
