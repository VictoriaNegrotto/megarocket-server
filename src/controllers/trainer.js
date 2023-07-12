import Trainer from '../models/Trainer';
import firebaseApp from '../helper/firebase';

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
const getTrainerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const trainer = await Trainer.findOne({ $and: [{ email }, { isActive: true }] });

    if (!trainer) {
      return res.status(404).json({
        message: `Trainer with ID: ${email} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Trainer with ID: ${email} was found!`,
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
    }, { new: true, runValidators: true });
    await firebaseApp.auth().updateUser(trainer.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

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
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'TRAINER' });
    const trainers = new Trainer(
      {
        firebaseUid: newFirebaseUser.uid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dni: req.body.dni,
        phone: req.body.phone,
        city: req.body.city,
        salary: req.body.salary,
      },
    );
    const trainerSaved = await trainers.save();

    return res.status(201).json({
      message: 'Register successfully',
      data: trainerSaved,
    });
  } catch (error) {
    if (firebaseUid) {
      await firebaseApp.auth().deleteUser(firebaseUid);
    }

    return res.status(400).json({
      message: error.toString(),
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
    await firebaseApp.auth().updateUser(trainer.firebaseUid, {
      disabled: true,
    });

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
  getTrainerByEmail,
};

export default trainerControllers;
