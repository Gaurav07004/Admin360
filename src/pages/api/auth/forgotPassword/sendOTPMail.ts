import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/dbConnect";
import Admin from "@/models/Admin";
import OTP from "@/models/OTP";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email } = req.body;

    if (!email) {
        console.log("Email is missing in the request body");
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const otp = crypto.randomInt(10000000, 99999999).toString();

        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        const subject = 'Password Reset Request';
        const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffebde; border-radius: 1rem;">
            <h2 style="font-size: 24px; font-weight: bold; line-height: 28px;">Action Required: One-Time Verification Code</h2>
            <p style="font-size: 14px;">You are receiving this email because a one-time verification code is required for your Admin 360 account.</p>
            <p style="font-size: 14px;">Please use the following code to complete the verification process: <strong style="font-weight: bold; color: #ff6515;">${otp}</strong></p>
            <p style="font-size: 14px;">If you did not request this verification code, please ignore this email.</p>
            <p style="font-size: 14px;">If you need any assistance or have questions, feel free to contact our support team at <a href="mailto:${process.env.EMAIL_USER}" style="color: #ff6515; text-decoration: none;">Admin 360 Team</a>.</p>
            <p style="font-size: 14px;">Thank you,<br>Admin 360 Team</p>
        </div>`;

        await sendEmail({ to: email, subject, text: "", html: emailContent });

        return res.status(200).json({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Error in forgotPassword API:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default forgotPassword;
