import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  planTier: 'Free' | 'Pro' | 'Premium';
  startDate: Date;
  endDate?: Date;
  paymentStatus: 'Pending' | 'Active' | 'Cancelled' | 'Expired';
  razorpaySubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  planTier: { type: String, enum: ['Free', 'Pro', 'Premium'], default: 'Free' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  paymentStatus: { type: String, enum: ['Pending', 'Active', 'Cancelled', 'Expired'], default: 'Active' },
  razorpaySubscriptionId: { type: String }
}, { timestamps: true });

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
