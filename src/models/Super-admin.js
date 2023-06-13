import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
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
