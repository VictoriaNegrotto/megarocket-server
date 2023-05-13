import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  email: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('SuperAdmin', superAdminSchema);
