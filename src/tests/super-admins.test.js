import request from 'supertest';
import app from '../app';
import Superadmin from '../models/Super-admin';
import superAdminSeed from '../seeds/super-admins';

const mockSuperAdmin = {
  email: 'ale@gmail.com',
  password: 'ale12345',
};

const superAdminIdIsActiveTrue = '646154d30aa90c4527db6f09';
const superAdminIdIsActiveFalse = '6461553b0aa90c4527db6f0c';
const superAdminIdInvalid = '6461553b0aa90c4527db6f0c';

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

describe('updateSuperAdmin/api/superadmin/:id', () => {
  test('return status 200 when a super admin can be successfully updated', async () => {
    const response = await request(app).put(`/api/superadmin/${superAdminIdIsActiveTrue}`).send(mockSuperAdmin);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('SuperAdmin Updated!');
  });

  test('should return status 404 when a super admin is invalid', async () => {
    const response = await request(app).put(`/api/superadmin/${superAdminIdInvalid}`).send(mockSuperAdmin);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('SuperAdmin not found');
  });

  test('should return status 404 when a super admin is inactive', async () => {
    const response = await request(app).put(`/api/superadmin/${superAdminIdIsActiveFalse}`).send(mockSuperAdmin);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('SuperAdmin not found');
  });

  test('should return status 500 when there is an error updating a super admin id', async () => {
    jest.spyOn(Superadmin, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).put(`/api/superadmin/${superAdminIdIsActiveTrue}`).send(mockSuperAdmin);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('getSuperSuperAdminById/api/superadmins/:id', () => {
  test('should return status 200 when a super admin is found', async () => {
    const response = await request(app).get(`/api/superadmin/${superAdminIdIsActiveTrue}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Super Admin found!');
  });

  test('should return status 404 when is an invalid super admin id', async () => {
    const response = await request(app).get(`/api/superadmin/${superAdminIdInvalid}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Super Admin not found!');
  });

  test('should return status 500 when there is an error getting a super admin by id', async () => {
    jest.spyOn(Superadmin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get(`/api/superadmin/${superAdminIdIsActiveTrue}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
