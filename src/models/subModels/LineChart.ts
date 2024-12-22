import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface ILineChartData extends Document {
    name: string;
    value: number;
}

const LineChartDataSchema: Schema<ILineChartData> = new Schema(
    {
        name: { type: String, required: true },
        value: { type: Number, required: true },
    },
    { timestamps: true }
);

const LineChartData: Model<ILineChartData> =
    mongoose.models.LineChart || model<ILineChartData>('LineChart', LineChartDataSchema);

export default LineChartData;
