import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminSeed from '../seeds/admins';

// const mockAdmins = {
//   _id: new mongoose.Types.ObjectId('6462b798eb92c75e0c1040f7'),
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
  test('should return status 200 when an admin can be successfully updated', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f7').send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('should return status 404 when admin is inactive ', async () => {
    const updateData = { firstName: 'Lorenzo', lastName: 'Mauro' };
    const response = await request(app).put('/api/admins/6462b798eb92c75e0c1040f1').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
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

  test('should return status 404 when can not delete an inactive admin', async () => {
    const response = await request(app).delete('/api/admins/6462b798eb92c75e0c1040f2').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
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

  test('should return status 500 when there is an error getting an admin', async () => {
    jest.spyOn(Admin, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/admins/6462b798eb92c75e0c1040f4').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
