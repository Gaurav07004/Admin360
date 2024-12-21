import { Schema, model, models, Document } from 'mongoose';

interface ISalesMetrics extends Document {
    month: string;
    sold: number;
    returned: number;
}

const SalesMetricsSchema = new Schema<ISalesMetrics>(
    {
        month: { type: String, required: true },
        sold: { type: Number, required: true },
        returned: { type: Number, required: true },
    },
    { timestamps: true }
);

const SalesMetrics = models.SalesMetrics || model<ISalesMetrics>('SalesMetrics', SalesMetricsSchema);

export default SalesMetrics;
