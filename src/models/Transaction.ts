import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
  address: string;
  txHash: string;
  blockNumber?: string;
  timeStamp?: string;
  gasUsed?: string;
  gasPrice?: string;
}

const transactionSchema: Schema = new Schema({
  address: { type: String, required: true },
  txHash: { type: String, required: true },
  blockNumber: { type: String },
  timeStamp: { type: String },
  gasUsed: { type: String },
  gasPrice: { type: String }
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
