import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('646004aff33f9c83d28ed958'),
    day: 'Saturday',
    hour: '00:26',
    activity: '64616a9e5648cb86adad2757',
    trainer: '6460077410adc8f3ed4e623f',
    slots: 12,
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646004aff33f9c83d28ed954'),
    day: 'Saturday',
    hour: '00:26',
    activity: new mongoose.Types.ObjectId('646b6d9d76dbada5dc76467a'),
    trainer: new mongoose.Types.ObjectId('6460077410adc8f3ed4e623f'),
    slots: 12,
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646004aff33f9c83d28ed959'),
    day: 'Saturday',
    hour: '00:26',
    activity: new mongoose.Types.ObjectId('646b6d9d76dbada5dc76467a'),
    trainer: new mongoose.Types.ObjectId('6460077410adc8f3ed4e623f'),
    slots: 19,
    isActive: false,
  },
];
