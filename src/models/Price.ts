import mongoose, { Document, Schema } from 'mongoose';

interface IPrice extends Document {
  price: number;
  timestamp?: Date;
}

const priceSchema: Schema = new Schema({
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IPrice>('Price', priceSchema);
