import { Router } from 'express';

import fs from 'fs';

const classRoute = Router();

const classJSON = require('../data/class.json');

const path = './src/data/class.json';

classRoute.post('/', (req, res) => {
  const { trainer, activity, duration } = req.body;
  const idValue = classJSON.length + 1;
  const newClass = {
    id: idValue, trainer, activity, duration,
  };
  classJSON.push(newClass);
  fs.promises.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.send(classJSON);
});

export default classRoute;
