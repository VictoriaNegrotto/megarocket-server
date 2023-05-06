import { Router } from 'express';

import fs from 'fs';

const superAdminRoute = Router();

const superAdminJSON = require('../data/super-admins.json');

const path = './src/data/super-admins.json';

superAdminRoute.post('/', (req, res) => {
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

superAdminRoute.get('/:name', (req, res) => {
  const { name } = req.params;

  const nameLower = name.toLowerCase();

  const filteredSuperAd = superAdminJSON
    .filter((superAdminObj) => superAdminObj.name.toLowerCase().includes(nameLower));
  if (filteredSuperAd.length === 0) {
    res.send('Not found Super Admin');
  }
  res.send(filteredSuperAd);
});

export default superAdminRoute;
