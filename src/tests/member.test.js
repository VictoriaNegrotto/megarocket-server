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
    expect(response.body.message).toContain('Member found!');
  });

  test('should return status 404 when member does not exist', async () => {
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de5').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('Member not found!. Id not exists');
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'findOne').mockRejectedValueOnce(new Error('database error'));
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de3').send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toContain('An error ocurred');
  });
});

describe('filterMember /api/member/:id', () => {
  test('should return status 200 and filtered members when members exist', async () => {
    const memberName = 'Milagros';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual('Member found!');
  });

  test('should return status 404 when members do not exist', async () => {
    const memberName = 'InvalidName';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Member not found!. Name not exists');
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'find').mockRejectedValueOnce(new Error('database error'));
    const memberName = 'Milagros';
    const response = await request(app).get(`/api/member/filter/${memberName}`).send();
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('An error ocurred');
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
    expect(response.body.message).toEqual('Member updated!');
  });

  test('should return status 404 when member does not exist', async () => {
    const updatedData = { firstName: 'Mili', lastName: 'Cerro' };
    const response = await request(app).put('/api/member/646015ffa877f6e5fb0e5de5').send(updatedData);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Member not found!. Id not exists');
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Member, 'findOne').mockRejectedValueOnce(new Error('database error'));
    const updatedData = { firstName: 'Mili', lastName: 'Cerro' };
    const response = await request(app).put('/api/member/646015ffa877f6e5fb0e5de5').send(updatedData);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toContain('An error ocurred');
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
    expect(response.body.message).toEqual('Member not found!');
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

const mockMember = {
  firstName: 'Test',
  lastName: 'User',
  dni: 32248076,
  phone: 34130071,
  email: 'test23@example.com',
  city: 'Test City',
  birthDate: '2000-01-01T00:00:00.000Z',
  postalCode: 2000,
  memberships: 'Black',
};

describe('getMembers /api/member', () => {
  test('Should return status 200 when get only active members', async () => {
    const response = await request(app).get('/api/member').send();
    const activeMembers = response.body.data;
    activeMembers.forEach((oneMember) => {
      expect(oneMember).toHaveProperty('firstName');
      expect(oneMember).toHaveProperty('lastName');
      expect(oneMember).toHaveProperty('dni');
      expect(oneMember).toHaveProperty('city');
      expect(oneMember).toHaveProperty('birthDate');
      expect(oneMember).toHaveProperty('postalCode');
      expect(oneMember).toHaveProperty('memberships');
      expect(oneMember).toHaveProperty('isActive');
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Members found');
  });
  test('Should return status 404 when not found members', async () => {
    jest.spyOn(Member, 'find').mockResolvedValue([]);
    const response = await request(app).get('/api/member').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('No members active');
  });
  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).get('/api/membe').send();
    expect(response.status).toBe(404);
  });
  test('Should return status 500 when there is an error retrieving members', async () => {
    jest.spyOn(Member, 'find').mockImplementation(new Error('Error retrieving members'));

    const response = await request(app).get('/api/member').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot GET /api/member (500)');
  });
});

describe('createMember /api/member', () => {
  test('Should return status 201 when creating a new member', async () => {
    const response = await request(app).post('/api/member').send(mockMember);
    // eslint-disable-next-line no-underscore-dangle
    const newMemberId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.data).toStrictEqual({
      ...mockMember, isActive: true, __v: 0, _id: newMemberId,
    });
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member created');
  });
  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).post('/api/membe').send();
    expect(response.status).toBe(404);
  });
  test('Should return status 500 when there is an error creating a new member', async () => {
    const mockError = new Error('Error creating member');
    jest.spyOn(Member, 'create').mockImplementation(() => {
      throw mockError;
    });

    const response = await request(app).post('/api/member').send(mockMember);

    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot POST /api/member (500)');
  });
});
