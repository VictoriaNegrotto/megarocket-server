import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('646154d30aa90c4527db6f09'),
    email: 'ariimaldo@gmail.com',
    password: 'mauro123',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6461554c0aa90c4527db6f0e'),
    email: 'juvi@gmail.com',
    password: 'juvi1234',
    isActive: true,

  },
  {
    _id: new mongoose.Types.ObjectId('6462bdaaeb92c75e0c104108'),
    email: 'glevi@gmail.com',
    password: 'delgado123',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6461553b0aa90c4527db6f0c'),
    email: 'francoa@gmail.com',
    password: 'franco123',
    isActive: false,
  },
  {
    _id: new mongoose.Types.ObjectId('646154d30aa90c4527db6f06'),
    email: 'superAdmin@gmail.com',
    password: 'abc123456',
    isActive: 'true',
  },
  {
    _id: new mongoose.Types.ObjectId('646154d30aa90c4527db6f07'),
    email: 'secondSuperAdmin@gmail.com',
    password: 'qwert987654',
    isActive: 'true',
  },
  {
    _id: new mongoose.Types.ObjectId('646154d30aa90c4527db6f08'),
    email: 'thirdSuperAdmin@gmail.com',
    password: 'zxc123321',
    isActive: 'false',
  },
];
