import express from 'express';

const members = require('../data/member.json');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.json({ members });
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const getMember = members.find((member) => member.id.toString() === memberId);
  if (getMember) {
    res.json({ data: getMember });
  } else {
    res.json({ msg: `No member with the id of ${req.params.id}` });
  }
});

router.put('/:id', (req, res) => {
  const getMember = members.find((member) => member.id.toString() === req.params.id);
  if (getMember) {
    const memberUpdate = req.body;
    members.map((member) => {
      if (member.id.toString() === req.params.id) {
        member = {
          ...member,
          ...memberUpdate,
        };
        return res.json({ msg: 'Member updated', member });
      }
      return {};
    });
  } else {
    res.json({ msg: `No member with the id of ${req.params.id}` });
  }
});

export default router;
