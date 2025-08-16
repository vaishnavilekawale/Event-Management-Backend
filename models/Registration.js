import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
  registeredAt: { type: Date, default: Date.now }
});

registrationSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);