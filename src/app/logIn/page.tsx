"use client";
import Image from "next/image";
import logo from "@/Assets/New_Logo.png";
import login from "@/Assets/login_1.png";
import { useRouter } from "next/navigation";
import { toast } from "keep-react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { GoLock } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    setModal,
    setForm,
    setEmailStatus,
    setPasswordStatus,
    setShowNewPassword,
    setStatusMessage,
    setPasswordStatusMessage,
} from "@/redux/slices/commonSlice";
import ForgotPasswordModal from "@/components/ForgetPassword";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
    const { modal, form, statusMessage, passwordStatus, passwordStatusMessage, emailStatus, showNewPassword } =
        useSelector((state: RootState) => state.menu);

    const toggleModal = () => {
        dispatch(setModal(!modal));
    };

    const toggleShowPassword = () => {
        dispatch(setShowNewPassword(!showNewPassword));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch(setForm({ ...form, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !emailRegex.test(form.email)) {
            dispatch(setEmailStatus("invalid"));
            dispatch(setStatusMessage("Please enter a valid email address."));
        } else {
            dispatch(setEmailStatus("valid"));
            dispatch(setStatusMessage(""));
        }

        if (!form.password) {
            dispatch(setPasswordStatus("invalid"));
            dispatch(setPasswordStatusMessage("Please enter a valid password."));
        } else {
            dispatch(setPasswordStatus(null));
        }

        if (!form.email || !form.password || !emailRegex.test(form.email)) {
            return;
        }

        try {
            const loginData = { email: form.email, password: form.password };
            const response = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    toast.success("Login successful! Redirecting to dashboard", { position: "top-right" });

                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 500);
                } else {
                    toast.error("Token not received. Please try again.", { position: "top-right" });
                }
            } else {
                const errorMessage = "Invalid credentials. Please try again.";
                toast.warning(errorMessage, { position: "top-right" });
            }
        } catch (error) {
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
        }
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
                            <Image src={logo} alt="logo" width={180} height={200} className="mb-6" />
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-gray-500">Administrator Login</p>
                                <p className="text-sm text-[#5e6574] mt-2">Please sign in to access the management dashboard</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <section className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg mt-[0.08rem]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        autoComplete="off"
                                        className="w-full py-3 pl-10 pr-12 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400 text-sm focus:outline-none "
                                    />
                                    {emailStatus === "invalid" && <MdErrorOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />}
                                    {emailStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />}
                                </div>
                                {emailStatus === "invalid" && (
                                    <div className="mt-1 text-[0.8rem] font-medium text-red-500">
                                        {statusMessage}
                                    </div>
                                )}
                            </section>

                            <section className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-500 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <GoLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg mt-[0.08rem]" />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        autoComplete="off"
                                        className="w-full py-3 pl-10 pr-12 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400 text-sm focus:outline-none"
                                    />
                                    <div
                                        className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                                        onClick={toggleShowPassword}
                                    >
                                        {showNewPassword ? <VscEyeClosed className="text-gray-500 text-lg transition ease-in-out" /> : <VscEye className="text-gray-500 text-lg transition ease-in-out" />}
                                    </div>
                                </div>
                                {passwordStatus === "invalid" && <div className="mt-1 text-[0.8rem] font-medium text-red-600">{passwordStatusMessage}</div>}
                            </section>
                            <div
                                className="text-right text-sm text-orange-500 font-medium cursor-pointer mt-2 hover:underline hover:text-orange-600 transition duration-200 ease-in-out"
                                onClick={toggleModal}
                            >
                                Forgot your password?
                            </div>

                            <button type="submit" className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none">
                                Admin Sign In
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
