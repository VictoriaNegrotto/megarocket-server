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

  test('should return a 404 status code when admins are not found', async () => {
    jest.spyOn(Admins, 'find').mockResolvedValue(null);
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Admin not found');
    expect(response.body.data).toBeUndefined();
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
    jest.spyOn(Admins, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
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
    jest.spyOn(Admins, 'findOne').mockRejectedValueOnce(new Error('Database error'));
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
    jest.spyOn(Admins, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040f4').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
