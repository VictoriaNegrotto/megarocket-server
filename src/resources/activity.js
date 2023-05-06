// eslint-disable-next-line import/no-import-module-exports
import express from 'express';
// eslint-disable-next-line import/no-import-module-exports
import fs from 'fs';

const activities = require('../data/activity.json');

const router = express.Router();

router.post('/post', (req, res) => {
  const newActivity = req.body;
  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Error! Activity cannot be created');
    } else {
      res.send('User created!');
    }
  });
});

module.exports = router;
