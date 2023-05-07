import express from 'express';

const fs = require('fs');

const router = express.Router();

const members = require('../data/member.json');

router.post('/', (req, res) => {
  const {
    firstName, lastName, email, phone, address, city,
  } = req.body;
  const lastId = members.length + 1;
  const newMember = {
    id: lastId, firstName, lastName, email, phone, address, city,
  };
  members.push(newMember);
  fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (error) => {
    if (error) {
      res.send('Error! can not create the new member');
    } else {
      res.send('New member created');
    }
  });
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
