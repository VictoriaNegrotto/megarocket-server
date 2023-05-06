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

export default router;
