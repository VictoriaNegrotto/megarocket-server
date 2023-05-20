import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

describe('getAdmins /api/admins', () => {
  test('should return a 200 status code when admins are found', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Admin found');
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
  });
});
