import express from 'express';

const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

const path = 'src/data/member.json';

router.post('/', (req, res) => {
  const {
    firstName, lastName, email, phone, address, city,
  } = req.body;
  if (!firstName || !lastName || !email || !phone || !address || !city) {
    return res.json({ msg: 'Missing or empty required properties' });
  }

  const lastId = members.length + 1;
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
