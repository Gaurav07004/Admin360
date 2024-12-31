/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import logo from "../Assets/New_Logo.png";
import { Button, Divider, Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "keep-react";
import { FiAtSign, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiSealCheckLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
    setEmail,
    setIsLoading,
    setStatusMessage,
    setPasswordStatusMessage,
    setOTPStatus,
    setOTPStatusMessage,
    setEmailStatus,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    setPasswordStatus,
    setShowNewPassword,
    setCurrentSection,
    setModal,
} from "@/redux/slices/commonSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;

const ForgotPasswordModal = () => {
    const dispatch = useDispatch();
    const { modal, email, isLoading, statusMessage, passwordStatusMessage, OTPStatusMessage, OTPStatus, emailStatus, otp, newPassword, confirmPassword, passwordStatus, showNewPassword, currentSection } = useSelector(
        (state: RootState) => state.menu
    );

    const validateEmail = (value: any) => {
        return emailRegex.test(value) ? "valid" : "invalid";
    };

    const handleEmailChange = (e: any) => {
        const value = e.target.value;
        dispatch(setEmail(value));
        dispatch(setEmailStatus(value.trim() ? validateEmail(value) : null));
        dispatch(setStatusMessage(""));
    };

    const handleSendResetLink = async () => {
        if (!email.trim() || validateEmail(email) === "invalid") {
            dispatch(setStatusMessage("Please enter a valid email address."));
            dispatch(setEmailStatus("invalid"));
            return;
        }

        dispatch(setIsLoading(true));
        dispatch(setStatusMessage(""));

        try {
            const response = await fetch("http://localhost:3000/api/auth/forgotPassword/sendOTPMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // const data = await response.json();
                dispatch(setStatusMessage("Reset link sent successfully! Check your email."));
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(setEmailStatus("valid"));
                dispatch(setCurrentSection(2));
            } else {
                const data = await response.json();
                dispatch(setStatusMessage(data.error || "Failed to send reset link. Please try again."));
                dispatch(setEmailStatus("invalid"));
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
            dispatch(setStatusMessage("Failed to send reset link. Please try again."));
            dispatch(setEmailStatus("invalid"));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const cleanedValue = value.replace(/[^0-9]/g, "").slice(0, 1);
        const updatedOtp = [...otp];
        updatedOtp[index] = cleanedValue;

        dispatch(setOtp(updatedOtp));

        const nextInput = value ? index + 1 : index - 1;
        if (nextInput >= 0 && nextInput < otp.length) {
            document.getElementById(`otp-input-${nextInput}`)?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        const updatedOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < otp.length; i++) {
            updatedOtp[i] = pastedData[i];
        }

        dispatch(setOtp(updatedOtp));
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const key = e.key;

        if (key === "ArrowRight") {
            if (index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`)?.focus();
            }
        } else if (key === "ArrowLeft") {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`)?.focus();
            }
        }
    };


    const handleOTPValidation = async () => {
        const otpString = otp.join("");

        if (!otpString) {
            dispatch(setOTPStatusMessage("Please complete the OTP input."));
            return;
        }

        dispatch(setIsLoading(true));
        dispatch(setOTPStatusMessage(""));

        try {
            const response = await fetch("http://localhost:3000/api/auth/forgotPassword/verifyOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: otpString,
                }),
            });

            if (response.ok) {
                // const data = await response.json();
                dispatch(setOTPStatus("valid"));
                dispatch(setOTPStatusMessage("OTP successfully verified. You can now reset your password."));
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(setCurrentSection(3));
            } else {
                const data = await response.json();
                dispatch(setOTPStatus("invalid"));
                dispatch(setOTPStatusMessage(data.error || "Incorrect OTP. Please try again."));
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            dispatch(setOTPStatus("invalid"));
            dispatch(setOTPStatusMessage("An error occurred while verifying the OTP. Please try again."));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            dispatch(setPasswordStatusMessage("Passwords do not match."));
            dispatch(setPasswordStatus("invalid"));
            return;
        }

        if (newPassword.length < 6) {
            dispatch(setPasswordStatusMessage("Password is too short. Minimum length is 6 characters."));
            dispatch(setPasswordStatus("invalid"));
            return;
        }

        dispatch(setIsLoading(true));
        dispatch(setPasswordStatusMessage(""));

        try {
            const response = await fetch("http://localhost:3000/api/auth/forgotPassword/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    newPassword,
                }),
            });

            if (response.ok) {
                // const data = await response.json();
                dispatch(setPasswordStatusMessage("Password reset successfully."));
                dispatch(setPasswordStatus("valid"));
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(setCurrentSection(4));
            } else {
                const data = await response.json();
                dispatch(setPasswordStatusMessage(data.error || "Failed to reset password. Please try again."));
                dispatch(setPasswordStatus("invalid"));
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            dispatch(setPasswordStatusMessage("An error occurred while resetting your password. Please try again."));
            dispatch(setPasswordStatus("invalid"));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const toggleShowPassword = () => {
        dispatch(setShowNewPassword(!showNewPassword));
    };

    const toggleModal = () => {
        dispatch(setModal(!modal));
        dispatch(setCurrentSection(1));
        dispatch(setEmail(""));
        dispatch(setEmailStatus(null));
        dispatch(setStatusMessage(""));
        dispatch(setOtp(["", "", "", "", "", "", "", ""]));
        dispatch(setOTPStatus(null));
        dispatch(setOTPStatusMessage(""));
        dispatch(setNewPassword(""));
        dispatch(setConfirmPassword(""));
        dispatch(setPasswordStatus(null));
        dispatch(setPasswordStatusMessage(""));
    };

    const renderEmailSection = () => {
        return (
            <div className="mb-8">
                <label htmlFor="email" className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 block">
                    Email Address
                </label>
                <div className="relative">
                    <FiAtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                        type="email"
                        id="email-input"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        autoComplete="off"
                        aria-describedby="email-status-message"
                        className="w-full p-3 pl-12 border border-gray-300 dark:border-gray-500  dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 focus:outline-none"
                    />
                    {emailStatus === "invalid" ? (
                        <MdErrorOutline className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 " />
                    ) : emailStatus === "valid" ? (
                        <AiOutlineCheckCircle className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ) : null}
                </div>
                {statusMessage && (
                    <div
                        id="email-status-message"
                        className={`mt-2 p-[0.3rem] rounded-md text-[0.8rem] font-medium ${emailStatus === "invalid" ? "text-red-500 transition duration-300 ease-in-out animate-fadeIn" : "text-green-500 transition duration-300 ease-in-out animate-fadeIn"
                            }`}
                    >
                        {statusMessage}
                    </div>
                )}
            </div>
        );
    };

    const renderOTPSection = () => {
        return (
            <div className="mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 block">Enter One Time Password</label>
                <div className="flex items-center justify-between w-full space-x-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            value={digit}
                            id={`otp-input-${index}`}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onPaste={handleOtpPaste}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            maxLength={1}
                            autoComplete="off"
                            className="w-12 h-12 p-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 focus:outline-none text-center"
                        />
                    ))}
                </div>
                <div className="text-sm text-center text-gray-600 dark:text-gray-300 my-4">
                    Didn't get a code?{" "}
                    <span className="font-semibold text-[#FF6F20] cursor-pointer" onClick={() => dispatch(setStatusMessage("OTP resent! Please check your email."))}>
                        Resend
                    </span>
                </div>
                {OTPStatusMessage && (
                    <div
                        id="email-status-message"
                        className={`mt-2 p-[0.3rem] rounded-md text-[0.8rem] font-medium ${OTPStatus === "valid" ? "text-green-500 transition duration-300 ease-in-out animate-fadeIn" : "text-red-500 transition duration-300 ease-in-out animate-fadeIn"
                            }`}
                    >
                        {OTPStatusMessage}
                    </div>
                )}
            </div>
        );
    };

    const renderPasswordSection = () => {
        return (
            <div className="mb-8">
                <label htmlFor="new-password" className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 block">
                    New Password
                </label>
                <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => dispatch(setNewPassword(e.target.value))}
                        placeholder="Enter new password"
                        autoComplete="off"
                        className="w-full p-3 pl-12 border border-gray-300 dark:border-gray-500  dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 focus:outline-none"
                    />
                    <div className="text-lg absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleShowPassword}>
                        {showNewPassword ? <FiEyeOff className="dark:text-gray-300" /> : <FiEye className="dark:text-gray-300" />}
                    </div>
                </div>
                {passwordStatusMessage && (
                    <div
                        className={`mt-2 p-[0.3rem] rounded-md text-[0.8rem] font-medium ${passwordStatus === "invalid" ? "text-red-500 transition duration-300 ease-in-out animate-fadeIn" : "text-green-500 transition duration-300 ease-in-out animate-fadeIn"
                            }`}
                    >
                        {passwordStatusMessage}
                    </div>
                )}

                <label htmlFor="confirm-password" className="text-sm font-semibold text-gray-600 dark:text-gray-300 my-3 block">
                    Confirm Password
                </label>
                <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                        autoComplete="off"
                        placeholder="Confirm new password"
                        className="w-full p-3 pl-12 border border-gray-300 dark:border-gray-500  dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 focus:outline-none"
                    />
                    <div className="text-lg absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 dark:text-gray-300" onClick={toggleShowPassword}>
                        {showNewPassword ? <FiEyeOff className="dark:text-gray-300" /> : <FiEye className="dark:text-gray-300" />}
                    </div>
                </div>
                {passwordStatusMessage && (
                    <div
                        className={`mt-2 p-[0.3rem] rounded-md text-[0.8rem] font-medium ${passwordStatus === "invalid" ? "text-red-500 transition duration-300 ease-in-out animate-fadeIn" : "text-green-500 transition duration-300 ease-in-out animate-fadeIn"
                            }`}
                    >
                        {passwordStatusMessage}
                    </div>
                )}
            </div>
        );
    };

    const renderSuccessSection = () => {
        return (
            <div className="text-center">
                <PiSealCheckLight className="text-green-500 text-[5.5rem] mx-auto mb-6" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Password changed successfully!</p>
                <p className="text-gray-500 dark:text-gray-500">Your password has been updated successfully.</p>
            </div>
        );
    };

    const getModalTitle = () => {
        switch (currentSection) {
            case 4:
                return "";
            case 3:
                return "Set New Password";
            case 2:
                return "Enter verification code";
            default:
                return "Reset Password";
        }
    };

    const getModalDescription = () => {
        switch (currentSection) {
            case 4:
                return "";
            case 3:
                return "Create a new password";
            case 2:
                return "We've sent a code to gauravsingh@gmail.com";
            default:
                return "Enter your email to receive a verification code.";
        }
    };

    const getFooterCancelButton = () => {
        if (currentSection === 1) {
            return (
                <Button variant="outline" className="p-6 w-[40%] text-gray-600 dark:text-gray-300  border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={toggleModal}>
                    Cancel
                </Button>
            );
        }

        if (currentSection === 4) {
            return (
                <Button className="p-6 w-[100%] bg-[#FF6F20] text-white dark:text-gray-300 hover:bg-[#FF6F20CC] transition duration-200" onClick={toggleModal}>
                    Close
                </Button>
            );
        }

        return null;
    };

    const getFooterBackButton = () => {
        if (currentSection !== 4 && currentSection !== 1) {
            return (
                <Button variant="outline" className="p-6 w-[40%] text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-600" onClick={() => dispatch(setCurrentSection(currentSection - 1))}>
                    Back
                </Button>
            );
        }

        return null;
    };

    const getFooterNextButton = () => {
        if (currentSection === 4) return null;

        return (
            <Button
                className="p-6 w-[60%] bg-[#FF6F20] text-white hover:bg-[#FF6F20CC] transition duration-200"
                onClick={() => {
                    if (currentSection === 1) {
                        handleSendResetLink();
                    } else if (currentSection === 2) {
                        handleOTPValidation();
                    } else if (currentSection === 3) {
                        handlePasswordChange();
                    } else if (currentSection === 4) {
                        toggleModal();
                    }
                }}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : currentSection === 3 ? "Save Password" : currentSection === 2 ? "Verify OTP" : "Send Reset Link"}
            </Button>
        );
    };

    return (
        <Modal isOpen={modal}>
            <ModalContent className="w-[35%] max-w-[600px] mx-auto p-6 rounded-xl shadow-lg">
                <ModalHeader className="mb-8 flex flex-col items-center justify-center space-y-4">
                    <div className="flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-full border border-gray-200 bg-gray-50 ">
                        <Image src={logo} alt="logo" width={120} height={60} objectFit="cover" />
                    </div>
                    <div className="space-y-1 text-center">
                        <ModalTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">{getModalTitle()}</ModalTitle>
                        <ModalDescription className="text-gray-500 dark:text-gray-400">{getModalDescription()}</ModalDescription>
                    </div>
                </ModalHeader>

                {currentSection === 1 && renderEmailSection()}
                {currentSection === 2 && renderOTPSection()}
                {currentSection === 3 && renderPasswordSection()}
                {currentSection === 4 && renderSuccessSection()}

                <Divider className="border-t border-gray-300 my-6" />
                <ModalFooter className="flex justify-between space-x-4">
                    {getFooterCancelButton()}
                    {getFooterBackButton()}
                    {getFooterNextButton()}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ForgotPasswordModal;
