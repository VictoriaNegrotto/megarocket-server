import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('updateAdmin /api/admins/:id', () => {
  test('should return status 200 when an admin can be successfully updated', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f7').send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('should return status 404 when admin is invalid ', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f1').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 when admin is inactive ', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040a4').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Cannot update inactive admin');
  });

  test('should return status 404 when the email is already registered ', async () => {
    const updateData = { firstName: 'Lorenzo', email: 'victor@gmail.com' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f6').send(updateData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Email already registered');
  });

  test('should return status 500 when there is an error updating an admin', async () => {
    jest.spyOn(Admin, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
    const updateData = { firstName: 'Lorenzo' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f0').send(updateData);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('deleteAdmin /api/admins/:id', () => {
  test('should return status 200 when an admin is deleted', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f7').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('should return status 404 when can not delete an invalid admin', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f2').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 when can not delete an inactive admin', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040a4').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Cannot delete inactive admin');
  });

  test('should return status 500 when there is an error deleting an admin', async () => {
    jest.spyOn(Admin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f7').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('getAdminById /api/admins/:id', () => {
  test('should return status 200 when an admin is found', async () => {
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040f6').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('should return status 404 when is an invalid admin ', async () => {
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040f3').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 when is an inactive admin ', async () => {
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040a4').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Admin not found');
  });

  test('should return status 500 when there is an error getting an admin', async () => {
    jest.spyOn(Admin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040f4').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
