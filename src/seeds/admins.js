import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462b798eb92c75e0c1040f4'),
    firstName: 'Lola',
    lastName: 'Rodríguez',
    dni: 39948632,
    phone: 3413011235,
    email: 'lolardrg@gmail.com',
    city: 'Matanzas',
    password: 'lolardrg$test%admin',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6462ca49eb92c75e0c104118'),
    firstName: 'Pepe',
    lastName: 'Morando',
    dni: 12345678,
    phone: 1234567,
    email: 'pepemor@gmail.com',
    city: 'La Habana',
    password: 'pepemor$test%admin',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6462df648b34d071677d7efd'),
    firstName: 'Glenda',
    lastName: 'Viera',
    dni: 51327283,
    phone: 341235892,
    email: 'glevide@gmail.com',
    city: 'Rosario',
    password: 'glevide$test%admin',
    isActive: false,
  },
];
