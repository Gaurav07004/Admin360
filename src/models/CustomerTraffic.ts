import { Schema, model, models, Document } from 'mongoose';

interface IDemographics extends Document {
    Female: number;
    Male: number;
}

const DemographicsSchema = new Schema<IDemographics>(
    {
        Female: { type: Number, required: true },
        Male: { type: Number, required: true },
    },
    { timestamps: true }
);

const Demographics = models.Demographics || model<IDemographics>('Demographics', DemographicsSchema);

export default Demographics;
