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

subscriptionsRouter.post('/updateSubs:id', (req, res) => {
  const updateSubs = req.body;
  const { id } = updateSubs;
  let foundSubs = false;
  subscriptions.forEach((subs) => {
    if (subs.id === id) {
      foundSubs = true;
      Object.assign(subs, updateSubs);
      fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
        if (err) {
          res.send('Error! Subscription could not be updated!');
        } else {
          res.send('Subscription updated!');
        }
      });
    }
  });
  if (!foundSubs) {
    res.send('Error! Subscription not found!');
  }
});

subscriptionsRouter.get('/filterSubsByDate/:date', (req, res) => {
  const { date } = req.params;
  const filterSubs = subscriptions.filter((subs) => subs.subscriptionDate.toString().split('/').join('-') === date);
  res.json({
    data: filterSubs,
  });
});

export default subscriptionsRouter;
