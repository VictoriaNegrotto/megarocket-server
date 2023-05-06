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
  const member = members[memberIndex];
  members[memberIndex] = {
    ...member,
    ...memberUpdate,
  };

  fs.writeFile(path, JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
  });

  return res.json({ msg: 'Member updated', member: members[memberIndex] });
});

export default router;
