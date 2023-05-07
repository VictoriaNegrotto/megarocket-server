import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(admins);
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const editAdmin = req.body;
  const index = admins.findIndex((admin) => admin.id.toString() === adminId);

  if (index !== -1) {
    admins[index] = { id: adminId, ...editAdmin };
    fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.send('Admin edited');
  } else {
    res.send('ID didn\'t match');
  }
});

router.get('/filter/:name', (req, res) => {
  const adminName = req.params.name;
  const foundAdmin = admins.filter((admin) => admin.first_name === adminName);

  if (foundAdmin.length !== 0) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

export default router;
