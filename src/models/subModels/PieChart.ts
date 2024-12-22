import mongoose, { Schema, model, Model, Document } from 'mongoose';

interface IPieChartData extends Document {
    name: string;
    value: number;
}

const PieChartDataSchema = new Schema<IPieChartData>(
    {
        name: { type: String, required: true },
        value: { type: Number, required: true },
    },
    { timestamps: true }
);

const PieChartData: Model<IPieChartData> = mongoose.models.PieChart || model<IPieChartData>('PieChart', PieChartDataSchema);

export default PieChartData;
