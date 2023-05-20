import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

describe('getMemberById /api/member/:id', () => {
  test('should return status 200 and member data when member exists', async () => {
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de3').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
  });

  test('should return status 404 when member does not exist', async () => {
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de5').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'findOne').mockRejectedValueOnce(new Error('database error'));
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de3').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
});

describe('filterMember /api/member/:id', () => {
  test('should return status 200 and filtered members when members exist', async () => {
    const memberName = 'Milagros';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('should return status 404 when members do not exist', async () => {
    const memberName = 'InvalidName';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'find').mockRejectedValueOnce(new Error('database error'));
    const memberName = 'Milagros';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
});

describe('updateMember /api/member/:id', () => {
  test('should return status 200 and updated member data when member exists', async () => {
    const updatedData = { firstName: 'Mili', lastName: 'Cerro' };
    const response = await request(app).put('/api/member/646015ffa877f6e5fb0e5de3').send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.firstName).toBe(updatedData.firstName);
    expect(response.body.data.lastName).toBe(updatedData.lastName);
  });

  test('should return status 404 when member does not exist', async () => {
    const updatedData = { firstName: 'Mili', lastName: 'Cerro' };
    const response = await request(app).put('/api/member/646015ffa877f6e5fb0e5de5').send(updatedData);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'findOne').mockRejectedValueOnce(new Error('database error'));
    const updatedData = { firstName: 'Mili', lastName: 'Cerro' };
    const response = await request(app).put('/api/member/646015ffa877f6e5fb0e5de5').send(updatedData);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
});

describe('deleteMember /api/member/:id', () => {
  test('should return status 200 and delete the member', async () => {
    const response = await request(app).delete('/api/member/646015ffa877f6e5fb0e5de3');
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain('Member delete');
    expect(response.body.data).toBeDefined();
  });

  test('should return status 404 when member does not exist', async () => {
    const response = await request(app).delete('/api/member/646015ffa877f6e5fb0e5de3').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Member not found!');
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('database error'));
    const response = await request(app).delete('/api/member/646015ffa877f6e5fb0e5de').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain('An error ocurred');
    expect(response.body.data).toBeUndefined();
  });
});
