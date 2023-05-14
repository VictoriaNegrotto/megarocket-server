import Trainer from '../models/Trainer';

const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findOne({ $and: [{ _id: id }, { isActive: true }] });

    if (!trainer) {
      return res.status(200).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: false,
      });
    }
    return res.status(200).json({
      message: `Trainer with ID: ${id} was found!`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
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
    const { isActive } = await Trainer.findById(id);

    if (!isActive) {
      return res.status(200).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: false,
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
      message: 'error',
      data: error,
      error: true,
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!trainer) {
      return res.status(200).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: 'Trainer deleted',
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
      error: true,
    });
  }
};

const trainerControllers = {
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};

export default trainerControllers;
