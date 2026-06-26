import mongoose, { Schema, Document } from 'mongoose';

export interface IJourneyTemplate extends Document {
  userId: mongoose.Types.ObjectId;
  source: string;
  destination: string;
  travelClass: '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC';
  quota: 'Tatkal' | 'Premium Tatkal' | 'General';
  passengerIds: mongoose.Types.ObjectId[];
  trainNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JourneyTemplateSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  travelClass: { type: String, enum: ['1A', '2A', '3A', 'SL', 'CC', 'EC'], required: true },
  quota: { type: String, enum: ['Tatkal', 'Premium Tatkal', 'General'], default: 'Tatkal' },
  passengerIds: [{ type: Schema.Types.ObjectId, ref: 'PassengerProfile' }],
  trainNumber: { type: String }
}, { timestamps: true });

export default mongoose.model<IJourneyTemplate>('JourneyTemplate', JourneyTemplateSchema);
