import trainerSchema from '../models/Trainer';

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await trainerSchema.find({ isActive: true });
    res.status(200).json({
      message: 'Complete Trainer list',
      data: trainers,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const createTrainer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary,
    } = req.body;

    const trainer = await trainerSchema.create({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary,
    });

    res.status(201).json({
      message: `Trainer ${trainer.firstName} was created successfully!`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const trainerControllers = {
  getAllTrainers,
  createTrainer,
};

export default trainerControllers;
