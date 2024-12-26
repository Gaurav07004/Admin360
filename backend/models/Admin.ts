import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface Admin extends Document {
    adminID: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    profileImage: string;
}

const AdminSchema = new Schema<Admin>({
    adminID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profileImage: {
        type: String,
        required: false
    }
});

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

AdminSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default AdminModel;
