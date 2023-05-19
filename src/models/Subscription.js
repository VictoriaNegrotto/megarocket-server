import mongoose from 'mongoose';

const { Schema } = mongoose;
const subscriptionSchema = new Schema({
  classes: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'Class',
  },
  members: {
    type: [mongoose.Types.ObjectId],
    require: true,
    ref: 'Member',
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
