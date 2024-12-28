import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/dbConnect";
import Admin from "@/models/Admin";

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await connectDB();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        admin.password = newPassword;
        await admin.save();

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default resetPassword;
