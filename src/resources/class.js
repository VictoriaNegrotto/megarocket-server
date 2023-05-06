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
  fs.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      res.send('Error! Class canot be created!');
    }
  });
  res.send('Class created successfuly');
});

classRoute.delete('/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const filteredClass = classJSON.filter((classObj) => classObj.id === classId);
  if (filteredClass.length === 0) {
    res.send('Class not found');
    return;
  }
  const filteredJSON = classJSON.filter((classObj) => classObj.id !== classId);
  fs.writeFile(path, JSON.stringify(filteredJSON, null, 2), (err) => {
    if (err) {
      res.send('Error deleting class');
    } else {
      res.send('Class deleted!');
    }
  });
});

export default classRoute;
