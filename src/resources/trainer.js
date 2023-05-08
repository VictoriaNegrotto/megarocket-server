import express from 'express';

const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.json({ trainers });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const getTrainer = trainers.find((trainer) => trainer.id.toString() === id);

  if (!getTrainer) return res.json({ msg: `No trainer with the id of ${id}` });

  return res.json({ data: getTrainer });
});

router.get('/filter/:activity', (req, res) => {
  const { activity } = req.params;
  const getTrainer = trainers.filter((trainer) => trainer.activity1 === activity
   || trainer.activity2 === activity);

  if (!getTrainer) return res.json({ msg: `No trainer with the activity of ${activity}` });

  return res.json({ data: getTrainer });
});

export default router;
