import Trainer from '../models/Trainer';

const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findOne({ $and: [{ _id: id }, { isActive: true }] });

    if (!trainer) {
      return res.status(404).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Trainer with ID: ${id} was found!`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ isActive: true });
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

const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName, lastName, dni, phone, email, city, password, salary,
    } = req.body;
    const trai = await Trainer.findById(id);

    if (!trai || !trai.isActive) {
      return res.status(404).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    const trainer = await Trainer.findByIdAndUpdate(id, {
      firstName, lastName, dni, phone, email, city, password, salary,
    }, { new: true });

    return res.status(200).json({
      message: `Trainer with ID: ${id} was updated!`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
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

    const trainer = await Trainer.create({
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

const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    const trainerActive = await Trainer.findById(id);

    if (!trainerActive.isActive) {
      return res.status(404).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    const trainer = await Trainer.findByIdAndUpdate(id, { isActive: false }, { new: true });

    return res.status(200).json({
      message: 'Trainer deleted',
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const trainerControllers = {
  getAllTrainers,
  createTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};

export default trainerControllers;
