/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import logo from "../Assets/Logo.png";
import { Button, Divider, Modal, ModalAction, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "keep-react";
import { FiSettings, FiAtSign, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiSealCheckLight } from "react-icons/pi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordModal = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [passwordStatusMessage, setPasswordStatusMessage] = useState("");
    const [emailStatus, setEmailStatus] = useState<"valid" | "invalid" | null>(null);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState<"valid" | "invalid" | null>(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currentSection, setCurrentSection] = useState(1);

    const validateEmail = (value) => {
        return emailRegex.test(value) ? "valid" : "invalid";
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailStatus(value.trim() ? validateEmail(value) : null);
        setStatusMessage("");
    };

    const handleSendResetLink = async () => {
        if (!email.trim() || validateEmail(email) === "invalid") {
            setStatusMessage("Please enter a valid email.");
            setEmailStatus("invalid");
            return;
        }

        setIsLoading(true);
        setStatusMessage("");

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setStatusMessage("Reset link sent successfully! Check your email.");
            setEmailStatus("valid");
            setCurrentSection(2);
        } catch {
            setStatusMessage("Failed to send reset link. Please try again.");
            setEmailStatus("invalid");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
        setOtp(newOtp);

        const nextInput = value && index < otp.length - 1 ? index + 1 : index - 1;
        document.getElementById(`otp-input-${nextInput}`)?.focus();
    };

    const handlePasswordChange = () => {
        if (newPassword === confirmPassword && newPassword.length >= 6) {
            setPasswordStatusMessage("Password reset successfully.");
            setPasswordStatus("valid");
            setCurrentSection(4);
        } else {
            setPasswordStatusMessage("Passwords do not match or are too short (min 6 characters).");
            setPasswordStatus("invalid");
        }
    };

    const toggleShowPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <Modal>
            <ModalAction asChild>
                <section className="mt-4">
                    <h3 className="text-sm font-semibold text-[#5e6574]">Admin Settings</h3>
                    <div className="relative flex items-center gap-3 bg-gray-50 py-4 rounded-lg">
                        <FiSettings className="absolute left-3 top-[1.7rem] text-[#FF6500]" />
                        <Button className="py-2 pl-9 pr-4 bg-[#ff660021] text-[#FF6500] hover:bg-[#ff660021]">Forgot Password</Button>
                    </div>
                </section>
            </ModalAction>
            <ModalContent className="w-[35%] max-w-[500px] mx-auto p-6 rounded-xl shadow-lg">
                <ModalHeader className="mb-8 flex flex-col items-center justify-center space-y-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                        <Image src={logo} alt="logo" width={70} height={40} />
                    </div>
                    <div className="space-y-1 text-center">
                        <ModalTitle className="text-lg font-semibold text-gray-700">{currentSection === 4 ? "" : currentSection === 3 ? "Set New Password" : currentSection === 2 ? "Enter verification code" : "Reset Password"}</ModalTitle>
                        <ModalDescription className="text-gray-500">
                            {currentSection === 4 ? "" : currentSection === 3 ? "Create a new password" : currentSection === 2 ? "We've sent a code to gauravsingh@gmail.com" : "Enter your email to receive a verification code."}
                        </ModalDescription>
                    </div>
                </ModalHeader>

                {currentSection === 1 && (
                    <div className="mb-8">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiAtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="w-full p-3 pl-12 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none"
                            />
                            {emailStatus === "invalid" && <MdErrorOutline className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
                            {emailStatus === "valid" && <AiOutlineCheckCircle className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />}
                        </div>
                        {statusMessage && <div className={`mt-3 py-2 px-4 rounded-lg text-sm ${emailStatus === "invalid" ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}>{statusMessage}</div>}
                    </div>
                )}
                {currentSection === 2 && (
                    <div className="mb-8">
                        <label className="text-sm font-semibold text-gray-600 mb-2 block">Enter One Time Password</label>
                        <div className="flex space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={digit}
                                    id={`otp-input-${index}`}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    maxLength={1}
                                    autoComplete="off"
                                    className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none text-center"
                                />
                            ))}
                        </div>
                        <div className="text-sm text-center text-gray-600 my-4">
                            Didn't get a code? <span className="font-semibold text-gray-600 cursor-pointer">Resend</span>
                        </div>
                    </div>
                )}

                {currentSection === 3 && (
                    <div className="mb-8">
                        <label htmlFor="new-password" className="text-sm font-semibold text-gray-600 mb-2 block">
                            New Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                autoComplete="off"
                                className="w-full p-3 pl-12 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none"
                            />
                            <div className="text-lg absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleShowPassword}>
                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                        {passwordStatusMessage && <div className={`mt-3 py-2 px-4 rounded-lg text-sm ${passwordStatus === "invalid" ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}>{statusMessage}</div>}

                        <label htmlFor="confirm-password" className="text-sm font-semibold text-gray-600 my-3 block">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="off"
                                placeholder="Confirm new password"
                                className="w-full p-3 pl-12 border border-gray-300 rounded-lg text-gray-600 text-sm placeholder:text-gray-400 focus:outline-none"
                            />
                            <div className="text-lg absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleShowPassword}>
                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                        {passwordStatusMessage && <div className={`mt-3 ${passwordStatus === "invalid" ? "text-red-600" : "text-green-600"}`}>{statusMessage}</div>}
                    </div>
                )}

                {currentSection === 4 && (
                    <div className="text-center">
                        <PiSealCheckLight className="text-green-500 text-[5.5rem] mx-auto mb-6" />
                        <p className="text-lg font-semibold text-gray-700">Password changed successfully!</p>
                        <p className="text-gray-500">Your password has been updated successfully.</p>
                    </div>
                )}

                <Divider className="border-t border-gray-300 my-6" />
                <ModalFooter className="flex justify-between space-x-4">
                    {currentSection === 1 ? (
                        <ModalAction asChild>
                            <Button variant="outline" className="p-6 w-[40%] text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={() => setEmail("")}>
                                Cancel
                            </Button>
                        </ModalAction>
                    ) : currentSection === 4 ? (
                        <ModalAction asChild>
                            <Button className="p-6 w-[100%] bg-[#FF6F20] text-white hover:bg-[#FF6F20CC] transition duration-200" onClick={() => setEmail("")}>
                                Close
                            </Button>
                        </ModalAction>
                    ) : (
                        <Button variant="outline" className="p-6 w-[40%] text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={() => setCurrentSection(currentSection - 1)}>
                            Back
                        </Button>
                    )}
                    {currentSection !== 4 && (
                        <Button
                            className="p-6 w-[60%] bg-[#FF6F20] text-white hover:bg-[#FF6F20CC] transition duration-200"
                            onClick={() => {
                                if (currentSection === 1) handleSendResetLink();
                                else if (currentSection === 2) setCurrentSection(3);
                                else handlePasswordChange();
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : currentSection === 3 ? "Save Password" : currentSection === 2 ? "Verify OTP" : "Send Reset Link"}
                        </Button>
                    )}
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
