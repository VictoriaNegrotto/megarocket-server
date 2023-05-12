import { Router } from 'express';

import fs from 'fs';

const superAdminsRoute = Router();

const superAdminJSON = require('../data/super-admins.json');

const path = './src/data/super-admins.json';

const superAdmins = [];

superAdminsRoute.post('/', (req, res) => {
  const { email, name, password } = req.body;
  const idValue = superAdminJSON.length + 1;

  const newSuperAdmin = {
    id: idValue,
    name,
    email,
    password,
  };

  superAdminJSON.push(newSuperAdmin);

  fs.writeFile(path, JSON.stringify(superAdminJSON, null, 2), (err) => {
    if (err) {
      res.send('Error, Super admin canot be created!');
    }
  });

  return res.send('Super admin created successfuly');
});

superAdminsRoute.get('/:name', (req, res) => {
  const { name } = req.params;

  const nameLower = name.toLowerCase();

  const filteredSuperAd = superAdminJSON
    .filter((superAdminObj) => superAdminObj.name.toLowerCase().includes(nameLower));
  if (filteredSuperAd.length === 0) {
    res.send('Not found Super Admin');
  }
  res.send(filteredSuperAd);
});

superAdminsRoute.put('/:id', (req, res) => {
  const { id } = req.params;
  const newSuperAdmin = req.body;
  const superAdminIndex = superAdminJSON.findIndex(
    (superAdmin) => superAdmin.id.toString() === id,
  );
  if (superAdminIndex === -1) {
    res.send('Not exists this ID');
    return;
  }
  superAdminJSON[superAdminIndex] = { id, ...newSuperAdmin };

  fs.writeFile(path, JSON.stringify(superAdminJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send('Super admin updated');
  });
});

superAdminsRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  const superAdminIndex = superAdminJSON.findIndex((superAdmin) => superAdmin.id.toString() === id);
  if (superAdminIndex !== -1) {
    superAdmins.splice(superAdminIndex, 1);
  } else {
    return res.send('Not exists this ID');
  }
  fs.writeFile(path, JSON.stringify(superAdminJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send('Super admin deleted');
});

superAdminsRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const filteredSuperAdmin = superAdminJSON
    .filter((superAdmin) => superAdmin.id.toString() === id);
  if (filteredSuperAdmin.length === 0) {
    res.send('Not found super admin');
  }
  res.send(filteredSuperAdmin);
});

export default superAdminsRoute;
