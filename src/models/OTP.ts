import mongoose, { Schema, Document } from "mongoose";

interface IOTP extends Document {
    email: string;
    otp: number;
    expiresAt: Date;
}

const otpSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        otp: { type: Number, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", otpSchema);

export default OTP;
