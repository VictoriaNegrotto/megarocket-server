import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('646015ffa877f6e5fb0e5de3'),
    firstName: 'Milagros',
    lastName: 'Cerro',
    dni: 42400200,
    phone: 34161676,
    email: 'mili@cerro.com',
    city: 'Rosario',
    birthDate: '2000-08-01T00:00:00.000+00:00',
    postalCode: 2000,
    memberships: 'Black',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646015ffa877f6e5fb0e5de1'),
    firstName: 'Lola',
    lastName: 'Mento',
    dni: 24200400,
    phone: 34610076,
    email: 'lola@mento.com',
    city: 'Rosario',
    birthDate: '1990-02-13T02:00:00.000+00:00',
    postalCode: 2000,
    memberships: 'Classic',
    isActive: true,
  },
];
