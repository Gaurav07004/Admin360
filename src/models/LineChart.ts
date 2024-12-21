import { Schema, model, models, Document } from 'mongoose';

interface IMonthlyData extends Document {
    name: string;
    value: number;
}

const MonthlyDataSchema = new Schema<IMonthlyData>(
    {
        name: { type: String, required: true },
        value: { type: Number, required: true },
    },
    { timestamps: true }
);

const MonthlyData = models.MonthlyData || model<IMonthlyData>('MonthlyData', MonthlyDataSchema);

export default MonthlyData;
