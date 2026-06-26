import mongoose, { Schema, Document } from 'mongoose';

export interface IPassengerProfile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'T';
  berthPreference: 'LB' | 'MB' | 'UB' | 'SU' | 'SL' | 'None';
  idProofType?: 'Aadhar' | 'PAN' | 'Passport' | 'Voter ID' | 'Driving License';
  isSeniorCitizen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PassengerProfileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, maxlength: 16 },
  age: { type: Number, required: true, min: 1, max: 125 },
  gender: { type: String, enum: ['M', 'F', 'T'], required: true },
  berthPreference: { type: String, enum: ['LB', 'MB', 'UB', 'SU', 'SL', 'None'], default: 'None' },
  idProofType: { type: String, enum: ['Aadhar', 'PAN', 'Passport', 'Voter ID', 'Driving License'] },
  isSeniorCitizen: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IPassengerProfile>('PassengerProfile', PassengerProfileSchema);
