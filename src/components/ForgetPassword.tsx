/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../Assets/Logo.png";
import { Button, Divider, Modal, ModalAction, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "keep-react";
import { FiSettings, FiAtSign, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ForgotPasswordModal = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [emailStatus, setEmailStatus] = useState<"valid" | "invalid" | null>(null);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [currentSection, setCurrentSection] = useState(0); // New state for section control

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setEmail(value);
        setStatusMessage("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === "") {
            setEmailStatus(null);
        } else {
            setEmailStatus(emailRegex.test(value) ? "valid" : "invalid");
        }
    };

    const handleSendResetLink = async () => {
        if (!email.trim()) {
            setStatusMessage("Please enter a valid email.");
            setEmailStatus("invalid");
            return;
        }

        setIsLoading(true);
        setStatusMessage("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatusMessage("Please enter a valid email format.");
            setEmailStatus("invalid");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setStatusMessage("Reset link sent successfully! Check your email.");
            setEmailStatus("valid");
            setCurrentSection(1); // Move to OTP section
        } catch (error) {
            setStatusMessage("Failed to send reset link. Please try again.");
            setEmailStatus("invalid");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`)?.focus();
        }
        if (!value && index > 0) {
            document.getElementById(`otp-input-${index - 1}`)?.focus();
        }
    };

    return (
        <Modal>
            <ModalAction asChild>
                <section className="mt-4">
                    <h3 className="text-sm font-semibold text-[#5e6574]">Admin Settings</h3>
                    <div className="relative flex items-center gap-3 bg-gray-50 py-4 rounded-lg">
                        <FiSettings className="absolute left-3 top-[1.7rem] text-[#FF6500]" />
                        <Button className="py-2 pl-9 pr-4 bg-[#ff660021] text-[#FF6500] hover:bg-[#ff660021] transition duration-200 ease-in-out focus:outline-none">Forgot Password</Button>
                    </div>
                </section>
            </ModalAction>
            <ModalContent className="w-[35%] max-w-[500px] mx-auto p-6 rounded-xl shadow-lg">
                <ModalHeader className="mb-8 flex flex-col items-center justify-center space-y-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-white">
                        <Image src={logo} alt="logo" width={70} height={40} />
                    </div>
                    <div className="space-y-1 text-center">
                        <ModalTitle className="text-lg font-semibold text-gray-700">{currentSection === 1 ? "Enter verification code" : "Reset Password"}</ModalTitle>
                        <ModalDescription className="text-gray-500">{currentSection === 1 ? "We've sent a code to gauravsingh@gmail.com" : "Enter your email to receive a verification code."}</ModalDescription>
                    </div>
                </ModalHeader>

                {/* Email Section */}
                {currentSection === 0 && (
                    <div className="mb-8">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiAtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                name="email"
                                id="email"
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="w-full p-3 pl-12 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none"
                            />
                            {emailStatus === "invalid" && email.trim() !== "" && <MdErrorOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />}
                            {emailStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />}
                        </div>
                        {statusMessage && (
                            <div className={`mt-3 flex items-center gap-2 p-3 rounded-md text-sm ${statusMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {statusMessage.includes("successfully") ? <FiCheckCircle className="text-green-500 text-base" /> : <FiAlertCircle className="text-red-500 text-base" />}
                                <p>{statusMessage}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* OTP Section */}
                {currentSection === 1 && (
                    <div className="mb-8">
                        <label htmlFor="otp" className="text-sm font-semibold text-gray-600 mb-2 block">
                            Enter One Time Password
                        </label>
                        <div className="flex space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={digit}
                                    id={`otp-input-${index}`}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
                                        handleOtpChange(index, value);
                                    }}
                                    maxLength={1}
                                    className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none text-center"
                                />
                            ))}
                        </div>
                        <div className="text-sm text-center text-gray-600 my-4">
                            Didn't get a code? <span className="text-sm font-semibold text-gray-600">Click to resend.</span>
                        </div>
                    </div>
                )}

                <Divider className="border-t border-gray-300 mx-[-1.4rem] my-6" />
                <ModalFooter className="flex justify-between space-x-4">
                    {currentSection === 0 ? (
                        <ModalAction asChild>
                            <Button variant="outline" className="p-6 w-[40%] text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={() => setEmail("")}>
                                Cancel
                            </Button>
                        </ModalAction>
                    ) : (
                        <Button variant="outline" className="p-6 w-[40%] text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={() => setCurrentSection(currentSection - 1)}>
                            Back
                        </Button>
                    )}

                    <Button className="p-6 w-[60%] bg-[#FF6F20] text-white hover:bg-[#FF6F20CC] transition duration-200" onClick={currentSection === 1 ? () => console.log("Verify OTP") : handleSendResetLink} disabled={isLoading}>
                        {isLoading ? "Sending..." : currentSection === 1 ? "Verify OTP" : "Send Reset Link"}
                    </Button>
                </ModalFooter>
                <div className="text-sm text-center text-gray-500 mt-8">
                    Don't have an account?{" "}
                    <a href="#" className="text-[#FF6500] hover:underline">
                        Sign Up
                    </a>
                </div>
            </ModalContent>
        </Modal>
    );
};

export default ForgotPasswordModal;
