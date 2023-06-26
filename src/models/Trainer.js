import mongoose from 'mongoose';

const { Schema } = mongoose;
const trainerSchema = new Schema({
  FirebaseUid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  dni: {
    type: Number,
    min: 1000000,
    max: 99999999,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    max: 9999999999,
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  salary: {
    type: Number,
    min: 0,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Trainer', trainerSchema);
