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

export default subscriptionsRouter;
