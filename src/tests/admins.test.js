import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminSeed from '../seeds/admins';

// const mockAdmins = {
//   firstName: 'Jose',
//   lastName: 'Villa',
//   dni: 12345678,
//   phone: 12345679890,
//   email: 'josev@gmail.com',
//   city: 'Rosario',
//   password: 'Asd123!',
// };

// let mockAdminId;

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('updateAdmin /api/admins/:id', () => {
  test('should return status 200', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f7').send(updateData);
    expect(response.status).toBe(200);
  });

  test('should return status 404', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f1').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });

  test('should return status 500', async () => {
    jest.spyOn(Admin, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
    const updateData = { firstName: 'Lorenzo' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f0').send(updateData);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });
});

describe('deleteAdmin /api/admins/:id', () => {
  test('should delete one admin', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f7').send();
    expect(response.status).toBe(200);
  });

  test('should return status 404', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f2').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });

  test('should return status 500', async () => {
    jest.spyOn(Admin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f7').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });
});
