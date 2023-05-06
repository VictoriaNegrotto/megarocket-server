import fs from 'fs';

import { Router } from 'express';

const activities = require('../data/activity.json');

const activityRouter = Router();

activityRouter.post('/post', (req, res) => {
  const newActivity = req.body;

  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Error! Activity cannot be created');
    } else {
      res.send('Activity created!');
    }
  });
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

export default activityRouter;
