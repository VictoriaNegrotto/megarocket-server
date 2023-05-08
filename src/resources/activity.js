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

export default activityRouter;
