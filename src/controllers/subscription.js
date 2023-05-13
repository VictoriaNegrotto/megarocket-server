const Subscription = require('../models/Subscription');

const getSubscriptions = async (req, res) => {
  try {
    const subscriptionData = await Subscription.find();
    res.send(subscriptionData);
  } catch (error) {
    console.log(error);
  }
};
/*
subscriptionsRouter.delete('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubsc = Subscription.filter((subsc) => subsc.id.toString() !== subscriptionId);
  const deleteSubs = Subscription.filter((subs) => subs.id.toString() === subscriptionId);

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

  const lastSubs = Subscription[Subscription.length - 1];
  const lastId = lastSubs.id + 1;
  const newSubs = {
    id: lastId, idMember, idClass, subscriptionDate, subscriptionState, stateEditionDate,
  };
  Subscription.push(newSubs);
  fs.writeFile('src/data/subscription.json', JSON.stringify(Subscription, null, 2), (err) => {
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
  Subscription.forEach((subs) => {
    if (subs.id.toString() === id) {
      foundSubs = true;
      Object.assign(subs, updatedSubs);
      fs.writeFile('src/data/subscription.json', JSON.stringify(Subscription, null, 2), (err) => {
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
  const filterSubs = Subscription.filter((subs) =>
  subs.subscriptionDate.toString().split('/').join('-') === date);
  res.json({
    data: filterSubs,
  });
});
*/
module.exports = {
  getSubscriptions,
};
