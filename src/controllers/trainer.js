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
      message: 'An error ocurred',
      error,
    });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTrainer = await trainerSchema.findById(id);
    res.status(200).json({
      message: 'Trainer found!',
      data: foundTrainer,
      error: false,
    });
  } catch (error) {
    res.json(404).json({
      message: 'An error ocurred',
      data: undefined,
      error,
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
      isActive,
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
      isActive,
    });

    res.status(201).json({
      message: `Trainer ${trainer.firstName} was created successfully!`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating trainer',
      error,
    });
  }
};

const trainerControllers = {
  getTrainerById,
  getAllTrainers,
  createTrainer,
};

export default trainerControllers;
