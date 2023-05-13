import mongoose from 'mongoose';

const { Schema } = mongoose;
const classSchema = new Schema({
  day: {
    type: String,
    required: true,
    min: 6,
    max: 9,
  },
  hour: {
    type: String,
    required: true,
    min: 5,
    max: 5,
  },
  trainer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  activity: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
    min: 0,
    max: 30,
  },
});

const Class = mongoose.model('Class', classSchema);

export default Class;
