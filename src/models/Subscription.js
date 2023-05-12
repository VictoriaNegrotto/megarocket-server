import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  class: {
    type: Number,
    min: 1,
    max: 99999999,
    require: true,
  },
  members: {
    type: Number,
    min: 1,
    max: 99999999,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

export default mongoose.Model('Subscription', subscriptionSchema);
