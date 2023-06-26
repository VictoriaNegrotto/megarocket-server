import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 20,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('SuperAdmin', superAdminSchema);
