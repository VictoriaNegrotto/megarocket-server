import express from 'express';

const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

const path = 'src/data/member.json';

router.get('/:firstName', (req, res) => {
  const { firstName } = req.params;
  const firstNameLC = firstName.toLowerCase();
  const filteredMember = members.filter((member) => member.firstName.toLowerCase() === firstNameLC);
  if (!filteredMember.length) return res.json({ msg: 'Member not found' });
  fs.writeFile(path, JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
  });
  return res.json({ members: filteredMember });
});

export default router;
