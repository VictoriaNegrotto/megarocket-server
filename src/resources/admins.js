import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/post', (req, res) => {
  const newUSer = req.body;
  admins.push(newUSer);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (error) => {
    if (error) {
      res.send('Error, admin cannot be created!');
    } else {
      res.send('Admin created!');
    }
  });
});

export default router;
