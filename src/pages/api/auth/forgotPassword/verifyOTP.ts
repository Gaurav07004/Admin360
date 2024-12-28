import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/dbConnect";
import OTP from "@/models/OTP";

const verifyOtp = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await connectDB();

        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        if (new Date(otpRecord.expiresAt) < new Date()) {
            return res.status(400).json({ error: "OTP has expired" });
        }

        return res.status(200).json({ message: "OTP successfully verified" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default verifyOtp;
