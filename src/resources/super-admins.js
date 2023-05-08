import { Router } from 'express';

import fs from 'fs';

const superAdminsRoute = Router();

const superAdminJSON = require('../data/super-admins.json');

const path = './src/data/super-admins.json';

superAdminsRoute.post('/', (req, res) => {
  const { email, name, password } = req.body;
  const idValue = superAdminJSON[superAdminJSON.length - 1].id + 1;

  if (!email || !name || !password) {
    return res.send('Incorrect data. Please fill in name, email, password');
  }

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

superAdminsRoute.get('/filter/:name', (req, res) => {
  const { name } = req.params;

  const nameLower = name.toLowerCase();

  const filteredSuperAd = superAdminJSON
    .filter((superAdminObj) => superAdminObj.name.toLowerCase().includes(nameLower));
  if (filteredSuperAd.length === 0) {
    return res.send('Not found Super Admin');
  }
  return res.send(filteredSuperAd);
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
  const superAdminIndex = superAdminJSON.filter(
    (superAdmin) => superAdmin.id.toString() === id,
  );

  if (superAdminIndex.length === 0) {
    return res.send('Not exists this ID');
  }

  const newSuperAdminArray = superAdminJSON.filter(
    (superAdmin) => superAdmin.id.toString() !== id,
  );

  fs.writeFile(path, JSON.stringify(newSuperAdminArray, null, 2), (err) => {
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
    return res.send('Not found super admin');
  }
  return res.send(filteredSuperAdmin);
});

export default superAdminsRoute;
