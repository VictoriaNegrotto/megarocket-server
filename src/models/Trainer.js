import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Trainer', trainerSchema);
