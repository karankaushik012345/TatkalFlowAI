import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  googleId?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: false }, // Optional for OAuth users
  googleId: { type: String, required: false, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isEmailVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
