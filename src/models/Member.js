import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema({
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
    max: 99999999,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
    max: 9999,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  memberships: {
    type: String,
    enum: ['Black', 'Classic', 'Only Classes'],
    default: 'Classic',
  },
});

export default mongoose.model('Member', memberSchema);
