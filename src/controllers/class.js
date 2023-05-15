import Class from '../models/Class';

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const idClass = await Class.findOne({ $and: [{ _id: id }, { isActive: true }] });
    if (!idClass) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        data: undefined,
        error: false,
      });
    }
    return res.status(200).json({
      message: `Class with ID ${idClass.id} was found!`,
      data: idClass,
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

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = await Class.findById(id);

    if (!isActive) {
      return res.status(404).json({
        message: `Class with ID ${id} is inactive and cannot be updated`,
        data: undefined,
        error: false,
      });
    }
    const {
      day, hour, trainer, activity, slots,
    } = req.body;
    const result = await Class.findByIdAndUpdate(
      id,
      {
        day,
        hour,
        trainer,
        activity,
        slots,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: `Class with ID ${id} updated!`,
      data: result,
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

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classToDelete = await Class.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!classToDelete) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: `Class with ID ${id} deleted!`,
      data: classToDelete,
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

const createClass = async (req, res) => {
  try {
    const {
      day, hour, trainer, activity, slots,
    } = req.body;
    const newClass = new Class({
      day,
      hour,
      trainer,
      activity,
      slots,
    });
    const result = await newClass.save();

    return res.status(201).json({
      message: `Class with ID ${result.id} created!`,
      data: result,
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

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true });
    if (classes.length === 0) {
      return res.status(404).json({
        message: 'Classes not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Classes found!',
      data: classes,
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

const classController = {
  updateClass, getClassById, deleteClass, createClass, getAllClasses,
};

export default classController;
