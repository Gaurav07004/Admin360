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

        const otp = crypto.randomInt(100000, 999999).toString();

        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        const subject = 'Password Reset Request';
        const emailContent = `<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 1rem;">
            <div class="email-container" style="max-width: 600px; margin: 40px auto; padding: 20px; background-color: #ffffff; border-radius: 10px;">
                <h2 class="email-title" style="font-size: 22px; font-weight: bold; color: #3d4f58;">Action Required: One-Time Verification Code</h2>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">Please enter the following code for verification:</p>
                <p class="verification-code" style="font-size: 16px; font-weight: bold; color: #ff6515; margin: 20px 0; text-align: center;">${otp}</p>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">If you need any assistance or have questions, feel free to contact our support team at <a href="mailto:${process.env.EMAIL_USER}" style="color: #ff6515; text-decoration: none;">Admin 360 Team</a>.</p>
                <div class="email-footer" style="font-size: 12px; color: #999999; margin-top: 20px;">
                    <p>Thank you,<br>The Admin 360 Team</p>
                </div>
            </div>
        </body>`;

        await sendEmail({ to: email, subject, text: "", html: emailContent });

        return res.status(200).json({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Error in forgotPassword API:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default forgotPassword;
