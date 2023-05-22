import mongoose from 'mongoose';

export default [
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
