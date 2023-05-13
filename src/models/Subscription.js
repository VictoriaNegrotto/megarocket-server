import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  class: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  members: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

export default mongoose.Model('Subscription', subscriptionSchema);
