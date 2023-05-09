import { Router } from 'express';

import fs from 'fs';

const classRoute = Router();

const classJSON = require('../data/class.json');

const path = './src/data/class.json';

classRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const classFilter = classJSON.find(
    (classElement) => classElement.id.toString() === id,
  );

  if (!classFilter) return res.send('Not exists this ID');

  return res.send(classFilter);
});

classRoute.put('/:id', (req, res) => {
  const { id } = req.params;
  const newClass = req.body;

  const classIndex = classJSON.findIndex(
    (classElement) => classElement.id.toString() === id,
  );

  if (classIndex === -1) return res.send('Not exists this ID');

  const propertiesValues = ['trainer', 'activity', 'duration'];
  const newProperties = Object.keys(req.body);
  const propertiesValid = newProperties.every((property) => propertiesValues.includes(property));

  if (!propertiesValid) return res.send('Ivalid properties');

  classJSON[classIndex] = { id, ...newClass };

  fs.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send('Class updated');
});

classRoute.patch('/trainer', (req, res) => {
  const { id, trainer } = req.body;

  const classFilter = classJSON.find(
    (classElement) => classElement.id.toString() === id,
  );

  if (!classFilter) return res.send('Not exists this ID');

  classFilter.trainer = trainer;

  fs.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send('Class updated with new trainer');
});

classRoute.patch('/activity', (req, res) => {
  const { id, activity } = req.body;

  const classFilter = classJSON.find(
    (classElement) => classElement.id.toString() === id,
  );

  if (!classFilter) return res.send('Not exists this ID');

  classFilter.activity = activity;

  fs.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send('Class updated with new activity');
});

classRoute.post('/', (req, res) => {
  const { trainer, activity, duration } = req.body;
  const idValue = classJSON[classJSON.length - 1].id + 1;

  if (!trainer || !activity || !duration) {
    return res.send('Incorrect data. Please fill in trainer, activity, duration');
  }
  const newClass = {
    id: idValue, trainer, activity, duration,
  };
  classJSON.push(newClass);
  fs.writeFile(path, JSON.stringify(classJSON, null, 2), (err) => {
    if (err) {
      res.send('Error! Class canot be created!');
    }
  });
  return res.send('Class created successfuly');
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

classRoute.get('/filter/:trainer', (req, res) => {
  const { trainer } = req.params;
  const trainerLower = trainer.toLowerCase();
  const filteredClass = classJSON
    .filter((classObj) => classObj.trainer.toLowerCase().includes(trainerLower));
  if (filteredClass.length === 0) {
    return res.send('Not found trainer');
  }
  return res.send(filteredClass);
});

export default classRoute;
