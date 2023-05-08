import express from 'express';

const fs = require('fs');
const trainers = require('../data/trainer.json');

const trainerRouter = express.Router();
const path = 'src/data/trainer.json';

trainerRouter.post('/', (req, res) => {
  const newTrainer = req.body;
  trainers.push(newTrainer);
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) throw err;
  });
  res.status(201).json({ msg: 'Trainer created successfully', trainer: newTrainer });
});

trainerRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const trainerIndex = trainers.findIndex((trainer) => trainer.id.toString() === id);
  const trainerUpdate = req.body;
  if (trainerIndex === -1) return res.status(404).json({ msg: `Trainer with id ${id} not found` });
  const trainer = trainers[trainerIndex];
  trainers[trainerIndex] = {
    ...trainer,
    ...trainerUpdate,
  };
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) throw err;
  });
  return res.status(200).json({ msg: 'Trainer updated successfully', trainer: trainers[trainerIndex] });
});

trainerRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const trainerIndex = trainers.findIndex((trainer) => trainer.id.toString() === id);
  if (trainerIndex === -1) return res.status(404).json({ msg: `Trainer with id ${id} not found` });
  trainers.splice(trainerIndex, 1);
  fs.writeFile(path, JSON.stringify(trainers, null, 2), (err) => {
    if (err) throw err;
  });
  return res.status(204).send();
});

export default trainerRouter;
