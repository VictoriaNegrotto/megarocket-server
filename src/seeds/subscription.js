import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('646276eb6d374da6dcbc5de5'),
    class: new mongoose.Types.ObjectId('646004aff33f9c83d28ed968'),
    members: [new mongoose.Types.ObjectId('646004aff33f9c83d28ed958'), new mongoose.Types.ObjectId('64601a15f33f9c83d28ed968')],
    date: '2023-06-15T14:57:14.000+00:00',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646276eb6d374da6dcbc5de7'),
    class: new mongoose.Types.ObjectId('646004aff33f9c83d28ed969'),
    members: [new mongoose.Types.ObjectId('646004aff33f9c83d28ed950'), new mongoose.Types.ObjectId('64601a15f33f9c83d28ed960')],
    date: '2023-06-15T14:57:14.000+00:00',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646276eb6d374da6dcbc5de6'),
    class: new mongoose.Types.ObjectId('646004aff33f9c83d28ed964'),
    members: [new mongoose.Types.ObjectId('646004aff33f9c83d28ed952'), new mongoose.Types.ObjectId('64601a15f33f9c83d28ed963')],
    date: '2023-06-15T14:57:14.000+00:00',
    isActive: false,
  },
];
