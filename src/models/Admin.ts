import mongoose, { Document, Schema, Model, model, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    adminID: string;
    name: string;
    email: string;
    password: string;
    role: 'admin';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema: Schema<IAdmin> = new Schema(
    {
        adminID: {
            type: String,
            required: [true, 'Admin ID is required'],
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

adminSchema.pre<IAdmin>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

adminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const Admin: Model<IAdmin> = mongoose.models.Admin || model<IAdmin>('Admin', adminSchema);

export default Admin;
