import { Router } from 'express';
import fs from 'fs';

const superAdminsRoute = Router();

const superAdminsJSON = require('../data/super-admins.json');

const path = './src/data/super-admins.json';

const superAdmins = [];

superAdminsRoute.put('/:id', (req, res) => {
  const { id } = req.params;
  const newSuperAdmin = req.body;
  const superAdminIndex = superAdminsJSON.findIndex(
    (superAdmin) => superAdmin.id.toString() === id,
  );
  if (superAdminIndex === -1) {
    res.send('Not exists this ID');
    return;
  }
  superAdminsJSON[superAdminIndex] = { id, ...newSuperAdmin };

  fs.writeFile(path, JSON.stringify(superAdminsJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send('Super admin updated');
  });
});

superAdminsRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  const superAdminIndex = superAdminsJSON.findIndex(
    (superAdmin) => superAdmin.id.toString() === id,
  );
  if (superAdminIndex !== -1) {
    superAdmins.splice(superAdminIndex, 1);
  } else {
    return res.send('Not exists this ID');
  }
  fs.writeFile(path, JSON.stringify(superAdminsJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send('Super admin deleted');
});

superAdminsRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const filteredSuperAdmin = superAdminsJSON
    .filter((superAdmin) => superAdmin.id.toString() === id);
  if (filteredSuperAdmin.length === 0) {
    res.send('Not found super admin');
  }
  res.send(filteredSuperAdmin);
});

export default superAdminsRoute;
