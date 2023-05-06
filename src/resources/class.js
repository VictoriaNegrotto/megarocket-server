import { Router } from 'express';
import fs from 'fs';

const classJSON = require('../data/class.json');

const path = './src/data/class.json';

const classRoute = Router();

classRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const classFilter = classJSON.find(
    (classElement) => classElement.id.toString() === id,
  );

  if (!classFilter) return res.send('Not exists this ID');

  return res.send(classFilter);
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

export default classRoute;
