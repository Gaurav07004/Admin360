import { Schema, model, models, Document } from 'mongoose';

interface ICustomerTraffic extends Document {
    Female: number;
    Male: number;
}

const CustomerTrafficSchema = new Schema<ICustomerTraffic>(
    {
        Female: { type: Number, required: true },
        Male: { type: Number, required: true },
    },
    { timestamps: true }
);

const CustomerTraffic = models.CustomerTraffic || model<ICustomerTraffic>('CustomerTraffic', CustomerTrafficSchema);

export default CustomerTraffic;
