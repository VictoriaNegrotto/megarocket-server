import express from 'express';

const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

const path = 'src/data/member.json';

router.get('/', (req, resp) => {
  resp.json({ members });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const getMember = members.find((member) => member.id.toString() === id);

  if (!getMember) return res.json({ msg: `No member with the id of ${id}` });

  return res.json({ data: getMember });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const memberIndex = members.findIndex((member) => member.id.toString() === id);
  const memberUpdate = req.body;

  if (memberIndex === -1) return res.json({ msg: `No member with the id of ${req.params.id}` });
  const validProperties = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
  const editProperties = Object.keys(memberUpdate);
  const isValid = editProperties.every((property) => validProperties.includes(property));
  const member = members[memberIndex];
  if (!isValid) return res.json({ msg: 'Invalid properties' });
  members[memberIndex] = {
    ...member,
    ...memberUpdate,
  };

  fs.writeFile(path, JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
  });

  return res.json({ msg: 'Member updated', member: members[memberIndex] });
});

router.get('/filter/:firstName', (req, res) => {
  const { firstName } = req.params;
  const firstNameLC = firstName.toLowerCase();
  const filteredMember = members.filter((member) => member.firstName.toLowerCase() === firstNameLC);
  if (!filteredMember.length) return res.json({ msg: 'Member not found' });
  fs.writeFile(path, JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
  });
  return res.json({ members: filteredMember });
});

router.post('/', (req, res) => {
  const {
    firstName, lastName, email, phone, address, city,
  } = req.body;
  if (!firstName || !lastName || !email || !phone || !address || !city) {
    return res.json({ msg: 'Missing or empty required properties' });
  }
  const lastMember = members[members.length - 1];
  const lastId = lastMember.id + 1;
  const newMember = {
    id: lastId, firstName, lastName, email, phone, address, city,
  };

  members.push(newMember);
  fs.writeFile(path, JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
  });
  return res.json({ members: newMember });
});

router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const deleteMember = members.filter((member) => member.id.toString() === memberId);
  if (deleteMember.length === 0) return res.send('Member not found.');
  const filtMember = members.filter((member) => member.id.toString() !== memberId);
  fs.writeFile('src/data/member.json', JSON.stringify(filtMember, null, 2), (err) => {
    if (err) {
      res.send('Error! cannot delete the member');
    } else {
      res.send('Member deleted.');
    }
  });
  return {};
});

export default router;
