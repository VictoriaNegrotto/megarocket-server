import { Router } from 'express';
import fs from 'fs';

const subscriptions = require('../data/subscription.json');

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => {
  res.json({
    data: subscriptions,
  });
});

subscriptionsRouter.post('/postSubs', (req, res) => {
  const newSubs = req.body;
  subscriptions.push(newSubs);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error! Subscription could not be created!');
    } else {
      res.send('Subscription created!');
    }
  });
});

export default subscriptionsRouter;
