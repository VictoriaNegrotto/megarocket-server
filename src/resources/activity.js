import fs from 'fs';

import { Router } from 'express';

const activities = require('../data/activity.json');

const activityRouter = Router();

activityRouter.get('/', (req, res) => {
  res.send(activities);
});

activityRouter.get('/:id', (req, res) => {
  const activityId = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityId);
  if (foundActivity) {
    res.send(foundActivity);
  } else {
    res.send('Activity not found!');
  }
});

activityRouter.delete('/:id', (req, res) => {
  const activityId = req.params.id;
  const filterActivity = activities.filter((activity) => activity.id.toString() !== activityId);
  fs.writeFile('src/data/activity.json', JSON.stringify(filterActivity, null, 2), (err) => {
    if (err) {
      res.send('Error! Activity cannot be deleted!');
    } else {
      res.send(' Activity deleted');
    }
  });
});

activityRouter.post('/post', (req, res) => {
  const newActivity = req.body;

  if (Object.keys(newActivity).length === 0) {
    return res.send('Error! Activity cannot be empty');
  }

  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Error! Activity cannot be created');
    }
  });
  return res.send('Activity created');
});

activityRouter.put('/:id', (req, res) => {
  const activityId = req.params.id;
  const updActivity = req.body;
  const foundActivity = activities.findIndex((activity) => activity.id.toString() === activityId);

  if (foundActivity === -1) return res.send('This Id doesnt exist');
  const id = parseInt(activityId, 10);
  activities[foundActivity] = { id, ...updActivity };

  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Error! Activity cannot be modified');
    }
  });
  return res.send('Activity modified!');
});

activityRouter.get('/filter/:name', (req, res) => {
  const { name } = req.params;
  const nameLC = name.toLowerCase();
  const filteredActivity = activities.filter((activity) => activity.name.toLowerCase() === nameLC);
  if (!filteredActivity.length) return res.json({ msg: 'Member not found' });
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
    if (err) throw err;
  });
  return res.json({ activities: filteredActivity });
});

export default activityRouter;
