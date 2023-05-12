import { Router } from 'express';
import fs from 'fs';

const subscriptions = require('../data/subscription.json');

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => {
  res.json({
    data: subscriptions,
  });
});

subscriptionsRouter.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubsc = subscriptions.find((subsc) => subsc.id.toString() === subscriptionId);
  if (foundSubsc) {
    res.send(foundSubsc);
  } else {
    res.send('Subscription not found');
  }
});

subscriptionsRouter.delete('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubsc = subscriptions.filter((subsc) => subsc.id.toString() !== subscriptionId);
  const deleteSubs = subscriptions.filter((subs) => subs.id.toString() === subscriptionId);

  if (deleteSubs.length === 0) return res.send('Error! This id does not exist');
  fs.writeFile('src/data/subscription.json', JSON.stringify(foundSubsc, null, 2), (err) => {
    if (err) {
      res.send('Error! Subscription cannot be deleted');
    } else {
      res.send('Subscription deleted');
    }
  });
  return {};
});

subscriptionsRouter.post('/', (req, res) => {
  const {
    idMember, idClass, subscriptionDate, subscriptionState, stateEditionDate,
  } = req.body;
  if (!idMember || !idClass || !subscriptionDate || !stateEditionDate) {
    return res.json({ msg: 'Missing or empty required properties' });
  }

  const lastSubs = subscriptions[subscriptions.length - 1];
  const lastId = lastSubs.id + 1;
  const newSubs = {
    id: lastId, idMember, idClass, subscriptionDate, subscriptionState, stateEditionDate,
  };
  subscriptions.push(newSubs);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error! Subscription could not be created!');
    }
  });
  return res.send('Subscription created!');
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
