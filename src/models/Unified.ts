import mongoose, { Schema, Document, Model, model } from 'mongoose';

// Define interface for the schema to enforce proper types
interface IUnifiedSchema extends Document {
    name: string,
    value: number,
    sold?: number,
    productImage?: string

}

// Define the schema for the model
const unifiedSchema = new Schema<IUnifiedSchema>({
    name: { type: String, required: true },
    value: { type: Number, required: true },
});

// Check if the model already exists in mongoose models to avoid overriding
const UnifiedModel: Model<IUnifiedSchema> = mongoose.models.Unified || model<IUnifiedSchema>('Unified', unifiedSchema);

export default UnifiedModel;
