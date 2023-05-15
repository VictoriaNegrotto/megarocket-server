import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  classSubs: {
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
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
