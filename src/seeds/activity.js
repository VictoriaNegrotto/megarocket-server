import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('64616a9e5648cb86adad2757'),
    name: 'Pilates',
    description: 'A class to strengthen your posture muscles and improve your flexibility, stability and balance',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('64616a9e5648cb86adad2a58'),
    name: 'Crossfit',
    description: 'training technique that connects movements from different disciplines',
    isActive: false,
  },
  {
    _id: new mongoose.Types.ObjectId('64616a9e5648cb86adad2a59'),
    name: 'Spinning',
    description: 'training technique that connects movements from different disciplines',
    isActive: true,
  },
];
