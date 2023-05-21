import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminSeed from '../seeds/admins';

const mockAdmin = {
  firstName: 'Manuel',
  lastName: 'Cornet',
  dni: 48632849,
  phone: 34184609,
  email: 'manu@gmail.com',
  city: 'Rosario',
  password: 'manu$test%admin',
};

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

describe('getAdmins /api/admins', () => {
  test('should return a 200 status code when admins are found', async () => {
    const response = await request(app).get('/api/admins').send();
    const { data } = response.body;
    const adminSeedToString = JSON.stringify(adminSeed.filter((admin) => admin.isActive));
    const dataToString = JSON.stringify(data);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Admin found');
    expect(dataToString).toEqual(adminSeedToString);
  });

  test('should return a 200 status code when get admins with isActive is true', async () => {
    const response = await request(app).get('/api/admins').send();
    const adminsActive = response.body.data;
    adminsActive.forEach((admin) => {
      expect(admin.isActive).toBeTruthy();
    });
  });

  test('should return a 404 status code when admins are not found', async () => {
    jest.spyOn(Admins, 'find').mockResolvedValue(null);
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Admin not found');
  });

  test('should return a 500 status code when gets a database error', async () => {
    jest.spyOn(Admins, 'find').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Database error');
    expect(response.body.data).toBeUndefined();
  });
});

describe('createAdmin /api/admins', () => {
  test('should return a 201 status code when admin is created', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    // eslint-disable-next-line no-underscore-dangle
    const mockAdminId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Admin ${mockAdmin.firstName} was created successfully!`);
    expect(response.body.data).toStrictEqual({
      ...mockAdmin, _id: mockAdminId, isActive: true, __v: 0,
    });
  });

  test('should return a 500 status code when gets a database error', async () => {
    jest.spyOn(Admins, 'create').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot POST /api/admins (500)');
    expect(response.body.data).toBeUndefined();
  });
});
