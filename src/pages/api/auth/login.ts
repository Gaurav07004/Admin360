import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import connectDB from "@/utils/dbConnect";
import sendEmail from "@/utils/sendEmail";

const sendAccessDeniedEmail = async (email: string, subject: string, message_1: string, message_2: string) => {
    const emailContent = `
        <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 1rem;">
            <div class="email-container" style="max-width: 600px; margin: 40px auto; padding: 20px; background-color: #ffffff; border-radius: 10px;">
                <h2 class="email-title" style="font-size: 22px; font-weight: bold; color: #3d4f58;">${subject}</h2>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">Dear User,</p>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">${message_1}</p>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">${message_2}</p>
                <p class="email-body" style="font-size: 16px; color: #555555; margin: 20px 0;">
                    If you need assistance or have any questions, please reach out to us at 
                    <a href="mailto:${process.env.EMAIL_USER}" style="color: #ff6515; text-decoration: none;">Admin 360 Team</a>.
                </p>
                <div class="email-footer" style="font-size: 12px; color: #999999; margin-top: 20px;">
                    <p>Thank you,<br>The Admin 360 Team</p>
                </div>
            </div>
        </body>`;

    await sendEmail({ to: email, subject, text: "", html: emailContent });
};

const loginAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        await connectDB();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            await sendAccessDeniedEmail(
                email,
                'Access Denied: No Account Found',
                `We have detected an unsuccessful login attempt associated with the email address: <strong>${email}</strong>.`,
                `Unfortunately, no account exists with this email address in our system. If you believe this is an error or suspect unauthorized activity, please contact support.`
            );
            return res.status(400).json({ error: "No account associated with this email" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            await sendAccessDeniedEmail(
                email,
                'Access Denied: Unauthorised Access',
                `We have detected an unsuccessful login attempt associated with the email address: <strong>${email}</strong>.`,
                `If you did not attempt this login, please secure your account and change your password immediately.`
            );
            return res.status(400).json({ error: "Invalid credentials: Incorrect password" });
        }

        const payload = {
            adminID: admin.adminID,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: admin.role,
            isActive: admin.isActive,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export default loginAdmin;
