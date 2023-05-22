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

const superAdminValidEmail = 'juvi@gmail.com';
const superAdminInvalidEmail = 'hola@hola.com';

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

describe('updateSuperAdmin/api/superadmin/:id', () => {
  test('return status 200 when a super admin can be successfully updated  by id', async () => {
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

  test('should return status 500 when there is an error updating a super admin by id', async () => {
    jest.spyOn(Superadmin, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).put(`/api/superadmin/${superAdminIdIsActiveTrue}`).send(mockSuperAdmin);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot PUT /api/superadmin/${superAdminIdIsActiveTrue} (500)`);
  });
});

describe('getSuperSuperAdminById/api/superadmins/:id', () => {
  test('should return status 200 when a super admin is found by id', async () => {
    const response = await request(app).get(`/api/superadmin/${superAdminIdIsActiveTrue}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Super Admin found!');
  });

  test('should return status 404 when there is an invalid super admin id', async () => {
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
    expect(response.error.message).toEqual(`cannot GET /api/superadmin/${superAdminIdIsActiveTrue} (500)`);
  });
});

describe('getSuperSuperAdminByEmail/api/superadmins/:email', () => {
  test('should return status 200 when a super admin is found by email', async () => {
    const response = await request(app).get(`/api/superadmin/filter/${superAdminValidEmail}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('SuperAdmins found!');
  });

  test('should return status 404 when there is an invalid super admin email', async () => {
    const response = await request(app).get(`/api/superadmin/filter/${superAdminInvalidEmail}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('SuperAdmins not found');
  });

  test('should return status 500 when there is an error getting a super admin by email', async () => {
    jest.spyOn(Superadmin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get(`/api/superadmin/filter${superAdminValidEmail}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot GET /api/superadmin/filter${superAdminValidEmail} (500)`);
  });
});

describe('deleteSuperAdmin/api/superadmin/:id', () => {
  test('should return status 200 when a super admin is deleted by id', async () => {
    const response = await request(app).delete(`/api/superadmin/${superAdminIdIsActiveTrue}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Super Admin deleted!');
  });

  test('should return status 404 when can not delete an invalid super admin by id', async () => {
    const response = await request(app).delete(`/api/superadmin/${superAdminIdInvalid}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Super Admin not found!');
  });

  test('should return status 404 when can not delete an inactive super admin by id', async () => {
    const response = await request(app).delete(`/api/superadmin/${superAdminIdIsActiveFalse}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Super Admin not found!');
  });

  test('should return status 500 when there is an error deleting a super admin by id', async () => {
    jest.spyOn(Superadmin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).delete(`/api/superadmin/${superAdminIdIsActiveTrue}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot DELETE /api/superadmin/${superAdminIdIsActiveTrue} (500)`);
  });
});
