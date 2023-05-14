import Trainer from '../models/Trainer';

const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findOne({ $and: [{ _id: id }, { isActive: true }] });

    if (!trainer) {
      return res.status(200).json({
        message: 'Trainer not found',
        data: [],
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Trainer found',
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'server error',
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

    const trainer = await Trainer.findByIdAndUpdate(id, {
      firstName, lastName, dni, phone, email, city, password, salary,
    }, { new: true });

    return res.status(200).json({
      message: 'user updated',
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'server error',
      data: error,
      error: true,
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByIdAndUpdate(id);

    if (!trainer) {
      return res.status(200).json({
        message: 'Trainer ID not found',
        data: [],
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
      message: 'server error',
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
