import express from 'express';

const fs = require('fs');
const trainers = require('../data/trainer.json');

const trainerRouter = express.Router();
const path = 'src/data/trainer.json';

trainerRouter.post('/', (req, res) => {
  const newTrainer = req.body;
  trainers.push(newTrainer);
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) res.send('Error creating trainer');
  });
  res.json({ msg: 'Trainer created successfully', trainer: newTrainer });
});

trainerRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const trainerIndex = trainers.findIndex((trainer) => trainer.id.toString() === id);
  const trainerUpdate = req.body;
  if (trainerIndex === -1) return res.json({ msg: `Trainer with id ${id} not found` });
  const trainer = trainers[trainerIndex];
  trainers[trainerIndex] = {
    ...trainer,
    ...trainerUpdate,
  };
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) res.send('Error editing trainer');
  });
  return res.json({ msg: 'Trainer updated successfully', trainer: trainers[trainerIndex] });
});

trainerRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const trainerIndex = trainers.findIndex((trainer) => trainer.id.toString() === id);
  if (trainerIndex === -1) return res.json({ msg: `Trainer with id ${id} not found` });
  trainers.splice(trainerIndex, 1);
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) res.send('Error deleting trainer');
  });
  return res.send();
});

trainerRouter.get('/', (req, resp) => {
  resp.json({ trainers });
});

trainerRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const getTrainer = trainers.find((trainer) => trainer.id.toString() === id);

  if (!getTrainer) return res.json({ msg: `No trainer with the id of ${id}` });

  return res.json({ data: getTrainer });
});

trainerRouter.get('/filter/:activity', (req, res) => {
  const { activity } = req.params;
  const getTrainer = trainers.filter((trainer) => trainer.activity1 === activity
   || trainer.activity2 === activity);

  if (!getTrainer) return res.json({ msg: `No trainer with the activity of ${activity}` });

  return res.json({ data: getTrainer });
});

export default trainerRouter;
