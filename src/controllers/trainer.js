import Trainer from '../models/Trainer';

const getTrainerById = (req, res) => {
  const { id } = req.params;
  Trainer.findById(id, 'firstName lastName dni phone email city password salary isActive')
    .then((trainers) => res.status(200).json({
      message: `The trainer with id: ${id} has been found`,
      data: trainers,
      error: false,
    })).catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const updateTrainer = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  Trainer.findByIdAndUpdate(id, {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Trainer with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

const trainerControllers = {
  getTrainerById,
  updateTrainer,
};

export default trainerControllers;
