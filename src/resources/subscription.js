import { Router } from 'express';
import fs from 'fs';

const subscriptions = require('../data/subscription.json');

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => {
  res.json({
    data: subscriptions,
  });
});

subscriptionsRouter.get('/getById/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubsc = subscriptions.find((subsc) => subsc.id.toString() === subscriptionId);
  if (foundSubsc) {
    res.send(foundSubsc);
  } else {
    res.send('Subscription not found');
  }
});

subscriptionsRouter.delete('/deleteById/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubsc = subscriptions.filter((subsc) => subsc.id.toString() !== subscriptionId);

  if (subscriptionId > subscriptions.length) {
    res.send('Error! This id does not exist');
  } else {
    fs.writeFile('src/data/subscription.json', JSON.stringify(foundSubsc, null, 2), (err) => {
      if (err) {
        res.send('Error! Subscription cannot be deleted');
      } else {
        res.send('Subscription deleted');
      }
    });
  }
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

subscriptionsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedSubs = req.body;
  let foundSubs = false;
  subscriptions.forEach((subs) => {
    if (subs.id.toString() === id) {
      foundSubs = true;
      Object.assign(subs, updatedSubs);
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

subscriptionsRouter.get('/filter/:date', (req, res) => {
  const { date } = req.params;
  const filterSubs = subscriptions.filter((subs) => subs.subscriptionDate.toString().split('/').join('-') === date);
  res.json({
    data: filterSubs,
  });
});

export default subscriptionsRouter;
