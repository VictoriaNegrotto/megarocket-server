import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/Super-admin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.insertMany(superAdminSeed);
});

const mockSuperAdmin = {
  email: 'testsuperadmin@gmail.com',
  password: 'testPWSuperAdmin',
};

describe('GET /api/superadmin', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/superadmin').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toBe('SuperAdmin list');
  });

  test('should return status 404 if endpoind is wrong', async () => {
    const response = await request(app).get('/api/superadminasd').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe(undefined);
  });

  test('should return status 500 if database have an error', async () => {
    jest.spyOn(SuperAdmin, 'find').mockRejectedValueOnce();
    const response = await request(app).get('/api/superadmin').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('POST /api/superadmin', () => {
  test('should return status 200 when create a new super admin', async () => {
    const response = await request(app).post('/api/superadmin').send(mockSuperAdmin);
    // eslint-disable-next-line no-underscore-dangle
    const testSuperAdminId = response.body.data._id;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('New SuperAdmin created!');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toStrictEqual({
      ...mockSuperAdmin, _id: testSuperAdminId, isActive: true, __v: 0,
    });
  });

  test('should return status 404 if endpoint is wrong', async () => {
    const response = await request(app).post('/api/superadminasd').send(mockSuperAdmin);
    expect(response.status).toBe(404);
  });

  test('should return status 500 if creation of super admin have an error', async () => {
    jest.spyOn(SuperAdmin, 'create').mockRejectedValueOnce(new Error('error at creating super admin'));
    const response = await request(app).post('/api/superadmin').send(mockSuperAdmin);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
