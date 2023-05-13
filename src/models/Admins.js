import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminsSchema = new Schema({
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
  password: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
});
export default mongoose.model('Admin', adminsSchema);
